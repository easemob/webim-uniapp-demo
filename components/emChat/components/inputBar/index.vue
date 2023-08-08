<template>
  <view
    class="input_bar_container"
    :style="{ bottom: `${keyboardHeight}px` }"
    @touchmove.stop.prevent="moveStop"
  >
    <!-- <textarea></textarea> -->
    111111
    <textarea
      type="text"
      cursor-spacing="65"
      confirm-type="none"
      :confirm-hold="true"
      auto-height
      :show-confirm-bar="false"
      maxlength="300"
      :adjust-position="false"
      @keyboardheightchange="listenerKeyboardHeight"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
//存储键盘高度
let keyboardHeight = ref(0);
const listenerKeyboardHeight = (e) => {
  //   console.log('>>>>>监听到键盘高度变化', e);
  keyboardHeight.value = e.detail.height;
};
const moveStop = () => {
  return;
};
onLoad(() => {});
</script>

<style>
@import './index.css';
</style>
