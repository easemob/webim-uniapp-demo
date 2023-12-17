<template>
  <view class="msg_quote_container u-line-2">
    <text>{{ msgQuoteContent.msgSender }}</text
    >：<text>{{ msgQuotePreview }}</text></view
  >
</template>

<script>
import { MESSAGE_STATUS } from '@/EaseIM/constant';

export default {
  props: {
    msgQuoteContent: {
      type: Object,
      default: () => ({
        msgID: '', //引用消息id
        msgPreview: '', //引用消息预览
        msgSender: '', //引用消息发送人
        msgType: '', //引用消息类型
      }),
      required: true,
    },
  },
  computed: {
    messageStatusCollection() {
      return this.$store.getters.messageStatusCollection;
    },
    msgQuotePreview() {
      if (
        this.messageStatusCollection[this.msgQuoteContent.msgID] ===
        MESSAGE_STATUS.RECALL
      ) {
        return '消息被撤回';
      } else {
        return this.msgQuoteContent.msgPreview;
      }
    },
  },
};
</script>

<style scoped>
.msg_quote_container {
  width: 100%;
  max-width: 70%;
  min-width: 100px;
  background-color: #f1f2f3;
  border-radius: 4px;
  color: #75828a;
  padding: 8px 12px 8px 12px;
  font-size: 14px;
  word-break: break-all;
}
</style>
