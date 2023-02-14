<template>
  <view class="inform">
    <text class="defaultText" v-if="!groupList.length > 0"
      >暂时没有新的通知</text
    >

    <view v-for="(item, from) in groupList" :key="from" class="itemBar">
      <view class="notInfoDetContent">
        <view class="headContent">
          <image src="/static/images/theme2x.png"></image>
        </view>
        <view class="infoContent">
          <text class="itemName">{{ item.from }}</text>
          <text>邀请您加入群组ID为{{ item.gid }}</text>
        </view>
      </view>

      <view class="buttonContent">
        <view
          v-if="!item.typeText"
          :data-from="item.gid"
          class="rejectBtn"
          @tap="reject"
          >拒绝</view
        >
        <view v-if="!item.typeText" class="centerLine"></view>
        <view
          v-if="!item.typeText"
          :data-from="item.gid"
          class="agreeBtn"
          @tap="agree"
          >同意</view
        >
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
      groupList: [],
    };
  },

  components: {},
  props: {},

  onLoad(options) {
    disp.on("em.invite.joingroup", this.onGroupDetailJoinGroup);
    this.setData({
      groupList: uni.getStorageSync("groupNotiData"), //getApp().globalData.saveGroupInvitedList
    });
  },

  onShow() {
    // getApp().globalData.saveGroupInvitedList = [];
    uni.hideHomeButton()
    this.listGroups();
  },
  onUnload(){
    disp.off('em.invite.joingroup',this.onGroupDetailJoinGroup)
  },
  methods: {
    removeAndRefresh(removeId) {
      console.log("removeId>>", removeId);
      var idx;
      this.groupList.forEach(function (v, k) {
        console.log("v>>", v);
        if (v.gid === removeId) {
          idx = k;
        }
      });
      console.log("idx>>", idx);
      this.groupList.splice(idx, 1);
      getApp().globalData.saveGroupInvitedList.splice(idx, 1);
    },

    listGroups() {
      var me = this;
      return WebIM.conn.getGroup({
        success: function (res) {
          uni.setStorage({
            key: "listGroup",
            data: res.data,
          });
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
    agree(event) {
      console.log("event", event, "groupList>>", this.groupList);
      var me = this;
      // 同意（无回调）
      WebIM.conn.agreeInviteIntoGroup({
        invitee: WebIM.conn.context.userId,
        groupId: event.currentTarget.dataset.from,
        success: () => {
          uni.showToast({
            title: "加入成功",
            duration: 1000,
          });
        },
      });

      this.groupList.forEach((item) => {
        if (item.gid == event.currentTarget.dataset.from) {
          uni.setStorageSync("groupNotiData", this.groupList);
          item.typeText = "已同意";
          this.setData({
            groupList: this.groupList,
          });
        }
      });
      this.removeAndRefresh(event.currentTarget.dataset.from);
      setTimeout(() => {
        this.listGroups();
      },500)
    },
    reject(event) {
      var me = this; // 无回调
      WebIM.conn.rejectInviteIntoGroup({
        invitee: WebIM.conn.context.userId,
        groupId: event.currentTarget.dataset.from,
        success: () => {
          uni.showToast({
            title: "已拒绝",
            duration: 1000,
          });
        },
      });

      this.groupList.forEach((item) => {
        if (item.gid == event.currentTarget.dataset.from) {
          item.typeText = "已拒绝";
          uni.setStorageSync("groupNotiData", this.groupList); //getApp().globalData.savegroupList = this.data.groupList;

          this.setData({
            groupList: this.groupList,
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

    onGroupDetailJoinGroup () {
      this.setData({
        groupList: getApp().globalData.saveGroupInvitedList,
      });
      uni.setStorageSync(
        "groupNotiData",
        getApp().globalData.saveGroupInvitedList
      );
    }
  },
};
</script>
<style>
@import "./groupDetail.css";
</style>