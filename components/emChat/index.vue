<template>
  <view>
    <!-- <message-list /> -->
    <MessageListContainer />
    <!-- <input-bar /> -->
  </view>
</template>

<script>
// import MessageList from './messageList';
import MessageListContainer from './MessageListContainer';
// import InputBar from './inputBar';
export default {
  components: {
    // MessageList,
    MessageListContainer,
    // InputBar,
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
};
</script>

<style scoped></style>
