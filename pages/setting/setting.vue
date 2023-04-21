<template>
  <view>
    <view class="setting_head">
      <view class="head_pic" @click="to_profile_page">
        <image :src="loginUserAvactar"></image>
        <view>
          <text class="setting_username">{{ loginUserNickname }}</text>
          <text class="setting_username2">{{ settingState.phoneNumber }}</text>
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

    <view :class="settingState.isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar" @tap="tab_chat">
        <view
          v-if="
            settingState.unReadSpotNum > 0 ||
            settingState.unReadSpotNum == '99+'
          "
          :class="
            'em-unread-spot ' +
            (settingState.unReadSpotNum == '99+'
              ? 'em-unread-spot-litleFont'
              : '')
          "
          >{{
            settingState.unReadSpotNum + settingState.unReadTotalNotNum
          }}</view
        >
        <image
          :class="
            settingState.unReadSpotNum > 0 ||
            settingState.unReadSpotNum == '99+'
              ? 'haveSpot'
              : ''
          "
          src="/static/images/session2x.png"
        ></image>
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

<script setup>
import { reactive, computed } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
const settingState = reactive({
  yourname: '',
  messageNum: 0,
  unReadSpotNum: 0,
  unReadNoticeNum: 0,
  unReadTotalNotNum: 0,
  isIPX: false,
  phoneNumber: '',
  defaultAvatar: '/static/images/theme2x.png',
  userInfoFromServer: null,
});
const loginUserAvactar = computed(() => {
  if (settingState.userInfoFromServer?.avatarurl) {
    return settingState.userInfoFromServer.avatarurl;
  } else {
    return settingState.defaultAvatar;
  }
});
const loginUserNickname = computed(() => {
  if (settingState.userInfoFromServer?.nickname) {
    return `${settingState.userInfoFromServer?.nickname}(${settingState.yourname})`;
  } else {
    return settingState.yourname;
  }
});
const tab_contact = () => {
  uni.redirectTo({
    url: '../main/main?myName=' + uni.getStorageSync('myUsername'),
  });
};

const tab_chat = () => {
  uni.redirectTo({
    url: '../conversation/conversation',
  });
};
const tab_notification = () => {
  uni.redirectTo({
    url: '../notification/notification',
  });
};
const goGeneralSetting = () => {
  uni.navigateTo({
    url: '../setting_general/setting_general',
  });
};
const logout = () => {
  uni.showModal({
    title: '是否退出登录',
    success: function (res) {
      if (res.confirm) {
        uni.setStorageSync('INFORM', []);
        WebIM.conn.close(); // uni.closeSocket()
        uni.redirectTo({
          url: '../login/login',
        });
      }
    },
  });
};
const onSettingPageSubscribe = () => {
  settingState.messageNum = getApp().globalData.saveFriendList.length;
  settingState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const onSettingPageUnreadspot = () => {
  settingState.unReadSpotNum = getApp().globalData.unReadMessageNum;
};
const onSettingPageJoingroup = () => {
  settingState.unReadNoticeNum =
    getApp().globalData.saveGroupInvitedList.length;
  settingState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const to_profile_page = () => {
  uni.navigateTo({
    url: '../profile/profile',
  });
};
onLoad(() => {
  settingState.yourname = uni.getStorageSync('myUsername');
  //监听加好友申请
  disp.on('em.subscribe', onSettingPageSubscribe);
  //监听未读“聊天”
  disp.on('em.unreadspot', onSettingPageUnreadspot);
  //监听加入群组事件
  disp.on('em.invite.joingroup', onSettingPageJoingroup);
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  settingState.phoneNumber = uni.getStorageSync('phoneNumber');
  settingState.userInfoFromServer = getApp().globalData.userInfoFromServer;
  settingState.messageNum = getApp().globalData.saveFriendList.length;
  settingState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
  settingState.unReadNoticeNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
  if (getApp().globalData.isIPX) {
    settingState.isIPX = true;
  }
});
onUnload(() => {
  disp.off('em.subscribe', onSettingPageSubscribe);
  disp.off('em.unreadspot', onSettingPageUnreadspot);
  disp.off('em.invite.joingroup', onSettingPageJoingroup);
});
</script>
<style>
@import './setting.css';
</style>
