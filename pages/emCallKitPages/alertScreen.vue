<template>
  <view class="alert_screen_container">
    <view class="alert_header">
      <image class="avatar" src="/static/emCallKit/loginIcon.png" />
      <view class="name">{{ channelInfos.callerIMName || '未知呼叫' }}</view>
      <text>{{
        CALL_INVITE_TEXT[channelInfos.callType] + '...' || '未知类型呼叫'
      }}</text>
    </view>
    <view class="alert_footer">
      <view class="alert_btns">
        <view class="alert_btns_circle" @click="agreeJoinChannel">
          <image src="/static/emCallKit/icon_docdet02.png"></image>
          <text>接听</text>
        </view>
        <view class="alert_btns_circle" @click="refuseJoinChannel">
          <image src="/static/emCallKit/icon_video_cancel.png"></image>
          <text>拒接</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useInitCallKit } from '@/components/emCallKit';
import useAgoraChannelStore from '@/components/emCallKit/stores/channelManger';
import { ANSWER_TYPE, CALL_INVITE_TEXT } from '@/components/emCallKit/contants';
const { handleSendAnswerMsg } = useInitCallKit();
const agoraChannelStore = useAgoraChannelStore();
const channelInfos = computed(() => {
  return agoraChannelStore.callKitStatus.channelInfos ?? {};
});
//保持屏幕常亮
uni.setKeepScreenOn({
  keepScreenOn: true,
});
const agreeJoinChannel = () => {
  console.log('>>>>>接听通话');
  handleSendAnswerMsg(ANSWER_TYPE.ACCPET);
  uni.redirectTo({
    url: '/pages/emCallKitPages/singleCall',
  });
};
const refuseJoinChannel = () => {
  console.log('>>>>>拒绝接听');
  handleSendAnswerMsg(ANSWER_TYPE.REFUSE);
  uni.navigateBack({ delta: 1 });
};
</script>

<style>
.alert_screen_container {
  position: fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  background-image: url('@/static/emCallKit/loginBg.jpg');
  color: #fff;
  overflow: hidden;
}
.alert_header {
  position: fixed;
  margin-top: 300rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 250rpx;
  height: 250rpx;
}
.alert_footer {
  position: fixed;
  left: 0;
  bottom: 150rpx;
  width: 100%;
  height: 500rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.alert_btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.alert_btns_circle {
  width: 250rpx;
  height: 250rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.alert_btns_circle > image {
  width: 150rpx;
  height: 150rpx;
}
.alert_btns_circle > text {
  margin-top: 15rpx;
  font-size: 25rpx;
}
</style>
