<template>
  <view>
    <!-- #ifdef H5 || APP-PLUS -->
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :left-text="navbarLeftText"
      :autoBack="true"
    >
      <view slot="right" @click="saveProfile">
        <text :class="[profileValue ? 'edit_save_btn' : 'edit_save_btn_gray']"
          >保存</text
        >
      </view>
    </u-navbar>
    <!-- #endif -->
    <!-- #ifndef H5 || APP-PLUS-->
    <u-navbar :safeAreaInsetTop="true" :placeholder="true" :fixed="true">
      <view class="u-nav-slot" slot="left">
        <u-icon
          name="arrow-left"
          :label="navbarLeftText"
          size="16"
          @click="onArrowLeftBackClick"
        ></u-icon>

        <u-line
          direction="column"
          :hairline="false"
          length="12"
          margin="0 5px"
        ></u-line>
        <!-- 添加群成员right -->

        <text
          @click="saveProfile"
          :class="[profileValue ? 'edit_save_btn' : 'edit_save_btn_gray']"
          >保存</text
        >
      </view>
    </u-navbar>
    <!-- #endif -->

    <!-- 用户昵称 -->
    <template v-if="editProfileType === PERSONAL_INFO_EDIT_TYPE.NICKNAME">
      <u-cell title="修改昵称">
        <u-input
          slot="value"
          v-model="profileValue"
          placeholder="请输入昵称"
          border="none"
          :focus="true"
          inputAlign="right"
        ></u-input>
      </u-cell>
    </template>
    <!-- 个性签名 -->
    <template v-if="editProfileType === PERSONAL_INFO_EDIT_TYPE.SIGN">
      <view class="edit_sign">
        <u--textarea
          border="none"
          v-model="profileValue"
          placeholder="请输入内容"
          count
          maxlength="30"
          :focus="true"
        ></u--textarea>
      </view>
    </template>
  </view>
</template>

<script>
import { PERSONAL_INFO_EDIT_TYPE } from "@/constant";
import { emUserInfos } from "@/EaseIM/emApis";
const { updateUserInfosFromServer } = emUserInfos();
//32个汉字、32个英文字母
const regexSign = /^.{1,32}$/;
//16个汉字，32个英文字母
const regexNickname =/^.{1,16}$/;
export default {
  data() {
    return {
      PERSONAL_INFO_EDIT_TYPE,
      profileValue: "",
      editProfileType: PERSONAL_INFO_EDIT_TYPE.NICKNAME,
    };
  },
  onLoad(options) {
    this.editProfileType = options.editProfileType * 1;
    if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.NICKNAME) {
      this.profileValue = this.loginUserProfiles?.nickname || "";
    }
    if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.SIGN) {
      this.profileValue = this.loginUserProfiles?.sign || "";
    }
  },
  computed: {
    navbarLeftText() {
      if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.NICKNAME) {
        return "修改昵称";
      } else if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.SIGN) {
        return "修改签名";
      }
    },
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    async saveProfile() {
      let updatedProfile = {};

      try {
        if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.NICKNAME) {
          if (!regexNickname.test(this.profileValue)) {
            uni.showToast({
              icon: "none",
              title: "最多支持16个字符",
            });
            return;
          }
          const result = await updateUserInfosFromServer({
            nickname: this.profileValue,
          });
          updatedProfile = { ...result };
          console.log(">>>>>昵称", result);
        }
        if (this.editProfileType === PERSONAL_INFO_EDIT_TYPE.SIGN) {
          if (!regexSign.test(this.profileValue)) {
            uni.showToast({
              icon: "none",
              title: "最多支持32个字符",
            });
            return;
          }
          const result = await updateUserInfosFromServer({
            sign: this.profileValue,
          });
          updatedProfile = { ...result };
          console.log(">>>>>签名", result);
        }
        this.$store.commit("SET_LOGIN_USER_PROFILES", updatedProfile);
        uni.showToast({
          icon: "none",
          title: "修改成功",
          duration: 3000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 300);
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "更新失败请稍后重试！",
        });
      }
    },
  },
};
</script>

<style scoped>
.edit_nickname {
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.edit_nickname_title {
  /* Title */
  height: 22px;
  left: 16px;
  /* 简体中文/次级标题/中 */
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-left: 16px;
  /* identical to box height, or 138% */

  /* Neutral/1 */
  color: #171a1c;
}
.edit_save_btn,
.edit_save_btn_gray {
  /* label_text */
  height: 15px;
  /* 简体中文/标签/中 */
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 129% */
  display: flex;
  align-items: center;
  text-align: right;

  /* Primary/5 */
  color: #009eff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
.edit_save_btn_gray {
  color: #606266;
}
.edit_sign {
  padding: 16px;
  background: #f1f2f3;
  border: 4px;
}
.u-nav-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-width: 0.5px;
  border-radius: 100px;
  border-color: #ccc;
  padding: 3px 7px;
  opacity: 0.8;
}
</style>
