<template>
  <view>
    <!-- 他人个人信息 -->
    <view v-if="otherProfile">
      <view class="head_pic">
        <text>头像</text>
        <image
          :src="otherProfile.avatarurl || otherProfile.avatar || defaultAvatar"
        ></image>
      </view>
      <view class="head_pic">
        <text>id</text>
        <text>{{ otherProfile.uid || '' }}</text>
      </view>
      <view class="head_pic">
        <text>昵称</text>
        <text>{{ otherProfile.nickname || '暂无昵称' }}</text>
      </view>
    </view>
    <view v-else>
      <!-- 个人用户信息 -->
      <view class="head_pic" @click="entrySelectAvatar">
        <text>头像</text>
        <image :src="loginUserAvactar"></image>
      </view>
      <view class="head_pic" @click="showEditModal">
        <text>昵称</text>
        <text>{{ profileForm.nickname || '暂无昵称' }}</text>
      </view>
      <u-modal
        v-model="isShowEditModal"
        title="更改昵称"
        async-close
        confirm-text="保存"
        cancel-text="取消"
        show-cancel-button
        @confirm="saveNickname"
      >
        <u-input
          input-align="center"
          v-model="nickname"
          type="text"
          maxlength="15"
        />
      </u-modal>
    </view>
  </view>
</template>
<script>
let disp = require('../../utils/broadcast');
export default {
  data() {
    return {
      isShowEditModal: false,
      nickname: '',
      profileForm: {
        nickname: '',
        avatarurl: '',
        mail: '',
        phone: '',
        gender: '',
        birth: '',
        sign: '',
      },
      otherProfile: null,
      loginUserInfos: null,
      defaultAvatar: '/static/images/theme2x.png',
    };
  },
  onLoad(option) {
    if (option.otherProfile) {
      uni.setNavigationBarTitle({
        title: '个人名片',
      });
      this.otherProfile = JSON.parse(option.otherProfile);
    } else {
      this.loginUserInfos = this.$store.state.LoginStore.loginUserProfiles;
    }
    const { loginUserProfiles } = this.$store.state.LoginStore;
    this.loginUserInfos = loginUserProfiles;
  },
  onShow() {
    const { loginUserProfiles } = this.$store.state.LoginStore;
    console.log('loginUserProfiles', loginUserProfiles);
    this.profileForm = Object.assign(this.profileForm, loginUserProfiles);
  },
  computed: {
    loginUserAvactar() {
      return this.loginUserInfos?.avatarurl || this.defaultAvatar;
    },
    //处理性别展示
    genderDisplay() {
      return (gender) => {
        if (gender === 1) {
          return '男';
        } else if (gender === 2) {
          return '女';
        } else {
          return '未知';
        }
      };
    },
  },
  methods: {
    entrySelectAvatar() {
      uni.navigateTo({
        url: '../profile/selectAvatar',
      });
    },
    showEditModal() {
      this.isShowEditModal = true;
      this.nickname = this.profileForm.nickname;
    },
    //保存更改的用户昵称
    async saveNickname(e) {
      if (!this.nickname) return;
      try {
        await uni.WebIM.conn.updateUserInfo('nickname', this.nickname);
        disp.fire('em.mian.profile.update');
        this.profileForm.nickname = this.nickname;
        this.isShowEditModal = false;
      } catch (error) {
        uni.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000,
        });
      }
    },
  },
};
</script>
<style>
@import './profile.css';
</style>
