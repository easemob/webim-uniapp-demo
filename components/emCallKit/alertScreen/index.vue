<template>
  <view class="alert_screen_container">
    <text>待接听弹窗</text>
    <button>接听</button>
    <button>挂断</button>
  </view>
</template>

<script setup></script>

<style>
.alert_screen_container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: pink;
}
</style>
