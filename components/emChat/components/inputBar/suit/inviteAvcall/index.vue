<template>
  <view>
    <uv-popup ref="invitePopup" mode="bottom" round="10">
      <view class="invite_btn_box">
        <text
          class="invite_func_btn"
          @click="sendAvCallMessage(CALL_TYPES.SINGLE_VIDEO)"
          >视频通话</text
        >
        <text
          class="invite_func_btn"
          @click="sendAvCallMessage(CALL_TYPES.SINGLE_VOICE)"
          >语音通话</text
        >

        <text class="invite_func_btn invite_func_btn_cannel" @click="onCannel"
          >取消</text
        >
      </view>
    </uv-popup>
  </view>
</template>

<script setup>
import { ref, inject } from 'vue';
import useAgoraChannelStore from '@/components/emCallKit/stores/channelManger';
import { CHAT_TYPE } from '@/EaseIM/constant';
import { CALL_TYPES } from '@/components/emCallKit/contants';
import onFeedTap from '@/utils/feedTap';
import { emInsertInformMessage } from '@/EaseIM/utils';
const agoraChannelStore = useAgoraChannelStore();
const injectTargetId = inject('targetId');
const invitePopup = ref(null);
const openInvitePopup = () => {
  invitePopup.value.open();
};
const closeInvitePopup = () => {
  invitePopup.value.close();
};
const onCannel = () => {
  onFeedTap && onFeedTap();
  closeInvitePopup();
};
const { insertInformMessage } = emInsertInformMessage();
const sendAvCallMessage = async (callType) => {
  onFeedTap && onFeedTap();
  try {
    await agoraChannelStore.sendInviteMessage(injectTargetId.value, callType);
    insertInformMessage({
      to: injectTargetId.value,
      chatType: CHAT_TYPE.SINGLE_CHAT,
      msg: `您已发起${
        callType === CALL_TYPES.SINGLE_VIDEO ? '视频通话' : '语音通话'
      }`,
    });
    uni.navigateTo({
      url: '/pages/emCallKitPages/alertScreen',
    });
  } catch (error) {
    console.log('>>>>通话邀请发起失败', error);
    uni.showToast({
      icon: 'none',
      title: '通话发起失败',
    });
  } finally {
    closeInvitePopup();
  }
};

defineExpose({
  openInvitePopup,
});
</script>

<style>
.invite_btn_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
}
.invite_func_btn {
  height: 55px;
  width: 100%;
  text-align: center;
}
.invite_func_btn_cannel {
  color: red;
  margin-top: 10px;
}
</style>
