<template>
<view class="inform">

	<text class="defaultText" v-if="!friendList.length > 0">暂时没有新的通知</text>

	<view v-for="(item, from) in friendList" :key="from" class="itemBar">

		<view class="notInfoDetContent">
			<view class="headContent">
				<image src="/static/images/theme2x.png"></image>
			</view>
			<view class="infoContent">
				<text class="itemName">{{ item.from }}</text>
				<text>申请添加您为好友</text>
			</view>
		</view>
		
		<view class="buttonContent">
			<view v-if="!item.typeText" :data-from="item.from" class="rejectBtn" @tap="reject">拒绝</view>
			<view v-if="!item.typeText" class="centerLine"></view>
			<view v-if="!item.typeText" :data-from="item.from" class="agreeBtn" @tap="agree">同意</view>
			<view v-if="item.typeText" class="actionDone">{{ item.typeText }}</view>
		</view>

	</view>
  <view class="black">
      <u-button :ripple="true" @click="into_chat">返回</u-button>
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
    disp.on("em.subscribe", this.onFriendDetailPageSubscribe);
    this.setData({
      myName: uni.getStorageSync("myUsername"),
      friendList: uni.getStorageSync("friendNotiData") //getApp().globalData.saveFriendList 
      // [{
      // 	chatroom: false,
      // 	code: "",
      // 	from: "zdtest2",
      // 	fromJid: "easemob-demo#chatdemoui_zdtest2@easemob.com",
      // 	original_type: "subscribe",
      // 	presence_type: "",
      // 	status: "zdtest2请求添加好友",
      // 	to: "zdtest",
      // 	toJid: "easemob-demo#chatdemoui_zdtest@easemob.com/webim",
      // 	type: "subscribe"
      // },
      // {
      // 	chatroom: false,
      // 	code: "",
      // 	from: "zdtest3",
      // 	fromJid: "easemob-demo#chatdemoui_zdtest3@easemob.com",
      // 	original_type: "subscribe",
      // 	presence_type: "",
      // 	status: "zdtest3请求添加好友",
      // 	to: "zdtest",
      // 	toJid: "easemob-demo#chatdemoui_zdtest@easemob.com/webim",
      // 	type: "subscribe"
      // }
      // ]

    });
  },
  onShow(){
    uni.hideHomeButton()
  },
  onUnload(){
    disp.off("em.subscribe",this.onFriendDetailPageSubscribe)
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
      getApp().globalData.saveFriendList.splice(idx, 1); // if(!this.data.friendList.length){
      // 	uni.navigateBack({
      // 		url: "../main/main?myName=" + this.data.myName
      // 	});
      // }
      // else{
      // 	this.setData({
      // 		friendList: this.data.friendList
      // 	});
      // }
    },

    agree(event) {
      var me = this; 
      // 同意（无回调）
      WebIM.conn.acceptContactInvite(
        event.currentTarget.dataset.from,
      ); 
      this.friendList.forEach(item => {
        if (item.from == event.currentTarget.dataset.from) {
          item.type = 'subscribed';
          item.typeText = '已同意';
          uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;

          this.setData({
            friendList: this.friendList
          });
        }
      });
      this.removeAndRefresh(event.currentTarget.dataset.from);
      this.getRoster();
    },

    getRoster() {
      let me = this;
      let rosters = {
        success(roster) {
          var member = [];

          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }

          uni.setStorage({
            key: "member",
            data: member
          });
        },

        error(err) {
          console.log(err);
        }

      };
      WebIM.conn.getContacts(rosters);
    },

    reject(event) {
      var me = this; // 无回调

      WebIM.conn.declineContactInvite(
        event.currentTarget.dataset.from,
      );
      this.friendList.forEach(item => {
        if (item.from == event.currentTarget.dataset.from) {
          item.type = 'unsubscribed';
          item.typeText = '已拒绝';
          uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;

          this.setData({
            friendList: this.friendList
          });
        }
      });
      this.removeAndRefresh(event.currentTarget.dataset.from);
    },
    into_chat() {
      uni.redirectTo({
        url: "../conversation/conversation",
      });
    },
    onFriendDetailPageSubscribe () {
      this.setData({
        friendList: getApp().globalData.saveFriendList
      });
      uni.setStorageSync("friendNotiData", getApp().globalData.saveFriendList);
    }
  },
  
};
</script>
<style>
@import "./friendDetail.css";
</style>