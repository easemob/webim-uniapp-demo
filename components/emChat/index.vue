<template>
  <view>
    <message-list />
    <!-- <input-bar /> -->
  </view>
</template>

<script>
import MessageList from './messageList';
import InputBar from './inputBar';
export default {
  components: {
    MessageList,
    InputBar,
  },
  inject: ['targetId', 'chatType'],
  data() {
    return {};
  },

  computed: {
    ItargetId() {
      return this.targetId();
    },
    IchatType() {
      return this.chatType();
    },
  },
  onPullDownRefresh() {
    // this.getMoreHistoryMessages();
    console.log('>>>>>开始了下拉页面');
  },
};
</script>

<style scoped></style>
