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

<script>
export default {
  data() {
    return {};
  },
  computed: {
    //好友未读系统通知数
    unReadContactsNoticeNum() {
      return this.$store.state.InformStore.informData.contactsInform.filter(
        (inform) => !inform.isHandled
      ).length;
    },
    //群组未读系统通知数
    unReadGroupsNoticeNum() {
      return this.$store.state.InformStore.informData.groupsInform.filter(
        (inform) => !inform.isHandled
      ).length;
    },
  },
  onShow() {
    uni.hideHomeButton && uni.hideHomeButton();
  },
  methods: {
    into_friendNot: function () {
      uni.navigateTo({
        url: '../notificationFriendDetail/friendDetail',
      });
    },
    into_groupNot: function () {
      uni.navigateTo({
        url: '../notificationGroupDetail/groupDetail',
      });
    },
  },
};
</script>
<style>
@import './notification.css';
</style>
