<template>
  <view>
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
    <template v-if="editProfileType == 1">
      <view class="edit_nickname u-border-bottom">
        <view class="edit_nickname_title">修改昵称</view>
        <view class="edit_nickname_input">
          <u-input
            v-model="profileValue"
            placeholder="请输入昵称"
            border="none"
            :focus="true"
            inputAlign="right"
          ></u-input>
        </view>
      </view>
    </template>
    <template v-if="editProfileType == 2">
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
import { emUserInfos } from '@/EaseIM/emApis';
const { updateUserInfosFromServer } = emUserInfos();
//16个汉字、32个英文字母
const regex = /^(?:[\u4e00-\u9fa5]{1,16}|[a-zA-Z]{1,32})$/;
export default {
  data() {
    return {
      profileValue: '',
      editProfileType: 1,
    };
  },
  onLoad(options) {
    console.log('options', options);
    this.editProfileType = options.editProfileType;
    if (options.editProfileType == 1) {
      this.profileValue = this.loginUserProfiles?.nickname || '';
    }
    if (options.editProfileType == 2) {
      this.profileValue = this.loginUserProfiles?.sign || '';
    }
  },
  computed: {
    navbarLeftText() {
      if (this.editProfileType == 1) {
        return '修改昵称';
      } else if (this.editProfileType == 2) {
        return '修改签名';
      }
    },
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
  },
  methods: {
    async saveProfile() {
      let updatedProfile = {};
      if (!regex.test(this.profileValue)) {
        uni.showToast({
          icon: 'none',
          title: '最多支持16个汉字或32个字母',
        });
        return;
      }
      try {
        if (this.editProfileType == 1) {
          const result = await updateUserInfosFromServer({
            nickname: this.profileValue,
          });
          updatedProfile = { ...result };
          console.log('>>>>>昵称', result);
        }
        if (this.editProfileType == 2) {
          const result = await updateUserInfosFromServer({
            sign: this.profileValue,
          });
          updatedProfile = { ...result };
          console.log('>>>>>签名', result);
        }
        this.$store.commit('SET_LOGIN_USER_PROFILES', updatedProfile);
        uni.showToast({
          icon: 'none',
          title: '修改成功',
          duration: 3000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 300);
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: '更新失败请稍后重试！',
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
  font-family: 'PingFang SC';
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
  height: 18px;
  /* 简体中文/标签/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
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
  color: #acb4b9;
}
.edit_sign {
  padding: 16px;
  background: #f1f2f3;
  border: 4px;
}
::v-deep .uni-textarea-wrapper {
  background: #f1f2f3;
}
</style>
