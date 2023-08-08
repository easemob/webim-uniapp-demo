<template>
  <view class="emchat_container">
    <message-list @closeAllModal="closeAllModal" />
    <input-bar ref="inputRef" />
  </view>
</template>

<script setup>
import { ref } from 'vue';
/* component */
import MessageList from './messageList';
import InputBar from './inputBar';
import { onLoad } from '@dcloudio/uni-app';
import emHandleReconnect from '@/EaseIM/utils/emHandleReconnect';
const { getEMClientSocketState, actionEMReconnect } = emHandleReconnect();
const inputRef = ref(null);
const closeAllModal = () => inputRef.value?.closeAllModal();
onLoad(() => {
  if (!getEMClientSocketState()) {
    actionEMReconnect();
  }
});
</script>
<style>
.emchat_container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: pink;
}
</style>
