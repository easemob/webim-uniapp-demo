<template>
  <view class="em_chat_container">
    <message-list @closeAllModal="closeAllModal" />
    <input-bar ref="inputRef" />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import MessageList from './components/messageList';
import InputBar from './components/inputBar';
const inputRef = ref(null);
const closeAllModal = () => inputRef.value?.closeAllModal();
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
