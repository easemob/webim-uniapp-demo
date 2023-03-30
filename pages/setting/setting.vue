<template>
<view>

<view class="setting_head">
	<view class="head_pic" @click="to_profile_page">
		<image :src="loginUserAvactar"></image>
		<view>
			<text class="setting_username">{{ loginUserNickname }}</text>
			<text class="setting_username2">{{phoneNumber}}</text>
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
	<view class="setting_listContent">
		<text>意见反馈（yunying@easemob.com）</text>
	</view>
</view>

<!-- 小程序意见反馈 -->
<!-- <view class="setting_list">
	<view class="setting_listContent">
		<button class="feedback" open-type="feedback">意见反馈</button>
	</view>
</view> -->

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
      isIPX: false,
	  phoneNumber: '',
      defaultAvatar: "/static/images/avatar.png",
      userInfoFromServer:null
    };
  },

  components: {},
  props: {},
  onLoad: function (option) {
    this.setData({
      yourname: uni.getStorageSync("myUsername")
    }); 
    //监听加好友申请
    disp.on("em.subscribe", this.onSettingPageSubscribe);
    //监听未读“聊天”
    disp.on("em.unreadspot", this.onSettingPageUnreadspot); 
    //监听加入群组事件
    disp.on("em.invite.joingroup", this.onSettingPageJoingroup);
	this.setData({
		phoneNumber: getApp().globalData.phoneNumber
	})
	this.setData({
		userInfoFromServer:getApp().globalData.userInfoFromServer
	})
  },
  onShow() {
    uni.hideHomeButton()
    this.setData({
      messageNum: getApp().globalData.saveFriendList.length,
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length,
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
  },
  onUnload(){
    disp.off('em.subscribe',this.onSettingPageSubscribe)
    disp.off('em.unreadspot',this.onSettingPageUnreadspot)
    disp.off('em.invite.joingroup',this.onSettingPageJoingroup)
  },
  computed: {
    loginUserAvactar(){
		if(this.userInfoFromServer){
		   return this.userInfoFromServer.avatarurl;
		}else{
			return this.defaultAvatar
		}
       
    },
    loginUserNickname(){
		if(this.userInfoFromServer){
			return `${this.userInfoFromServer?.nickname}(${this.yourname})`
		}else{
			return this.yourname
		}
       
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
        url: "../conversation/conversation"
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
    },
    onSettingPageSubscribe() {
      this.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    },
    onSettingPageUnreadspot() {
        this.setData({
            unReadSpotNum: getApp().globalData.unReadMessageNum
      });
    },
    onSettingPageJoingroup() {
        this.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    },
    to_profile_page() {
        uni.navigateTo({
            url: "../profile/profile"
        });
    }
  }
};
</script>
<style>
@import "./setting.css";
</style>