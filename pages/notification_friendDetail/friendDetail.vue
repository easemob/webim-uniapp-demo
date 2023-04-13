<template>
  <view class="inform">
    <text class="defaultText" v-if="!friendDetailState.friendList.length > 0"
      >暂时没有新的通知</text
    >

    <view
      v-for="(item, from) in friendDetailState.friendList"
      :key="from"
      class="itemBar"
    >
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
        <view
          v-if="!item.typeText"
          :data-from="item.from"
          class="rejectBtn"
          @tap="reject"
          >拒绝</view
        >
        <view v-if="!item.typeText" class="centerLine"></view>
        <view
          v-if="!item.typeText"
          :data-from="item.from"
          class="agreeBtn"
          @tap="agree"
          >同意</view
        >
        <view v-if="item.typeText" class="actionDone">{{ item.typeText }}</view>
      </view>
    </view>
    <view class="black">
      <button type="primary" @click="into_chat">返回</button>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
// var WebIM = require('../../utils/WebIM')['default'];
// let disp = require('../../utils/broadcast'); // 好友邀请提醒
const friendDetailState = reactive({
  friendList: [],
  myName: '',
});

onLoad(() => {
  disp.on('em.subscribe', onFriendDetailPageSubscribe);
  friendDetailState.myName = uni.getStorageSync('myUsername');
  friendDetailState.friendList = uni.getStorageSync('friendNotiData');
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
});
const removeAndRefresh = (removeId) => {
  var idx;
  friendDetailState.friendList.forEach(function (v, k) {
    if (v.from === removeId) {
      idx = k;
    }
  });
  friendDetailState.friendList.splice(idx, 1);
  getApp().globalData.saveFriendList.splice(idx, 1); // if(!this.data.friendList.length){
};
const agree = (event) => {
  // 同意（无回调）
  WebIM.conn.acceptContactInvite(event.currentTarget.dataset.from);
  friendDetailState.friendList.forEach((item) => {
    if (item.from == event.currentTarget.dataset.from) {
      item.type = 'subscribed';
      item.typeText = '已同意';
      uni.setStorageSync('friendNotiData', friendDetailState.friendList); //getApp().globalData.saveFriendList = this.data.friendList;
      friendDetailState.friendList = friendDetailState.friendList;
    }
  });
  removeAndRefresh(event.currentTarget.dataset.from);
  getRoster();
};

const getRoster = () => {
  let rosters = {
    success(roster) {
      let member = [];
      for (let i = 0; i < roster.length; i++) {
        if (roster[i].subscription == 'both') {
          member.push(roster[i]);
        }
      }

      uni.setStorage({
        key: 'member',
        data: member,
      });
    },

    error(err) {
      console.log(err);
    },
  };
  WebIM.conn.getContacts(rosters);
};
const reject = (event) => {
  WebIM.conn.declineContactInvite(event.currentTarget.dataset.from);
  friendDetailState.friendList.forEach((item) => {
    if (item.from == event.currentTarget.dataset.from) {
      item.type = 'unsubscribed';
      item.typeText = '已拒绝';
      uni.setStorageSync('friendNotiData', friendDetailState.friendList); //getApp().globalData.saveFriendList = this.data.friendList;

      friendDetailState.friendList = friendDetailState.friendList;
    }
  });
  removeAndRefresh(event.currentTarget.dataset.from);
};
const into_chat = () => {
  uni.redirectTo({
    url: '../conversation/conversation',
  });
};

const onFriendDetailPageSubscribe = () => {
  friendDetailState.friendList = getApp().globalData.saveFriendList;
  uni.setStorageSync('friendNotiData', getApp().globalData.saveFriendList);
};
onUnload(() => {
  disp.off('em.subscribe', onFriendDetailPageSubscribe);
});
</script>
<style>
@import './friendDetail.css';
</style>
