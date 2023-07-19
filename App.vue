<script>
/* EaseIM */
import '@/EaseIM';
import { emConnectListener, emMountGlobalListener } from '@/EaseIM/listener';
import { emConnect, emUserInfos, emGroups, emContacts } from '@/EaseIM/imApis';
import emHandleReconnect from '@/EaseIM/utils/emHandleReconnect';
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from '@/EaseIM/constant';
import { useLoginStore } from '@/stores/login';
import { useGroupStore } from '@/stores/group';
import { useConversationStore } from '@/stores/conversation';
import { useContactsStore } from '@/stores/contacts';
import { EMClient, EaseSDK } from './EaseIM';
/* Agora */
import { useInitCallKit } from '@/components/emCallKit';
import useCallKitEvent from '@/components/emCallKit/callKitManage/useCallKitEvent';
export default {
  setup() {
    const loginStore = useLoginStore();
    const groupStore = useGroupStore();
    const contactsStore = useContactsStore();
    /* 链接所需监听回调 */
    //传给监听callback回调
    const connectedCallback = (type) => {
      console.log('>>>>>连接成功回调', type);
      if (type === CONNECT_CALLBACK_TYPE.CONNECT_CALLBACK) {
        onConnectedSuccess();
      }
      if (type === CONNECT_CALLBACK_TYPE.DISCONNECT_CALLBACK) {
        onDisconnect();
      }
      if (type === CONNECT_CALLBACK_TYPE.RECONNECTING_CALLBACK) {
        onReconnecting();
      }
    };
    //IM连接成功
    const { closeEaseIM } = emConnect();
    const onConnectedSuccess = () => {
      const { loginUserId } = loginStore.loginUserBaseInfos || {};
      const finalLoginUserId = loginUserId || EMClient.user;
      if (!loginStore.loginStatus) {
        fetchLoginUserNeedData();
      }
      loginStore.setLoginUserBaseInfos({ loginUserId: finalLoginUserId });
      loginStore.setLoginStatus(true);
      uni.hideLoading();
      uni.redirectTo({
        url: '../home/index?myName=' + finalLoginUserId,
      });
    };
    //IM断开连接
    const { actionEMReconnect } = emHandleReconnect();
    const onDisconnect = () => {
      //断开回调触发后，如果业务登录状态为true则说明异常断开需要重新登录
      if (!loginStore.loginStatus) {
        uni.showToast({
          title: '退出登录',
          icon: 'none',
          duration: 2000,
        });
        uni.redirectTo({
          url: '../login/login',
        });
        closeEaseIM();
      } else {
        //执行通过token进行重新登录
        actionEMReconnect();
      }
    };
    //IM重连中
    const onReconnecting = () => {
      uni.showToast({
        title: 'IM 重连中...',
        icon: 'none',
      });
    };
    //挂载IM websocket连接成功监听
    emConnectListener(connectedCallback);
    const { fetchUserInfoWithLoginId, fetchOtherInfoFromServer } =
      emUserInfos();
    const { fetchJoinedGroupListFromServer } = emGroups();
    const { fetchContactsListFromServer } = emContacts();
    //获取登录所需基础参数
    const fetchLoginUserNeedData = async () => {
      //获取好友列表
      const friendList = await fetchContactsListFromServer();
      await contactsStore.setFriendList(friendList);
      fetchJoinedGroupList();
      if (friendList.length) {
        //获取好友用户属性
        const friendProfiles = await fetchOtherInfoFromServer(friendList);
        contactsStore.setFriendUserInfotoMap(friendProfiles);
      }
      //获取当前登录用户好友信息
      const profiles = await fetchUserInfoWithLoginId();
      await loginStore.setLoginUserProfiles(profiles[EMClient.user]);
    };
    //获取加入的群组列表
    const fetchJoinedGroupList = async () => {
      //获取群组列表
      const joinedGroupList = await fetchJoinedGroupListFromServer();
      console.log('>>>>>>>>>joinedGroupList', joinedGroupList);
      await groupStore.setJoinedGroupList(joinedGroupList);
    };
    //挂载全局所需监听回调【好友关系、消息监听、群组监听】
    /* 退群解散群逻辑 */
    const conversationStore = useConversationStore();
    const globaleventcallback = (listenerType, event) => {
      //群组事件监听
      if (listenerType === HANDLER_EVENT_NAME.GROUP_EVENT) {
        const { operation, id } = event;
        console.log('>>>>>触发群组事件回调。');
        switch (operation) {
          case 'directJoined':
            {
              uni.showToast({ icon: 'none', title: `被拉入群组${id}` });
              fetchJoinedGroupList();
            }
            break;
          case 'removeMember':
            {
              uni.showToast({ icon: 'none', title: `从${id}群中被移出` });
              fetchJoinedGroupList();
              //删除该群相关会话
              conversationStore.deleteConversation(id);
              //如果在该群会话中则退出会话
              if (conversationStore.chattingId === id) {
                uni.reLaunch({
                  url: '../home/index',
                });
              }
            }
            break;
          case 'destroy':
            {
              uni.showToast({ icon: 'none', title: `${id}已解散` });
              fetchJoinedGroupList();
              conversationStore.deleteConversation(id);
              //如果在该群会话中则退出会话
              if (conversationStore.chattingId === id) {
                console.log('>>>>会话中退出聊天页面');
                uni.reLaunch({
                  url: '../home/index',
                });
              }
            }
            break;
          default:
            break;
        }
      }
      if (listenerType === HANDLER_EVENT_NAME.ERROR_EVENT) {
        const { type } = event;
        switch (type) {
          case 206:
            {
              uni.showToast({
                icon: 'none',
                title: '有其他用户登录，断开连接！',
              });
              loginStore.setLoginStatus(false);
            }
            break;
          default:
            break;
        }
      }
    };
    emMountGlobalListener(globaleventcallback);
    /* Agora */
    const { setCallKitClient } = useInitCallKit();
    setCallKitClient(EMClient, EaseSDK.message);
    //监听callkit状态变化展示对应的页面
    const { EVENT_NAME, CALLKIT_EVENT_CODE, SUB_CHANNEL_EVENT } =
      useCallKitEvent();
    SUB_CHANNEL_EVENT(EVENT_NAME, (params) => {
      const { type, ext, callType, eventHxId } = params;
      console.log('>>>>>>订阅到callkit事件发布', params);
      //弹出待接听事件
      if (type.code === CALLKIT_EVENT_CODE.ALERT_SCREEN) {
        console.log('>>>>>>监听到对应code', type.code);
        uni.navigateTo({
          url: '../emCallKitPages/alertScreen',
        });
      }
    });
  },
};
</script>
<style lang="scss">
@import './app.css';
</style>
