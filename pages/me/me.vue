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
  </view>
</template>

<script setup>
import { reactive, computed, watchEffect } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { useLoginStore } from '@/stores/login';
import { useConversationStore } from '@/stores/conversation';
import { useInformStore } from '@/stores/inform';
import { useMessageStore } from '@/stores/message';
import { EMClient } from '@/EaseIM';
import { emConnect } from '@/EaseIM/imApis';
const settingState = reactive({
  yourname: '',
  isIPX: false,
  phoneNumber: '',
  defaultAvatar: '/static/images/theme2x.png',
  userInfoFromServer: {},
});
const loginStore = useLoginStore();
const loginUserAvactar = computed(() => {
  if (settingState.userInfoFromServer?.avatarurl) {
    return settingState.userInfoFromServer.avatarurl;
  } else {
    return settingState.defaultAvatar;
  }
});
const loginUserNickname = computed(() => {
  if (settingState.userInfoFromServer?.nickname) {
    return `${settingState.userInfoFromServer?.nickname}(${loginStore.loginUserBaseInfos.loginUserId})`;
  } else {
    return loginStore.loginUserBaseInfos.loginUserId;
  }
});

watchEffect(() => {
  settingState.userInfoFromServer = Object.assign(
    settingState.userInfoFromServer,
    loginStore.loginUserProfiles
  );
});
//跳转至系统设置
const goGeneralSetting = () => {
  uni.navigateTo({
    url: '../settingGeneral/settingGeneral',
  });
};
/* 退出操作 */
//初始化pinia
const informStore = useInformStore();
const conversationStore = useConversationStore();
const messageStore = useMessageStore();
const initPinia = async () => {
  loginStore.$reset();
  informStore.$reset();
  conversationStore.$reset();
  messageStore.$reset();
};
//退出登录
const { closeEaseIM } = emConnect();
const logout = () => {
  uni.showModal({
    title: '是否退出登录',
    success: function (res) {
      if (res.confirm) {
        uni.setStorageSync('INFORM', []);
        closeEaseIM();
        setTimeout(() => {
          initPinia();
          uni.redirectTo({
            url: '../login/login',
          });
        });
      }
    },
  });
};

const to_profile_page = () => {
  uni.navigateTo({
    url: '../profile/profile',
  });
};
onLoad(() => {
  settingState.yourname = loginStore.loginUserBaseInfos.loginUserId;
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  settingState.phoneNumber = loginStore.loginUserBaseInfos.phoneNumber;
});
</script>
<style>
@import './me.css';
</style>
