<template>
  <view class="home_container">
    <template v-if="isActiveComps === 'conversation'">
      <Conversation />
    </template>
    <template v-if="isActiveComps === 'contacts'">
      <Contacts />
    </template>
    <template v-if="isActiveComps === 'me'">
      <Me />
    </template>
    <Tabbar
      :tab-type="isActiveComps"
      @switchHomeComponent="switchHomeComponent"
    />
  </view>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import emHandleReconnect from '@/EaseIM/utils/emHandleReconnect';
/* components */
import Tabbar from '@/layout/tabbar';
import Conversation from '@/pages/conversation/conversation.vue';
import Contacts from '@/pages/contacts/contacts.vue';
import Me from '@/pages/me/me.vue';
const isActiveComps = ref('conversation');

const switchHomeComponent = (type) => {
  isActiveComps.value = type;
};
/* 设置当前标题 */
const titleMap = {
  conversation: '会话列表',
  contacts: '联系人',
  me: '我的',
};
watchEffect(() => {
  uni.setNavigationBarTitle({
    title: titleMap[isActiveComps.value],
  });
});
const { getEMClientSocketState, actionEMReconnect } = emHandleReconnect();
onLoad((options) => {
  //通过路由传参的形式可指定该页面展示某个指定组件
  if (options.page) {
    switchHomeComponent(options.page);
  }
  //根据当前SDK状态判断是否需要重连

  if (!getEMClientSocketState()) {
    actionEMReconnect();
  }
});
</script>

<style></style>
