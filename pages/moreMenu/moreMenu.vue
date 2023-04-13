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
import msgType from '@/components/chat/msgtype';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { pushStorageSave } from '../../components/chat/pushStorage';
const WebIM = uni.WebIM;
/* props */
const props = defineProps({
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
  },
});
const { chatType } = toRefs(props);

const moreMenuState = reactive({
  currentUser: '',
  switchStatus: false,
  type: '',
});
onLoad((options) => {
  moreMenuState.currentUser = options.username;
  moreMenuState.type = options.type;
});

onMounted(() => {
  let currentLoginUser = WebIM.conn.context.userId;
  let newObj = uni.getStorageSync('pushStorageData') || {};
  let newAry = newObj[currentLoginUser] || [];
  // 当前会话是否被禁言
  const option = {
    conversationId: moreMenuState.currentUser,
    type: moreMenuState.type,
  };
  WebIM.conn.getSilentModeForConversation(option).then((res) => {
    if (res.data.type === 'NONE') {
      moreMenuState.switchStatus = true;
      newAry = newAry.concat(this.currentUser);
    }
  });
  newObj[currentLoginUser] = newAry;
  uni.setStorage({
    key: 'pushStorageData',
    data: newObj,
    success: function (params) {
      console.log('>>>>>>', uni.getStorageSync('pushStorageData'));
    },
  });
});

const onSwitchChange = (event) => {
  if (event.target.value) {
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
const onSetSilent = () => {
  const option = {
    conversationId: moreMenuState.currentUser,
    type: moreMenuState.type,
    options: {
      paramType: 0,
      remindType: 'NONE',
    },
  };
  WebIM.conn.setSilentModeForConversation(option).then((res) => {
    if (res.data.type === 'NONE') {
      pushStorageSave({ userId: moreMenuState.currentUser, type: 'add' });
    }
  });
};
// 清除推送免打扰
const onClearSilent = () => {
  const option = {
    conversationId: moreMenuState.currentUser,
    type: moreMenuState.type,
  };
  WebIM.conn.clearRemindTypeForConversation(option).then((res) => {
    pushStorageSave({ userId: moreMenuState.currentUser, type: 'remove' });
  });
};
</script>
<style>
@import '../setting_general/setting_general.css';
</style>
