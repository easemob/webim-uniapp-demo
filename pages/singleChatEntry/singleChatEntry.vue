<template>
  <chat
    id="chat"
    ref="chatComp"
    :chatParams="chatParams"
    chatType="singleChat"
  ></chat>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
  onLoad,
  onUnload,
  onPullDownRefresh,
  onNavigationBarButtonTap,
} from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
import chat from '@/components/chat/chat.vue';

const chatComp = ref(null);
let chatParams = reactive({});
onNavigationBarButtonTap(() => {
  uni.navigateTo({
    url: `/pages/moreMenu/moreMenu?username=${chatParams.your}&type=singleChat`,
  });
});
onLoad((options) => {
  let params = JSON.parse(options.username);
  chatParams = Object.assign(chatParams, params);
  // 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下
  uni.username = params;
  uni.setNavigationBarTitle({
    title: params?.yourNickName || params?.your,
  });
});
onPullDownRefresh(() => {
  uni.showNavigationBarLoading();
  chatComp.value.getMore();
  // 停止下拉动作
  uni.hideNavigationBarLoading();
  uni.stopPullDownRefresh();
});

onUnload(() => {
  disp.fire('em.chatroom.leave');
});
</script>
<style>
@import './singleChatEntry.css';
</style>
