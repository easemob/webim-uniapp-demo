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
	<image src="/static/images/jiaqun@2x.png"></image>
	<text>加群组申请</text>
	<text v-if="groupInviteNum > 0" class="notification_dot">{{ groupInviteNum }}</text>
</view>

<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'">
	<view class="tableBar" @tap="tab_chat">
		<view v-if="unReadSpotNum > 0" :class="'em-unread-spot ' + (unReadSpotNum == '99+'?'em-unread-spot-litleFont':'')">{{ unReadSpotNum }}</view>
		<image :class="unReadSpotNum > 0 ? 'haveSpot': ''" src="/static/images/session@2x.png"></image>
		<text>聊天</text>
	</view>

	<view class="tableBar" @tap="tab_contact">
		<image src="/static/images/comtacts@2x.png"></image>
		<text>联系人</text>
	</view>

	<view class="tableBar">
		<view v-if="unReadTotalNotNum > 0 || unReadSpotNum == '99+'" class="em-unread-spot">{{ unReadTotalNotNum }}</view>
		<image :class="unReadTotalNotNum > 0 || unReadSpotNum == '99+'? 'haveSpot': ''" src="/static/images/noticeActive.png"></image>
		<text class="activeText">通知</text>
	</view>
	
	<view class="tableBar" @tap="tab_setting">
		<image src="/static/images/setting@2x.png"></image>
		<text>设置</text>
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

  onLoad(option) {
    let me = this; //监听加好友申请

    disp.on("em.subscribe", function () {
      me.messageNum = getApp().globalData.saveFriendList.length
      me.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    }); //监听未读消息数

    disp.on("em.unreadspot", function () {
      me.unReadSpotNum = getApp().globalData.unReadMessageNum
    }); //监听加群通知数

    disp.on("em.invite.joingroup", function () {
      me.groupInviteNum = getApp().globalData.saveGroupInvitedList.length
      me.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    });
    uni.setStorageSync("friendNotiData", getApp().globalData.saveFriendList);
    uni.setStorageSync("groupNotiData", getApp().globalData.saveGroupInvitedList);
  },

  onShow() {
    this.messageNum = getApp().globalData.saveFriendList.length;
		this.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
		this.groupInviteNum = getApp().globalData.saveGroupInvitedList.length;
		this.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;

    if (getApp().globalData.isIPX) {
      this.isIPX = true
    }
  },

  methods: {
    into_friendNot: function () {
      uni.navigateTo({
        url: "../notification_friendDetail/friendDetail?myName=" + uni.getStorageSync("myUsername")
      });
    },
    into_groupNot: function () {
      uni.navigateTo({
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
        url: "../chat/chat"
      });
    },
    tab_setting: function () {
      uni.redirectTo({
        url: "../setting/setting"
      });
    }
  }
};
</script>
<style>
@import "./notification.css";
</style>