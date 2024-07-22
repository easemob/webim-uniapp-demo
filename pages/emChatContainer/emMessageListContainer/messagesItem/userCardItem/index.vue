<template>
  <view
    :class="[
      'user_card_msg_container',
      isSelf ? 'user_card_msg_container_mine' : 'user_card_msg_container_other',
    ]"
  >
    <view class="user_card_content">
      <view class="user_card_content_header">
        <u-avatar shape="square" :src="avatarUrl" size="30"></u-avatar>
        <text class="nickName">{{ nickName }}</text>
      </view>
      <u-line></u-line>
      <text class="user_card_footer">个人名片</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultAvatar: '/static/images/new_ui/defaultAvatar.png',
    };
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
    avatarUrl() {
      return this.msgBody?.customExts?.avatarurl || this.defaultAvatar;
    },
    nickName() {
      return (
        this.msgBody?.customExts?.nickname || this.msgBody?.customExts?.uid
      );
    },
  },
};
</script>

<style scoped>
.user_card_msg_container {
  width: 245px;
  height: 60px;
  padding: 5px 8px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
}
.user_card_msg_container_mine {
  flex-direction: row-reverse;
  color: #f9fafa;
  background-color: #009eff;
  border-radius: 16px 12px 4px 16px;
}
.user_card_msg_container_other {
  color: #171a1c;
  background-color: #e5f5ff;
  border-radius: 12px 16px 16px 4px;
}
.user_card_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.user_card_content_header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.user_card_content_header text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin: 0 4px;
}
.user_card_footer {
  font-size: 12px;
}
</style>
