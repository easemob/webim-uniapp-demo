<template>
  <view
    class="input_bar_container"
    :style="{ bottom: `${keyboardHeight}px` }"
    @touchmove.stop.prevent="moveStop"
  >
    <input-main />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import InputMain from './suit/main';
//存储键盘高度
let keyboardHeight = ref(0);
const listenerKeyboardHeight = (e) => {
  keyboardHeight.value = e.height;
};
const moveStop = () => {
  return;
};
//核心文本输入相关
const inputMainComp = ref(null);
onLoad(() => {
  //监听键盘抬起事件
  uni.onKeyboardHeightChange(listenerKeyboardHeight);
});
onUnload(() => {
  //卸载监听键盘事件
  uni.offKeyboardHeightChange(listenerKeyboardHeight);
});
</script>

<style>
@import './index.css';
</style>
