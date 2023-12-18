<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="个人信息"
      :autoBack="true"
    >
    </u-navbar>
    <u-cell-group :border="false">
      <u-cell title="头像">
        <u-avatar
          slot="value"
          size="40"
          shape="square"
          src="/static/images/new_ui/defaultAvatar.png"
        ></u-avatar>
      </u-cell>
      <u-cell
        title="昵称"
        isLink
        @click="entryEditMyProfile(PERSONAL_INFO_EDIT_TYPE.NICKNAME)"
      >
        <u--text
          slot="value"
          size="16"
          color="#75828A"
          :text="loginUserInfos.nickname || ''"
          align="right"
        ></u--text>
      </u-cell>
      <u-cell
        title="个性签名"
        isLink
        @click="entryEditMyProfile(PERSONAL_INFO_EDIT_TYPE.SIGN)"
      >
        <u--text
          slot="value"
          :lines="1"
          size="16"
          color="#75828A"
          :text="loginUserInfos.sign || ''"
          align="right"
        ></u--text>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import { PERSONAL_INFO_EDIT_TYPE } from '@/constant';
export default {
  data() {
    return {
      PERSONAL_INFO_EDIT_TYPE,
    };
  },
  computed: {
    loginUserInfos() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
  },
  methods: {
    entryEditMyProfile(editType) {
      //editType 编辑profile类型 1 昵称 2 个性签名
      uni.navigateTo({
        url: `../mine/editMyProfile?editProfileType=${editType}`,
      });
    },
  },
};
</script>

<style scoped></style>
