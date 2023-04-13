<template>
  <view class="inform">
    <text class="defaultText" v-if="!friendList.length > 0"
      >暂时没有新的通知</text
    >
    <view v-for="(item, index) in friendList" :key="index" class="itemBar">
      <text class="itemName">{{ item.from }}请求添加你为好友</text>
      <button
        :data-from="item.from"
        class="rejectBtn"
        type="warn"
        size="mini"
        @tap="reject"
      >
        拒绝
      </button>
      <button
        :data-from="item.from"
        class="agreeBtn"
        type="primary"
        size="mini"
        @tap="agree"
      >
        同意
      </button>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed, nextTick } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
const informState = reactive({ friendList: [], myName: '' });

onLoad((options) => {
  disp.on('em.subscribe', onInformPageSubscribe);
  informState.myName = options.myName;
  informState.friendList = getApp().globalData.saveFriendList;
});

const removeAndRefresh = (removeId) => {
  var idx;
  informState.friendList.forEach(function (v, k) {
    if (v.from === removeId) {
      idx = k;
    }
  });
  informState.friendList.splice(idx, 1);
  getApp().globalData.saveFriendList.splice(idx, 1);

  if (!informState.friendList.length) {
    uni.navigateBack({
      url: '../main/main?myName=' + informState.myName,
    });
  } else {
    informState.friendList = informState.friendList;
  }
};
const agree = (event) => {
  // WebIM.conn.subscribed({
  //  to: event.currentTarget.dataset.from,
  //  message: "[resp:true]"
  // }); // 需要反向添加对方好友（无回调）

  WebIM.conn.addContact(event.currentTarget.dataset.from, '[resp:true]'); // uni.showToast({
  // 	title: "OK",
  // 	duration: 1000
  // });

  setTimeout(function () {
    removeAndRefresh(event.currentTarget.dataset.from);
  }, 1000);
};
const reject = (event) => {
  WebIM.conn.declineContactInvite({
    to: event.currentTarget.dataset.from,
    message: 'rejectAddFriend',
  });
  uni.showToast({
    title: '已拒绝',
    duration: 1000,
  });
  setTimeout(function () {
    removeAndRefresh(event.currentTarget.dataset.from);
  }, 1000);
};
const onInformPageSubscribe = () => {
  informState.friendList = getApp().globalData.saveFriendList;
};
onUnload(() => {
  disp.off('em.subscribe', onInformPageSubscribe);
});
</script>
<style>
@import './inform.css';
</style>
