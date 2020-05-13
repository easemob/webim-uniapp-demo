<template>
<view class="inform">

	<text class="defaultText" v-if="!groupList.length > 0">暂时没有新的通知</text>

	<view v-for="(item, from) in groupList" :key="from" class="itemBar">

		<view class="notInfoDetContent">
			<view class="headContent">
				<image src="/static/images/theme@2x.png"></image>
			</view>
			<view class="infoContent">
				<text class="itemName">{{ item.from }}</text>
				<text>邀请您加入群组为{{item.roomid}}</text>
			</view>
		</view>
		
		<view class="buttonContent">
			<!-- <view wx:if="{{ !item.typeText}}" data-from="{{ item.from }}" class="rejectBtn" bindtap="reject">拒绝</view>
			<view wx:if="{{ !item.typeText}}" class="centerLine"></view>
			<view wx:if="{{ !item.typeText}}" data-from="{{ item.from }}" class="agreeBtn" bindtap="agree">同意</view> -->
			<view class="actionDone">已同意</view>
		</view>

	</view>
</view>
</template>

<script>
var WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast"); // 好友邀请提醒

export default {
  data() {
    return {
      groupList: []
    };
  },

  components: {},
  props: {},

  onLoad(options) {
    var me = this; // 不需要 object 地址更新，就能刷

    disp.on("em.invite.joingroup", function () {
      me.setData({
        groupList: getApp().globalData.saveGroupInvitedList
      });
      wx.setStorageSync("groupNotiData", getApp().globalData.saveGroupInvitedList);
    });
    this.setData({
      groupList: wx.getStorageSync("groupNotiData") //getApp().globalData.saveGroupInvitedList 
      // [{
      // 	from: "zdtest2",
      // 	reason: "",
      // 	roomid: "75443436847105",
      // 	type: "invite"
      // },
      // {
      // 	from: "zdtest3",
      // 	reason: "",
      // 	roomid: "75443436847105",
      // 	type: "invite"
      // }
      // ]

    });
  },

  onShow() {
    getApp().globalData.saveGroupInvitedList = [];
    this.listGroups();
  },

  methods: {
    listGroups() {
      var me = this;
      return WebIM.conn.getGroup({
        success: function (rooms) {
          wx.setStorage({
            key: "listGroup",
            data: rooms
          });
        },
        error: function (err) {
          console.log(err);
        }
      });
    },

    removeAndRefresh(removeId) {}

  }
};
</script>
<style>
@import "./groupDetail.css";
</style>