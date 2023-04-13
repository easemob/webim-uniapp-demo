<template>
  <view>
    <view class="notification_title">
      <text>通知</text>
    </view>
    <view class="address_bottom" @tap="into_friendNot">
      <image src="/static/images/notification.png"></image>
      <text>加好友申请</text>
      <text v-if="notificationState.messageNum > 0" class="notification_dot">{{
        notificationState.messageNum
      }}</text>
    </view>
    <view class="address_bottom" @tap="into_groupNot">
      <image src="/static/images/jiaqun2x.png"></image>
      <text>加群组申请</text>
      <text
        v-if="notificationState.groupInviteNum > 0"
        class="notification_dot"
        >{{ notificationState.groupInviteNum }}</text
      >
    </view>

    <view :class="notificationState.isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar" @tap="tab_chat">
        <view
          v-if="notificationState.unReadSpotNum > 0"
          :class="
            'em-unread-spot ' +
            (notificationState.unReadSpotNum == '99+'
              ? 'em-unread-spot-litleFont'
              : '')
          "
          >{{
            notificationState.unReadSpotNum == '99+'
              ? notificationState.unReadSpotNum
              : notificationState.unReadSpotNum +
                notificationState.unReadTotalNotNum
          }}</view
        >
        <image
          :class="notificationState.unReadSpotNum > 0 ? 'haveSpot' : ''"
          src="/static/images/sessionhighlight2x.png"
        ></image>
        <text class="activeText">消息</text>
      </view>

      <view class="tableBar" @tap="tab_contact">
        <image src="/static/images/comtacts2x.png"></image>
        <text>联系人</text>
      </view>

      <!-- <view class="tableBar">
		<view v-if="unReadTotalNotNum > 0 || unReadSpotNum == '99+'" class="em-unread-spot">{{ unReadTotalNotNum }}</view>
		<image :class="unReadTotalNotNum > 0 || unReadSpotNum == '99+'? 'haveSpot': ''" src="/static/images/noticeActive.png"></image>
		<text class="activeText">通知</text>
	</view> -->

      <view class="tableBar" @tap="tab_setting">
        <image src="/static/images/setting2x.png"></image>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const notificationState = reactive({
  messageNum: 0,
  unReadSpotNum: 0,
  groupInviteNum: 0,
  unReadTotalNotNum: 0,
  isIPX: false,
});
onLoad(() => {
  disp.on('em.subscribe', onNotifPageSubscribe); //监听未读消息数
  disp.on('em.unreadspot', onNotifPageUnreadspot); //监听加群通知数
  disp.on('em.invite.joingroup', onNotifPageJoingroup);
  uni.setStorageSync('friendNotiData', getApp().globalData.saveFriendList);
  uni.setStorageSync('groupNotiData', getApp().globalData.saveGroupInvitedList);
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  notificationState.messageNum = getApp().globalData.saveFriendList.length;
  notificationState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
  notificationState.groupInviteNum =
    getApp().globalData.saveGroupInvitedList.length;
  notificationState.unReadMessageNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;

  if (getApp().globalData.isIPX) {
    notificationState.isIPX = true;
  }
});
const into_friendNot = () => {
  uni.redirectTo({
    url:
      '../notification_friendDetail/friendDetail?myName=' +
      uni.getStorageSync('myUsername'),
  });
};
const into_groupNot = () => {
  uni.redirectTo({
    url:
      '../notification_groupDetail/groupDetail?myName=' +
      uni.getStorageSync('myUsername'),
  });
};
const tab_contact = () => {
  uni.redirectTo({
    url: '../main/main?myName=' + uni.getStorageSync('myUsername'),
  });
};
const tab_chat = () => {
  uni.redirectTo({
    url: '../conversation/conversation',
  });
};
const tab_setting = () => {
  uni.redirectTo({
    url: '../setting/setting',
  });
};
const onNotifPageSubscribe = () => {
  notificationState.messageNum = getApp().globalData.saveFriendList.length;
  notificationState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const onNotifPageUnreadspot = () => {
  notificationState.unReadSpotNum = getApp().globalData.unReadMessageNum;
};
const onNotifPageJoingroup = () => {
  notificationState.groupInviteNum =
    getApp().globalData.saveGroupInvitedList.length;
  notificationState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
onUnload(() => {
  disp.off('em.subscribe', onNotifPageSubscribe);
  disp.off('em.unreadspot', onNotifPageUnreadspot);
  disp.off('em.invite.joingroup', onNotifPageJoingroup);
});
</script>
<style>
@import './notification.css';
</style>
