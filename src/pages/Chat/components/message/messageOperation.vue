<template>
  <view class="msg-operation" :style="isSelf ? { right: 0 } : { left: 0 }">
    <view class="content">
      <view class="msg-operate-item" @tap="emitRecall">
        {{ $t("recall") }}
      </view>
      <!-- <view class="msg-operate-item"> 举报 </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMessageStore } from "@/store/message";
import { useConversationStore } from "@/store/conversation";
import type { MixedMessageBody } from "@/types/index";
import { useI18n } from "vue-i18n";

interface Props {
  msg: MixedMessageBody;
  isSelf: boolean;
}
const { recallMessage } = useMessageStore();
const { getCvsIdFromMessage } = useConversationStore();
const emits = defineEmits(["onFinished"]);
const { t } = useI18n();

const props = defineProps<Props>();
const { msg, isSelf } = props;

const emitRecall = () => {
  recallMessage({
    mid: msg.id,
    to: getCvsIdFromMessage(msg),
    chatType: msg.chatType
  })
    .catch((e) => {
      uni.showToast({
        title: `${t("recallFailed")} ${e.message}`,
        icon: "none"
      });
    })
    .finally(() => {
      emits("onFinished");
    });
};
</script>

<style lang="scss" scoped>
.msg-operation {
  position: absolute;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 0.625rem;
  bottom: -55rpx;
  border-radius: 10rpx;
  color: #fff;
  font-size: 28rpx;
}

.content {
  display: flex;
  align-items: center;
}
.msg-operate-item {
  margin: 0 10rpx;
  flex-shrink: 0;
}
</style>
