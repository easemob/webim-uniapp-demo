<template>
  <view>
    <view class="setting_list">
      <view class="setting_listContent">
        <text>配置推送免打扰</text>
        <switch
          :checked="moreMenuState.switchStatus ? true : false"
          color="#0873DE"
          @change="onSwitchChange"
        ></switch>
      </view>
    </view>

    <view class="setting_list">
      <view class="setting_listContent" @click="onToHistoryPage">
        <text>查看历史记录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
/* EaseIM */
import { emSilent } from '@/EaseIM/imApis';
/* pinia */
import { useLoginStore } from '@/stores/login';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
/* props */
// const props = defineProps({
//   chatType: {
//     type: String,
//     default: msgType.chatType.SINGLE_CHAT,
//   },
// });
// const { chatType } = toRefs(props);

const moreMenuState = reactive({
  currentUser: '',
  switchStatus: false,
  type: '',
});
onLoad((options) => {
  moreMenuState.currentUser = options.username;
  moreMenuState.type = options.type;
});
/* 免打扰静默设置 */
const {
  getSilentModeForConversation,
  setSilentModeForConversation,
  clearRemindTypeForConversation,
} = emSilent();
const loginStore = useLoginStore();
onMounted(() => {
  getSilentModeForConversation(
    moreMenuState.currentUser,
    moreMenuState.type
  ).then((res) => {
    console.log('>>>>>>调用当前id的静默设置', res);
    if (res?.data?.type === 'NONE') {
      moreMenuState.switchStatus = true;
    }
  });
});
const onSwitchChange = (event) => {
  if (event.detail.value) {
    onSetSilent();
  } else {
    onClearSilent();
  }
};
const onToHistoryPage = () => {
  uni.navigateTo({
    url: `/pages/searchMsg/searchMsg?username=${moreMenuState.currentUser}&type=${moreMenuState.type}`,
  });
};
// 开启推送免打扰
const onSetSilent = async () => {
  const paramType = 0;
  const remindType = 'NONE';
  console.log('setSilentModeForConversation');
  const params = {
    conversationId: moreMenuState.currentUser,
    type: moreMenuState.type,
    options: {
      paramType,
      remindType,
    },
  };
  try {
    await setSilentModeForConversation({ ...params });
    uni.showToast({ title: '免打扰已开启', icon: 'none' });
  } catch (error) {
    console.log('error', error);
    uni.showToast({ title: '免打扰开启失败', icon: 'none' });
  }
};
// 清除推送免打扰
const onClearSilent = async () => {
  console.log('clearRemindTypeForConversation');
  try {
    await clearRemindTypeForConversation(
      moreMenuState.currentUser,
      moreMenuState.type
    );
    uni.showToast({ title: '免打扰已关闭', icon: 'none' });
  } catch (error) {
    uni.showToast({ title: '免打扰关闭失败', icon: 'none' });
  }
};
</script>
<style>
@import '../settingGeneral/settingGeneral.css';
</style>
