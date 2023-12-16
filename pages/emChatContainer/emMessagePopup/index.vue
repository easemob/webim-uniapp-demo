<template>
  <view>
    <u-popup round="16" :show="show" @close="close" @open="open">
      <view class="message_more_func_container">
        <!-- 复制 -->
        <view
          v-if="msgBody.type === MESSAGE_TYPE.TEXT"
          class="message_more_func_item u-border-bottom"
          @click="copyTextMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/copy_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">复制</text>
        </view>
        <!-- 回复 -->
        <view
          class="message_more_func_item u-border-bottom"
          @click="replyMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/reply_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">回复</text>
        </view>
        <!-- 编辑 -->
        <view v-if="isSelf" class="message_more_func_item u-border-bottom">
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/edit_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">编辑</text>
        </view>
        <!-- 删除 -->
        <view class="message_more_func_item u-border-bottom">
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/del_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">删除</text>
        </view>
        <!-- 撤回 -->
        <view v-if="isSelf" class="message_more_func_item u-border-bottom">
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/recall_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">撤回</text>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { MESSAGE_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      MESSAGE_TYPE,
      show: false,
      msgBody: {},
    };
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
  },
  methods: {
    open() {
      // console.log('open');
    },
    close() {
      this.show = false;
    },
    alertMessagePopup(msgBody) {
      this.msgBody = Object.assign({}, msgBody);
      this.show = true;
    },
    //复制文本消息至剪切板
    copyTextMessage() {
      uni.setClipboardData({
        data: this.msgBody.msg,
        success: (res) => {
          uni.showToast({
            title: '已复制',
            icon: 'none',
          });
        },
        fail: (e) => {
          console.log('文本复制失败', e);
          uni.showToast({
            title: '复制失败',
            icon: 'none',
          });
        },
        complete: () => {
          this.show = false;
        },
      });
    },
    //回复消息
    replyMessage() {
      this.$emit('callReplyMessage');
      this.show = false;
    },
  },
};
</script>

<style scoped>
.message_more_func_container {
  width: 100%;
  padding: 20px 15px 20px 15px;
}
.message_more_func_item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 56px;
}
.message_more_func_item_title {
  /* Enabled */

  width: 32px;
  height: 22px;

  /* 简体中文/文本/大 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */
  text-align: center;

  /* Neutral/1 */
  color: #171a1c;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
