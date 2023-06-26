<template>
  <view>
    <message-list />
    <input-bar />
  </view>
</template>

<script setup>
/* component */
import MessageList from './messageList';
import InputBar from './inputBar';
import { onLoad } from '@dcloudio/uni-app';
import emHandleReconnect from '@/EaseIM/utils/emHandleReconnect';
const { getEMClientSocketState, actionEMReconnect } = emHandleReconnect();
onLoad(() => {
  if (!getEMClientSocketState()) {
    actionEMReconnect();
  }
});
</script>
