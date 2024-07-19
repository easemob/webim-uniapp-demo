<template>
  <view v-if="isShowTime" class="message-time">
    {{ time }}
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { getTimeStringAutoShort } from "@/utils/index";
interface Props {
  currTime: number;
  prevTime: number;
}

const props = defineProps<Props>();

const isShowTime = ref(false);
const time = ref("");

const handleItemTime = (currTime: number, prevTime: number) => {
  isShowTime.value = true;
  if (currTime <= 0) {
    return "";
  } else if (!prevTime || prevTime <= 0) {
    isShowTime.value = true;
    return getTimeStringAutoShort(currTime, true);
  } else {
    const minDiffToShow = 10 * 60 * 1000; // 10min
    const diff = currTime - prevTime; //
    if (diff >= minDiffToShow) {
      isShowTime.value = true;
      return getTimeStringAutoShort(currTime, true);
    }
  }
  return "";
};

watch(
  () => [props.currTime, props.prevTime],
  (newVal: any, oldVal: any) => {
    if (newVal?.toString() === oldVal?.toString()) {
      return;
    } else {
      time.value = handleItemTime(props.currTime, props.prevTime);
    }
  },
  {
    immediate: true
  }
);
</script>
<style lang="scss" scoped>
.message-time {
  margin: 0 auto;
  color: #999;
  font-size: 12px;
  overflow-wrap: anywhere;
  display: flex;
  place-content: center center;
  align-items: center;
  text-align: center;
}
</style>
