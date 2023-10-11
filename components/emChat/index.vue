<template>
  <view> 目标用户ID：{{ ItargetId }},目标聊天类型：{{ IchatType }} </view>
</template>

<script>
export default {
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
