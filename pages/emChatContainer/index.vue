<template>
  <view>
    <!-- <em-chat /> -->
    <z-paging
      ref="paging"
      v-model="dataList"
      use-chat-record-mode
      :default-page-size="20"
      :safe-area-inset-bottom="true"
      @query="queryList"
      :use-page-scroll="true"
    >
      <template #top>
        <em-chat-navbar :targetId="targetId" :chatType="chatType" />
      </template>
      <!-- 聊天item，:id="`z-paging-${index}`"必须加 -->
      <view
        class="click_more_history_box"
        v-if="isLoadingLocalMsgList"
        @click="onClickLoadMore"
        >如无更多，试试点击加载更多</view
      >
      <view
        v-for="(msgBody, index) in dataList"
        :key="msgBody.id"
        :id="'mid' + msgBody.id"
      >
        <em-message-list-container
          ref="emMessageListComps"
          v-show="
            isShowMessageItem(msgBody) &&
            msgBody.type !== MESSAGE_TYPE.GRAY_INFORM
          "
          :msgBody="msgBody"
          :isNeedShowMessageTime="isNeedShowMessageTime(msgBody, index)"
          :quoteMsgId="quoteMsgId"
          @alertMessagePopup="alertMessagePopup"
          @scrollToQuoteMessge="scrollToQuoteMessge"
        />
        <!-- 灰色系统通知类型消息 -->
        <em-gray-message-container
          v-show="
            !isShowMessageItem(msgBody) ||
            msgBody.type === MESSAGE_TYPE.GRAY_INFORM
          "
          :msgBody="msgBody"
          @reEditTextMessage="reEditTextMessage"
        />
      </view>
      <!-- 底部聊天输入框 -->
      <template #bottom>
        <em-input-bar-container
          ref="emInputBarComps"
          @resetScrollHeight="resetScrollHeight"
          :checkedPopupMsgBody="checkedPopupMsgBody"
        />
        <em-message-popup
          ref="emMessagePopupComps"
          @callReplyMessage="callReplyMessage"
          @callEditMessage="callEditMessage"
        />
      </template>
    </z-paging>
  </view>
</template>

