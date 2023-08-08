<template>
  <view class="em_chat_container">
    <message-list />
    <input-bar />
  </view>
</template>

<script setup>
import MessageList from './components/messageList';
import InputBar from './components/inputBar';
</script>

<style>
.em_chat_container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #ededed;
}
</style>
