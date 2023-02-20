<template>
<view>
<view class="notification_title">
	<text>通知</text>
</view>
<view class="address_bottom" @tap="into_friendNot">
	<image src="/static/images/notification.png"></image>
	<text>加好友申请</text>
	<text v-if="messageNum > 0" class="notification_dot">{{ messageNum }}</text>
</view>
<view class="address_bottom" @tap="into_groupNot">
	<image src="/static/images/jiaqun2x.png"></image>
	<text>加群组申请</text>
	<text v-if="groupInviteNum > 0" class="notification_dot">{{ groupInviteNum }}</text>
</view>

<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'">
	<view class="tableBar" @tap="tab_chat">
		<view v-if="unReadSpotNum > 0" :class="'em-unread-spot ' + (unReadSpotNum == '99+'?'em-unread-spot-litleFont':'')">{{ unReadSpotNum == '99+'?unReadSpotNum:unReadSpotNum+ unReadTotalNotNum }}</view>
		<image :class="unReadSpotNum > 0 ? 'haveSpot': ''" src="/static/images/sessionhighlight2x.png"></image>
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

<script>
let disp = require("../../utils/broadcast");

export default {
  data() {
    return {
      messageNum: 0,
      unReadSpotNum: 0,
      groupInviteNum: 0,
      unReadTotalNotNum: 0,
      isIPX: false
    };
  },

  components: {},
  props: {},

  mounted(){

  },
  onLoad(option) {
    disp.on("em.subscribe", this.onNotifPageSubscribe); //监听未读消息数
    disp.on("em.unreadspot", this.onNotifPageUnreadspot); //监听加群通知数
    disp.on("em.invite.joingroup", this.onNotifPageJoingroup);
    uni.setStorageSync("friendNotiData", getApp().globalData.saveFriendList);
    uni.setStorageSync("groupNotiData", getApp().globalData.saveGroupInvitedList);
  },

  onShow() {
    uni.hideHomeButton();
    this.setData({
      messageNum: getApp().globalData.saveFriendList.length,
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      groupInviteNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
  },
  onUnload(){
    disp.off("em.subscribe",this.onNotifPageSubscribe)
    disp.off("em.unreadspot",this.onNotifPageUnreadspot)
    disp.off("em.invite.joingroup",this.onNotifPageJoingroup)
  },
  methods: {
    into_friendNot: function () {
      uni.redirectTo({
        url: "../notification_friendDetail/friendDetail?myName=" + uni.getStorageSync("myUsername")
      });
    },
    into_groupNot: function () {
      uni.redirectTo({
        url: "../notification_groupDetail/groupDetail?myName=" + uni.getStorageSync("myUsername")
      });
    },
    tab_contact: function () {
      uni.redirectTo({
        url: "../main/main?myName=" + uni.getStorageSync("myUsername")
      });
    },
    tab_chat: function () {
      uni.redirectTo({
        url: "../conversation/conversation"
      });
    },
    tab_setting: function () {
      uni.redirectTo({
        url: "../setting/setting"
      });
    },
    onNotifPageSubscribe() {
      this.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    },
    onNotifPageUnreadspot() {
      this.setData({
        unReadSpotNum: getApp().globalData.unReadMessageNum
      });
    },
    onNotifPageJoingroup() {
      this.setData({
        groupInviteNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    }
  }
};
</script>
<style>
@import "./notification.css";
</style>