<template>
  <view>
    <view class="setting_head">
      <view class="head_pic" @click="entryProfilePage">
        <image :src="loginUserAvactar"></image>
        <view>
          <text class="setting_username">{{ loginUserNickname }}</text>
          <text class="setting_username2">{{ phoneNumber }}</text>
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
    <view class="setting_list">
      <view class="setting_listContent" @tap="logoutEM">
        <text class="setting_redtext">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import { emConnect } from '@/EaseIM/emApis';
const { closeEaseIM } = emConnect();
export default {
  data() {
    return {
      yourname: '',
      isIPX: false,
      phoneNumber: '',
      defaultAvatar: '/static/images/avatar.png',
      userInfoFromServer: null,
    };
  },

  components: {},
  props: {},
  mounted(option) {
    const { loginUserBaseInfos, loginUserProfiles } =
      this.$store.state.LoginStore;
    this.yourname = loginUserBaseInfos?.loginUserId;
    this.phoneNumber = loginUserBaseInfos?.phoneNumber;
    this.userInfoFromServer = loginUserProfiles;
  },
  onShow() {
    uni.hideHomeButton && uni.hideHomeButton();
  },
  computed: {
    loginUserAvactar() {
      if (this.userInfoFromServer) {
        return this.userInfoFromServer.avatarurl;
      } else {
        return this.defaultAvatar;
      }
    },
    loginUserNickname() {
      if (this.userInfoFromServer) {
        return `${this.userInfoFromServer?.nickname}(${this.yourname})`;
      } else {
        return this.yourname;
      }
    },
  },
  methods: {
    //跳转至通用设置
    goGeneralSetting: function () {
      uni.navigateTo({
        url: '../settingGeneral/settingGeneral',
      });
    },
    //退出登录
    logoutEM: function () {
      uni.showModal({
        title: '是否退出登录',
        success: function (res) {
          if (res.confirm) {
            uni.setStorageSync('INFORM', []);
            closeEaseIM();
            uni.redirectTo({
              url: '../login/login',
            });
            //TODO 待处理store中的状态，需要初始化。
          }
        },
      });
    },
    //跳转至用户信息页面
    entryProfilePage() {
      uni.navigateTo({
        url: '../profile/profile',
      });
    },
  },
};
</script>
<style>
@import './mine.css';
</style>
