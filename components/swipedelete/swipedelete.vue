<template>
  <view
    class="swipedelete-wrapper"
    @touchmove="touchMoveHandler"
    @touchstart="touchStartHandler"
    :style="'transform:translateX(' + translateX + 'rpx)'"
  >
    <slot></slot>
    <view class="swipedelete-btn" @tap="deleteItem">删除</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
let startX = 0;
/* emits */
const $emits = defineEmits(['deleteChatItem']);
const translateX = ref(0);
const deleteItem = (e) => {
  translateX.value = 0;
  $emits(
    'deleteChatItem',
    {},
    {
      bubbles: true,
    }
  );
};
/**
 * 滑动删除事件-滑动开始
 */
const touchStartHandler = (e) => {
  startX = e.touches[0].pageX;
};
/**
 * 滑动删除事件-滑动
 */
const touchMoveHandler = (e) => {
  let pageX = e.touches[0].pageX;
  let moveX = pageX - startX;
  if (Math.abs(moveX) < 80) {
    return;
  } // e.target.style.WebkitTransform = `translateX(${moveX}px)`

  if (moveX > 0) {
    // 右滑 隐藏删除
    if (Math.abs(translateX.value) == 0) {
      return;
    } else {
      translateX.value = 0;
    }
  } else {
    // 左滑 显示删除
    if (Math.abs(translateX.value) >= 160) {
      return;
    } else {
      translateX.value = -160;
    }
  }
};
</script>
<style>
@import './swipedelete.css';
</style>
