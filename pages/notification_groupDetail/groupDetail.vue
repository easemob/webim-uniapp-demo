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
      <button type="primary" @click="into_chat">返回</button>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
let groupList = ref([]);

onLoad(() => {
  disp.on('em.invite.joingroup', onGroupDetailJoinGroup);
  groupList.value = uni.getStorageSync('groupNotiData');
  //     this.setData({
  //       groupList: , //getApp().globalData.saveGroupInvitedList
  //     });
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  listGroups();
});
const removeAndRefresh = (removeId) => {
  console.log('removeId>>', removeId);
  var idx;
  groupList.value.forEach(function (v, k) {
    console.log('v>>', v);
    if (v.gid === removeId) {
      idx = k;
    }
  });
  console.log('idx>>', idx);
  groupList.value.splice(idx, 1);
  getApp().globalData.saveGroupInvitedList.splice(idx, 1);
};
const listGroups = () => {
  return WebIM.conn.getGroup({
    success: function (res) {
      uni.setStorage({
        key: 'listGroup',
        data: res.data,
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
};
const agree = (event) => {
  // 同意（无回调）
  WebIM.conn.agreeInviteIntoGroup({
    invitee: WebIM.conn.context.userId,
    groupId: event.currentTarget.dataset.from,
    success: () => {
      uni.showToast({
        title: '加入成功',
        duration: 1000,
      });
    },
  });
  groupList.value.forEach((item) => {
    if (item.gid == event.currentTarget.dataset.from) {
      uni.setStorageSync('groupNotiData', groupList.value);
      item.typeText = '已同意';
    }
  });
  removeAndRefresh(event.currentTarget.dataset.from);
  setTimeout(() => {
    listGroups();
  }, 500);
};
const reject = (event) => {
  WebIM.conn.rejectInviteIntoGroup({
    invitee: WebIM.conn.context.userId,
    groupId: event.currentTarget.dataset.from,
    success: () => {
      uni.showToast({
        title: '已拒绝',
        duration: 1000,
      });
    },
  });
  groupList.value.forEach((item) => {
    if (item.gid == event.currentTarget.dataset.from) {
      console.log('>>>>>>处理本地状态为已拒绝');
      item.typeText = '已拒绝';
      uni.setStorageSync('groupNotiData', groupList.value); //getApp().globalData.savegroupList = this.data.groupList;
    }
  });
  removeAndRefresh(event.currentTarget.dataset.from);
};

const into_chat = () => {
  uni.redirectTo({
    url: '../conversation/conversation',
  });
};
onUnload(() => {
  disp.off('em.invite.joingroup', onGroupDetailJoinGroup);
});
const onGroupDetailJoinGroup = () => {
  groupList = getApp().globalData.saveGroupInvitedList;
  uni.setStorageSync('groupNotiData', getApp().globalData.saveGroupInvitedList);
};
// export default {
//   data() {
//     return {
//
//     };
//   },

//   components: {},
//   props: {},

//   onLoad(options) {

//   },

//   onShow() {
//     // getApp().globalData.saveGroupInvitedList = [];

//   },
//   onUnload() {

//   },
//   methods: {

//   },
// };
</script>
<style>
@import './groupDetail.css';
</style>
