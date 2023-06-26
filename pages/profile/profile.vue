<template>
  <!-- 他人个人信息 -->
  <view v-if="profileState.otherProfile">
    <view class="head_pic">
      <text>头像</text>
      <image
        :src="
          profileState.otherProfile.avatarurl ||
          profileState.otherProfile.avatar ||
          profileState.defaultAvatar
        "
      ></image>
    </view>
    <view class="head_pic">
      <text>id</text>
      <text>{{ profileState.otherProfile.uid || '' }}</text>
    </view>
    <view class="head_pic">
      <text>昵称</text>
      <text>{{ profileState.otherProfile.nickname || '暂无昵称' }}</text>
    </view>
  </view>
  <!-- 个人用户信息 -->
  <view v-else>
    <view class="head_pic" @click="to_select_avatar">
      <text>头像</text>
      <image :src="loginUserAvactar"></image>
    </view>
    <view class="head_pic" @click="showChangeNickNameModal">
      <text>昵称</text>
      <text>{{ profileForm.nickname || '' }}</text>
    </view>
    <uni-popup ref="changeNicknameModal" type="dialog">
      <uni-popup-dialog
        title="更改昵称"
        @confirm="saveNickname"
        @close="hideChangeNickNameModal"
      >
        <input
          class="uni-input"
          :maxlength="15"
          v-model="profileForm.nickname"
          focus
          placeholder="请输入您的昵称"
        />
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>
<script setup>
import { reactive, ref, computed, watchEffect } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
/* im api */
import { emUserInfos } from '@/EaseIM/imApis';
/* stores */
import { useLoginStore } from '@/stores/login';
const profileState = reactive({
  isShowEditModal: false,
  nickname: '',
  loginUserInfos: null,
  defaultAvatar: '/static/images/theme2x.png',
  otherProfile: null,
});
let profileForm = reactive({
  nickname: '',
  avatarurl: '',
  mail: '',
  phone: '',
  gender: '',
  birth: '',
  sign: '',
});
const loginStore = useLoginStore();
onLoad((options) => {
  if (options.otherProfile) {
    uni.setNavigationBarTitle({
      title: '个人名片',
    });
    profileState.otherProfile = JSON.parse(options.otherProfile);
  } else {
    profileState.loginUserInfos = loginStore.loginUserProfiles;
  }
});
/* login profile */
watchEffect(() => {
  profileForm = Object.assign(profileForm, loginStore.loginUserProfiles);
});
const loginUserAvactar = computed(() => {
  return profileState.loginUserInfos?.avatarurl || profileState.defaultAvatar;
});
//跳转至头像选择页面
const to_select_avatar = () => {
  uni.navigateTo({
    url: '../profile/selectAvatar',
  });
};
const changeNicknameModal = ref(null);
const showChangeNickNameModal = () => {
  changeNicknameModal.value.open();
};
const hideChangeNickNameModal = () => {
  changeNicknameModal.value.close();
};
//保存更改的用户昵称
const { updateUserInfosFromServer } = emUserInfos();
const saveNickname = async () => {
  if (!profileForm.nickname) return;
  try {
    let res = await updateUserInfosFromServer({
      nickname: profileForm.nickname,
    });
    loginStore.setLoginUserProfiles({ ...res });
    console.log('>>>>>昵称更新', res);
    uni.showToast({ title: '昵称更新成功', icon: 'none' });
  } catch (error) {
    console.log('>>>>>保存失败', error);
    uni.showToast({
      title: '保存失败',
      icon: 'none',
      duration: 2000,
    });
  }
};
</script>
<style>
@import './profile.css';
</style>
