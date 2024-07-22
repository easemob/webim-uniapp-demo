<script>
import { EMClient } from "@/EaseIM";
import { emConnectListener, emMountGlobalListener } from "@/EaseIM/emListener";
import { emConnect } from "@/EaseIM/emApis";
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from "@/EaseIM/constant";
import { emHandleReconnect } from "@/EaseIM/utils";
export default {
  onLaunch() {
    //传给监听callback回调
    const connectedCallback = (type) => {
      console.log(">>>>>IM连接回调", type);
      if (type === CONNECT_CALLBACK_TYPE.CONNECT_CALLBACK) {
        this.onConnectedSuccess();
      }
      if (type === CONNECT_CALLBACK_TYPE.DISCONNECT_CALLBACK) {
        this.onDisconnect();
      }
      if (type === CONNECT_CALLBACK_TYPE.RECONNECTING_CALLBACK) {
        this.onReconnecting();
      }
    };
    /* 链接所需监听回调 */
    emConnectListener(connectedCallback);
    /* 全局类型监听集合、消息、联系人、群组等... */
    emMountGlobalListener();
    this.handleAutoLoginEaseIM();
  },
  computed: {
    loginStoreStatus() {
      return this.$store.state.LoginStore.loginStatus;
    },
    loginStoreUserBaseInfos() {
      return this.$store.state.LoginStore.loginUserBaseInfos;
    },
  },
  methods: {
    onConnectedSuccess() {
      const { loginUserId } = this.loginStoreUserBaseInfos || {};
      const finalLoginUserId = loginUserId || EMClient.user;
      if (!this.loginStoreStatus) {
        this.fetchLoginUserNeedData();
        uni.hideLoading();
        console.log(">>>>>>开始跳转至会话列表页面");
        uni.redirectTo({
          url: "../home/home?myName=" + finalLoginUserId,
        });
      }
      this.$store.commit("SET_LOGIN_USER_BASE_INFOS", {
        loginUserId: finalLoginUserId,
      });
      this.$store.commit("SET_LOGIN_STATUS", true);
    },
    onDisconnect() {
      const { closeEaseIM } = emConnect();
      const { actionEMReconnect } = emHandleReconnect();
      //断开回调触发后，如果业务登录状态为true则说明异常断开需要重新登录
      if (!this.loginStatus) {
        uni.showToast({
          title: "退出登录",
          icon: "none",
          duration: 2000,
        });
        uni.redirectTo({
          url: "../login/login",
        });
        closeEaseIM();
      } else {
        console.log(">>>>>需执行重登逻辑");
        //执行通过token进行重新登录
        actionEMReconnect();
      }
    },
    onReconnecting() {
      uni.showToast({
        title: "IM 重连中...",
        icon: "none",
      });
    },
    //获取登录所需基础参数
    async fetchLoginUserNeedData() {
      await this.$store.dispatch("fetchFriendList");
      //获取好友用户属性
      await this.$store.dispatch("fetchFriendUserInfoCollection");
      //获取当前登录用户好友信息
      await this.$store.dispatch("fetchLoginUserProfile");
      await this.$store.dispatch("fetchBlockUserList");
      // 在线状态订阅
      await this.$store.dispatch("subscribePresenceStatus");
      this.fetchJoinedGroupList();
      //初始化缓存本地的新邀请列表
      this.$store.commit("INIT_RECEIVE_INVITE_LIST");
    },
    //获取加入的群组列表
    async fetchJoinedGroupList() {
      //获取群组列表
      await this.$store.dispatch("fetchJoinedGroupList", {
        isInit: true,
      });
    },
    //自动登录
    handleAutoLoginEaseIM() {
      const { actionEMReconnect } = emHandleReconnect();
      const loginInfos = uni.getStorageSync(`EM_LOGIN_INFOS`);
      if (!loginInfos) return;
      actionEMReconnect();
    },
  },
};
</script>
<style lang="scss">
@import "./app.css";
@import "@/uni_modules/uview-ui/index.scss";
</style>
