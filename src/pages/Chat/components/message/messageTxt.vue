<template>
  <view class="msg-text">
    <span class="msg">
      <span v-for="(item, idx) in data" :key="idx">
        <span v-if="item.type === 'text'"> {{ item.value }}</span>
        <image v-else class="msg-emoji" :src="item.value" />
      </span>
    </span>
  </view>
</template>

<script lang="ts" setup>
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import { renderTxt } from "@/utils/index";
import { computed } from "vue";
interface Props {
  msg: EasemobChat.TextMsgBody;
}
const props = defineProps<Props>();

const data = computed(() => {
  return renderTxt(props.msg.msg);
});
</script>

<style lang="scss" scoped>
.msg {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}

.msg-text {
  text-align: left;
  overflow-y: auto;
  word-break: break-all;
  word-wrap: break-word;
  white-space: break-spaces;
}
</style>
