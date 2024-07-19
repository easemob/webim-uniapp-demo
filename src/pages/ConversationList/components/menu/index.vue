<template>
  <view class="shade" @tap="emits('onMenuClose')">
    <view class="pop show" :style="popStyle">
      <view
        v-for="(item, index) in popButton"
        :key="item.type"
        @tap="handleClick({ type: item.type })"
        :data-index="index"
        >{{ item.name }}</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConversationStore } from "@/store/conversation";

const { deleteConversation, markConversationRead } = useConversationStore();

const { t } = useI18n();

const CONV_OPERATION_TYPE = {
  DELETE: "DELETE",
  PIN: "PIN",
  MUTE: "MUTE",
  MARK_READ: "MARK_READ"
};

interface Props {
  conversation: EasemobChat.ConversationItem;
  popStyle: string;
}
const emits = defineEmits(["onMenuClose"]);
const props = defineProps<Props>();
const popButton = ref([
  {
    name: t("markRead"),
    type: CONV_OPERATION_TYPE.MARK_READ
  },
  {
    name: t("deleteConv"),
    type: CONV_OPERATION_TYPE.DELETE
  }
  // {
  //   name: t("pinConv"),
  //   type: CONV_OPERATION_TYPE.PIN
  // },
  // {
  //   name: t("muteConv"),
  //   type: CONV_OPERATION_TYPE.MUTE
  // }
]);

const handleClick = (params: { type: string }) => {
  switch (params.type) {
    case CONV_OPERATION_TYPE.MARK_READ:
      markConversationRead(props.conversation);
      break;
    case CONV_OPERATION_TYPE.DELETE:
      deleteConversation(props.conversation);
      break;
    case CONV_OPERATION_TYPE.PIN:
      console.log("置顶会话");
      break;
    case CONV_OPERATION_TYPE.MUTE:
      console.log("静音会话");
      break;
  }
  emits("onMenuClose");
};
</script>
<style lang="scss" scoped>
/* 遮罩 */
.shade {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-touch-callout: none;

  .pop {
    position: absolute;
    z-index: 101;
    width: 200rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    text-align: left;
    color: #333;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    line-height: 80rpx;
    transition: transform 0.15s ease-in-out 0s;
    user-select: none;
    -webkit-touch-callout: none;
    transform: scale(0, 0);

    &.show {
      transform: scale(1, 1);
    }

    & > view {
      padding: 0 20rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;
      -webkit-touch-callout: none;

      &:active {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
