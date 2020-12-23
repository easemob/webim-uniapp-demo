<template>
<view>
<view class="setting_title">
	<text>设置</text>
</view>

<view class="setting_head">
	<view class="head_pic">
		<image src="/static/images/theme2x.png"></image>
		<view>
			<text class="setting_username">{{ yourname }}</text>
			<text class="setting_username2">username</text>
		</view>
	</view>
</view>

<view class="setting_list">
	<view class="setting_listContent" @tap="goGeneralSetting">
		<text>通用设置</text>
		<image class="list_right" src="/static/images/next.png"></image>
	</view>
</view>

<view class="setting_list">
	<view class="setting_listContent" @tap="logout">
		<text class="setting_redtext">退出登录</text>
	</view>
</view>

<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'">
	<view class="tableBar" @tap="tab_chat">
		<view v-if="unReadSpotNum > 0 || unReadSpotNum == '99+'" :class="'em-unread-spot ' + (unReadSpotNum == '99+'?'em-unread-spot-litleFont':'')">{{ unReadSpotNum +  unReadTotalNotNum }}</view>
		<image :class="unReadSpotNum > 0 || unReadSpotNum == '99+'? 'haveSpot': ''" src="/static/images/session2x.png"></image>
		<text>消息</text>
	</view>

	<view class="tableBar" @tap="tab_contact">
		<image src="/static/images/comtacts2x.png"></image>
		<text>联系人</text>
	</view>

	<!-- <view class="tableBar" @tap="tab_notification">
		<view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{ unReadTotalNotNum }}</view>
		<image :class="unReadTotalNotNum > 0 ? 'haveSpot': ''" src="/static/images/notice.png"></image>
		<text>通知</text>
	</view> -->
	
	<view class="tableBar">
		<image src="/static/images/settinghighlight2x.png"></image>
		<text class="activeText">我的</text>
	</view>
</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");

export default {
  data() {
    return {
      yourname: "",
      messageNum: 0,
      unReadSpotNum: 0,
      unReadNoticeNum: 0,
      unReadTotalNotNum: 0,
      isIPX: false
    };
  },

  components: {},
  props: {},
  onLoad: function (option) {
    let me = this;
    this.setData({
      yourname: uni.getStorageSync("myUsername")
    }); //监听加好友申请

    disp.on("em.subscribe", function () {
      me.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    }); //监听未读“聊天”

    disp.on("em.unreadspot", function () {
      me.setData({
        unReadSpotNum: getApp().globalData.unReadMessageNum
      });
    }); //监听未读“通知”数

    disp.on("em.invite.joingroup", function (count) {
      me.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    });
  },

  onShow() {
    uni.hideHomeButton()
    this.setData({
      messageNum: getApp().globalData.saveFriendList.length,
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
  },

  methods: {
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
    tab_notification: function () {
      uni.redirectTo({
        url: "../notification/notification"
      });
    },
    goGeneralSetting: function () {
      uni.navigateTo({
        url: "../setting_general/setting_general"
      });
    },
    logout: function () {
      uni.showModal({
        title: "是否退出登录",
        success: function (res) {
          if (res.confirm) {
            uni.setStorageSync("INFORM",[])
            WebIM.conn.close(); // uni.closeSocket()
            uni.redirectTo({
              url: "../login/login"
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./setting.css";
</style>