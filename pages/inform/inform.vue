<template>
<view class="inform">
	<text class="defaultText" v-if="!friendList.length > 0">暂时没有新的通知</text>
	<view v-for="(item, index) in friendList" :key="index" class="itemBar">
		<text class="itemName">{{ item.from }}请求添加你为好友</text>
		<button :data-from="item.from" class="rejectBtn" type="warn" size="mini" @tap="reject">拒绝</button>
		<button :data-from="item.from" class="agreeBtn" type="primary" size="mini" @tap="agree">同意</button>
	</view>
</view>
</template>

<script>
var WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast"); // 好友邀请提醒

export default {
  data() {
    return {
      friendList: [],
      myName: ""
    };
  },

  components: {},
  props: {},

  onLoad(options) {
    var me = this; // 不需要 object 地址更新，就能刷

    disp.on("em.subscribe", function () {
      me.setData({
        friendList: getApp().globalData.saveFriendList
      });
    });
    this.setData({
      myName: options.myName,
      // 哈？global？好吧
      friendList: getApp().globalData.saveFriendList
    });
  },

  methods: {
    removeAndRefresh(removeId) {
      var idx;
      this.friendList.forEach(function (v, k) {
        if (v.from === removeId) {
          idx = k;
        }
      });
      this.friendList.splice(idx, 1);
      getApp().globalData.saveFriendList.splice(idx, 1);

      if (!this.friendList.length) {
        wx.navigateBack({
          url: "../main/main?myName=" + this.myName
        });
      } else {
        this.setData({
          friendList: this.friendList
        });
      }
    },

    agree(event) {
      var me = this; // 同意（无回调）

      WebIM.conn.subscribed({
        to: event.currentTarget.dataset.from,
        message: "[resp:true]"
      }); // 需要反向添加对方好友（无回调）

      WebIM.conn.subscribe({
        to: event.currentTarget.dataset.from,
        message: "[resp:true]"
      }); // wx.showToast({
      // 	title: "OK",
      // 	duration: 1000
      // });

      setTimeout(function () {
        me.removeAndRefresh(event.currentTarget.dataset.from);
      }, 1000);
    },

    reject(event) {
      var me = this; // 无回调

      WebIM.conn.unsubscribed({
        to: event.currentTarget.dataset.from,
        message: "rejectAddFriend"
      });
      wx.showToast({
        title: "已拒绝",
        duration: 1000
      });
      setTimeout(function () {
        me.removeAndRefresh(event.currentTarget.dataset.from);
      }, 1000);
    }

  }
};
</script>
<style>
@import "./inform.css";
</style>