<template>
  <chat
    id="groupchat"
    ref="chatComp"
    :chatParams="chatParams"
    :groupId="groupId"
    chatType="chatRoom"
  >
  </chat>
</template>

<script setup>
import chat from '@/components/chat/chat.vue';
import disp from '@/utils/broadcast';
import { ref, reactive, toRefs } from 'vue';
import {
  onLoad,
  onUnload,
  onPullDownRefresh,
  onNavigationBarButtonTap,
} from '@dcloudio/uni-app';
const chatComp = ref(null);
let chatParams = reactive({});
/* props */
const props = defineProps({
  groupId: {
    type: String,
    default: '',
  },
});
const { groupId } = toRefs;

// options = 系统传入的 url 参数
onLoad((options) => {
  let params = JSON.parse(options.username);
  chatParams = Object.assign(chatParams, params);
  uni.username = params;
  uni.setNavigationBarTitle({
    title: chatParams.your,
  });
});
onUnload(() => {
  disp.fire('em.chatroom.leave');
});
onPullDownRefresh(() => {
  uni.showNavigationBarLoading();
  // this.selectComponent('#groupchat').$vm.getMore();
  // 停止下拉动作
  chatComp.value.getMore();
  uni.hideNavigationBarLoading();
  uni.stopPullDownRefresh();
});
onNavigationBarButtonTap((e) => {
  uni.navigateTo({
    url: `/pages/moreMenu/moreMenu?username=${chatParams.groupId}&type=groupChat`,
  });
});
</script>
<style>
@import './groupChatEntry.css';
</style>
