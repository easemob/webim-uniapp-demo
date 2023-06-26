<template>
  <view>
    <view class="notification_title">
      <text>通知</text>
    </view>
    <view class="address_bottom" @tap="into_friendNot">
      <image src="/static/images/notification.png"></image>
      <text>好友通知</text>
      <text v-if="unReadContactsNoticeNum > 0" class="notification_dot">{{
        unReadContactsNoticeNum
      }}</text>
    </view>
    <view class="address_bottom" @tap="into_groupNot">
      <image src="/static/images/jiaqun2x.png"></image>
      <text>群组通知</text>
      <text v-if="unReadGroupsNoticeNum > 0" class="notification_dot">{{
        unReadGroupsNoticeNum
      }}</text>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
/* stores */
import { useInformStore } from '@/stores/inform';
const notificationState = reactive({
  messageNum: 0,
  unReadSpotNum: 0,
  groupInviteNum: 0,
  unReadTotalNotNum: 0,
  isIPX: false,
});
//好友未读系统通知数
const informStore = useInformStore();
const unReadContactsNoticeNum = computed(() => {
  return informStore.informData.contactsInform.filter(
    (inform) => !inform.isHandled
  ).length;
});
//群组未读系统通知数
const unReadGroupsNoticeNum = computed(() => {
  return informStore.informData.groupsInform.filter(
    (inform) => !inform.isHandled
  ).length;
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
});
const into_friendNot = () => {
  uni.navigateTo({
    url: '../notificationFriendDetail/friendDetail',
  });
};
const into_groupNot = () => {
  uni.navigateTo({
    url: '../notificationGroupDetail/groupDetail',
  });
};
</script>
<style>
@import './notification.css';
</style>
