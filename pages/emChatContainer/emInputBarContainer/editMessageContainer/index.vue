<template>
  <view class="edit_message_container">
    <view class="edit_message_container_left">
      <u-icon class="edit_message_container_left_icon"></u-icon>
      <text class="edit_message_container_left_text">正在编辑...</text>
    </view>
    <view class="edit_message_container_right">
      <u-icon
        @click="$emit('onShowEditMessageContainer')"
        class="edit_message_container_right_icon"
        name="/static/images/new_ui/message/replyMessage/close_icon.png"
      ></u-icon>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
.edit_message_container {
  width: 100%;
  height: 30px;
  background-color: #eff0f1;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.edit_message_container_left_text {
  /* Nickname */

  width: 36px;
  height: 16px;

  /* 简体中文/标签/小 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  /* Neutral Special/5 */
  color: #5270ad;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
