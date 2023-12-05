<template>
  <view>
    <em-chat-navbar :targetId="targetId" :chatType="chatType" />
    <em-chat />
  </view>
</template>

<script>
import EmChatNavbar from './emChatNavbar';
import EmChat from '@/components/emChat';
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      targetId: '',
      chatType: '',
      //v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      dataList: [],
    };
  },
  components: {
    EmChatNavbar,
    EmChat,
  },
  onLoad(option) {
    console.log(option);
    this.targetId = option.targetId;
    this.chatType = option.chatType;
    this.$store.commit('SET_CHATING_USERID', option.targetId);
  },
  onPageScroll(e) {
    //更新z-paging内部scrollTop
    this.$refs.paging.updatePageScrollTop(e.scrollTop);
    //如果滚动到顶部，触发加载更多聊天记录
    if (e.scrollTop < 10) {
      this.$refs.paging.doChatRecordLoadMore();
    }
  },
  mounted() {
    // uni.setNavigationBarTitle({
    //   title: this.getTheIdName(this.targetId, this.chatType),
    // });
  },
  provide() {
    return {
      targetId: () => this.targetId,
      chatType: () => this.chatType,
    };
  },
  computed: {
    joinedGroupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
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
        const friendInfo = this.friendUserInfoMap.get(targetId);
        return friendInfo?.nickname || targetId;
      }
      if (chatType === CHAT_TYPE.GROUP_CHAT) {
        return this.getGroupName(targetId);
      }
      switch (chatType) {
        case CHAT_TYPE.SINGLE_CHAT:
          const friendInfo = this.friendUserInfoMap.get(targetId);
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
    queryList(pageNo, pageSize) {
      //组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
      //这里的pageNo和pageSize会自动计算好，直接传给服务器即可
      //模拟请求服务器获取分页数据，请替换成自己的网络请求
      const params = {
        pageNo: pageNo,
        pageSize: pageSize,
      };
      this.$request
        .queryChatList(params)
        .then((res) => {
          //将请求的结果数组传递给z-paging
          this.$refs.paging.complete(res.data.list);
        })
        .catch((res) => {
          //如果请求失败写this.$refs.paging.complete(false);
          //注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
          //在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
          this.$refs.paging.complete(false);
        });
    },
    doSend(msg) {
      uni.showLoading({
        title: '发送中...',
      });
      setTimeout(() => {
        uni.hideLoading();
        this.$refs.paging.addChatRecordData({
          time: '',
          icon: '/static/daxiong.jpg',
          name: '大雄',
          content: msg,
          isMe: true,
        });
      }, 500);
    },
  },
  //   async onPullDownRefresh() {
  //     // this.getMoreHistoryMessages();
  //     console.log('>>>>>开始了下拉页面');
  //     uni.$emit('onPullDownRefresh');
  //   },
  onUnload() {
    console.log('>>>聊天容器页面卸载');
    //置空正在沟通中的用户ID
    this.$store.commit('SET_CHATING_USERID', '');
  },
};
</script>

<style scoped>
@import './index.css';
</style>