<script>
import EmChatNavbar from './emChatNavbar';
import EmMessageListContainer from './emMessageListContainer';
import EmInputBarContainer from './emInputBarContainer';
import EmGrayMessageContainer from './emGrayMessageContainer';
import EmMessagePopup from './emMessagePopup';
import { CHAT_TYPE, MESSAGE_STATUS } from '@/EaseIM/constant';
import { EVENT_BUS_NAME } from '@/constant';
import { MESSAGE_TYPE } from '../../EaseIM/constant';
export default {
  components: {
    EmChatNavbar,
    EmMessageListContainer,
    EmInputBarContainer,
    EmGrayMessageContainer,
    EmMessagePopup,
  },
  data() {
    return {
      MESSAGE_STATUS,
      MESSAGE_TYPE,
      targetId: '',
      chatType: '',
      //v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      dataList: [],
      isLoadingLocalMsgList: false,
      checkedPopupMsgBody: {}, //当msg popup弹起时选中的消息体
      quoteMsgId: '',
    };
  },

  onLoad(option) {
    console.log(option);
    this.targetId = option.targetId;
    this.chatType = option.chatType;
    this.$store.commit('SET_CHATING_USER_INFO', {
      targetId: this.targetId,
      chatType: this.chatType,
    });
  },
  onPageScroll(e) {
    //更新z-paging内部scrollTop
    this.$refs.paging.updatePageScrollTop(e.scrollTop);
    //如果滚动到顶部，触发加载更多聊天记录
    if (e.scrollTop < 10) {
      this.$refs.paging.doChatRecordLoadMore();
    }
  },
  provide() {
    return {
      targetId: () => this.targetId,
      chatType: () => this.chatType,
    };
  },
  mounted() {
    uni.$on(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_UPDATE,
      this.appentNewMessage
    );
    uni.$on(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_DELETE,
      this.onDeleteMessage
    );
    uni.$on(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_MODIFY,
      this.onModifyMessage
    );
  },
  computed: {
    joinedGroupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    messageList() {
      return this.$store.state.MessageStore.messageCollection[this.targetId];
    },
    messageCollectionStatus() {
      return this.$store.getters.messageStatusCollection;
    },
    //recall delete 两种消息状态不展示对应消息item
    isShowMessageItem() {
      return (msgBody) => {
        if (!msgBody.id) return false;
        if (
          this.messageCollectionStatus &&
          this.messageCollectionStatus[msgBody.id] === MESSAGE_STATUS.DELETE
        ) {
          return false;
        } else if (
          this.messageCollectionStatus &&
          this.messageCollectionStatus[msgBody.id] === MESSAGE_STATUS.RECALL
        ) {
          return false;
        } else {
          return true;
        }
      };
    },
    //两条消息之差大于5min，方可展示消息时间。
    isNeedShowMessageTime() {
      return (msgBody, index) => {
        const { time } = msgBody;

        if (index !== 0) {
          const lastTime = this.dataList[index - 1]?.time;

          if (time - lastTime > 300000) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      };
    },
  },
  watch: {
    messageList() {
      console.log('>>>>监听到消息列表变化');
      this.$store.dispatch('updateConversationLastMsg', {
        conversationId: this.targetId,
      });
    },
  },
  methods: {
    getGroupName(groupid) {
      let groupName = '';
      if (this.joinedGroupList.length) {
        this.joinedGroupList.forEach((item) => {
          if (item.groupid === groupid) {
            console.log(item.groupname);
            return (groupName = item.groupname);
          }
        });
        console.log('groupName', groupName);
        return groupName;
      } else {
        return groupid;
      }
    },
    getTheIdName(targetId, chatType) {
      if (chatType === CHAT_TYPE.SINGLE_CHAT) {
        const friendInfo = this.friendUserInfoCollection[targetId];
        return friendInfo?.nickname || targetId;
      }
      if (chatType === CHAT_TYPE.GROUP_CHAT) {
        return this.getGroupName(targetId);
      }
      switch (chatType) {
        case CHAT_TYPE.SINGLE_CHAT:
          const friendInfo = this.friendUserInfoCollection[targetId];
          friendInfo?.nickname || targetId;
          break;
        case CHAT_TYPE.GROUP_CHAT:
          console.log('>>>>>>> Group');
          this.getGroupName(targetId);
          break;
        default:
          return null;
      }
    },
    async queryList(pageNo, pageSize, from) {
      /* from  0.用户主动下拉刷新 1.通过reload触发 2.通过refresh触发 3.通过滚动到底部加载更多或点击底部加载更多触发) */
      console.log(pageNo, pageSize, from);
      /* 初始化时获取数据 */
      if (from === 1) {
        if (!this.messageList?.length) {
          try {
            const messages = await this.getMoreHistoryMessages();
            this.$refs.paging.complete([...messages]);
            //补充滚动置底，防止图片消息撑开内容导致，未滚动置底
            setTimeout(() => {
              this.$refs.paging.scrollToBottom();
            }, 500);
          } catch (error) {
            console.log('漫游加载失败', error);
            this.$refs.paging.complete(false);
          }
        } else {
          /* 设置本地分页，请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging作分页处理 */
          this.isLoadingLocalMsgList = true;
          this.$refs.paging.setLocalPaging([...this.messageList]);
          //补充滚动置底，防止图片消息撑开内容导致，未滚动置底
          setTimeout(() => {
            this.$refs.paging.scrollToBottom();
          }, 500);

          console.log('>>>>加载本地已有历史记录。');
        }
      }
      if (from === 2) {
        return;
      }
      /* 触顶加载更多消息时获取数据 */
      if (from === 3) {
        console.log('>>>>触顶加载更多');
        try {
          const messages = await this.getMoreHistoryMessages();
          this.$refs.paging.complete([...messages]);
        } catch (error) {
          console.log('漫游加载失败', error);
          this.$refs.paging.complete(false);
        }
      }
    },
    async getMoreHistoryMessages() {
      const params = {
        targetId: this.targetId,
        chatType: this.chatType,
      };
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('fetchHistroyMessageListFromServer', params)
          .then((res) => {
            resolve(res.messages);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    //执行新增消息
    appentNewMessage(data) {
      console.log('>>>>>新消息添加', data);
      const { msgBody } = data;
      this.$refs.paging.addChatRecordData({
        ...msgBody,
      });
    },
    //监听删除消息更新当前list
    async onDeleteMessage() {
      this.isLoadingLocalMsgList = true;
      const res = await this.$refs.paging.setLocalPaging([...this.messageList]);
    },
    //监听编辑消息更新item
    onModifyMessage(data) {
      /**
       * @function updateChatRecordData
       * @description 此方法为自己往插件库中新增的一个方法，主要为更新本地分页数据中已存在的消息体。
       */
      //    updateChatRecordData(data) {
      //   if (!this.useChatRecordMode) return;
      //   const _index = this.totalData.findIndex((o) => o.id === data.id);
      //   _index >= 0 && (this.totalData[_index] = data);
      // }
      this.$refs.paging.updateChatRecordData(data);
    },
    async onClickLoadMore() {
      try {
        const messages = await this.getMoreHistoryMessages();
        if (messages.length) {
          this.$refs.paging.addDataFromTop([...messages]);
          this.$refs.paging.doChatRecordLoadMore();
        } else {
          this.isLoadingLocalMsgList = false;
          uni.showToast({
            title: '真的没有更多了',
            icon: 'none',
            duration: 2000,
          });
          return;
        }
      } catch (error) {
        console.log('漫游加载失败', error);
        this.$refs.paging.complete(false);
      }
    },
    //重新编辑
    reEditTextMessage(msgContent) {
      this.$refs.emInputBarComps.appendReEditTextMessage(msgContent);
    },
    resetScrollHeight(height) {
      this.$nextTick(() => {
        this.$refs.paging.updatePageScrollTopHeight();
        console.log(this.scrollHeight);
      });
    },
    //弹出消息对应popup
    alertMessagePopup(msgBody) {
      this.$refs.emMessagePopupComps.alertMessagePopup(msgBody);
      this.checkedPopupMsgBody = msgBody;
    },
    //调起消息回复模式
    callReplyMessage() {
      this.$refs.emInputBarComps.onShowReplyMessageContainer();
    },
    callEditMessage(msgBody) {
      this.$refs.emInputBarComps.onShowEditMessageContainer(msgBody);
    },
    //滚动至引用消息所在位置
    scrollToQuoteMessge(msgQuote) {
      const { msgID } = msgQuote;
      if (msgID) {
        const dom = uni
          .createSelectorQuery()
          .in(this)
          .select('#mid' + msgID);
        dom
          .boundingClientRect((data) => {
            if (data) {
              this.$refs.paging.scrollIntoViewByNodeTop(data.top, 50);
              //闪烁该条引用消息
              this.setQuoteMessageId(msgID);
            } else {
              uni.showToast({
                icon: 'none',
                title: '没有回复的消息',
              });
            }
          })
          .exec();
      }
    },
    //设置引用消息ID从而引起消息气泡闪烁
    setQuoteMessageId(quoteMsgId) {
      this.quoteMsgId = quoteMsgId;
      //引起子组件增加闪烁样式后，延时半秒自定清空设置的引用消息id
      setTimeout(() => {
        this.quoteMsgId = '';
      }, 500);
    },
  },
  onUnload() {
    //置空正在沟通中的用户信息
    this.$store.commit('SET_CHATING_USER_INFO', {});
    uni.$off(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_UPDATE,
      this.appentNewMessage
    );
    uni.$off(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_DELETE,
      this.onDeleteMessage
    );
    uni.$off(
      EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_MODIFY,
      this.onModifyMessage
    );
  },
};
</script>

<style scoped>
@import './index.css';
</style>
