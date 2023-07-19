<template>
  <view>
    <div class="alert_header">
      <view class="name">{{ channelInfos.callerIMName || '未知呼叫' }}</view>
    </div>
    <div class="alert_footer">
      <text>{{
        CALL_INVITE_TEXT[channelInfos.callType] || '未知类型呼叫'
      }}</text>
      <view class="alert_btns">
        <button @click="agreeJoinChannel">接听</button>
        <button @click="refuseJoinChannel">拒接</button>
      </view>
    </div>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useInitCallKit } from '@/components/emCallKit';
import useManageChannle from '@/components/emCallKit/callKitManage/useManageChannel';
import { ANSWER_TYPE, CALL_INVITE_TEXT } from '@/components/emCallKit/contants';
const { handleSendAnswerMsg } = useInitCallKit();
const { callKitStatus } = useManageChannle();
const channelInfos = computed(() => {
  return callKitStatus.channelInfos ?? {};
});
const agreeJoinChannel = () => {
  console.log('>>>>>接听通话');
  handleSendAnswerMsg(ANSWER_TYPE.ACCPET);
};
const refuseJoinChannel = () => {
  console.log('>>>>>拒绝接听');
  handleSendAnswerMsg(ANSWER_TYPE.REFUSE);
};
</script>

<style></style>
