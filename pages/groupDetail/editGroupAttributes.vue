<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="取消"
      :autoBack="true"
    >
      <view slot="right" @click="saveInGroupNickname">
        <text
          :class="[groupNicknameValue ? 'edit_save_btn' : 'edit_save_btn_gray']"
          >确认</text
        >
      </view>
    </u-navbar>
    <view class="edit_nickname u-border-bottom">
      <view class="edit_nickname_title">我在本群的昵称</view>
      <view class="edit_nickname_input">
        <u-input
          v-model="groupNicknameValue"
          placeholder="请输入"
          border="none"
          :focus="true"
          inputAlign="right"
        ></u-input>
      </view>
    </view>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { emGroups } from '@/EaseIM/emApis';
const { setSingleGroupAttributesFromServer } = emGroups();
export default {
  data() {
    return {
      groupId: '',
      groupNicknameValue: '',
    };
  },
  onLoad(option) {
    this.groupId = option.groupId;
    this.groupNicknameValue = option.inGroupNickname;
  },
  methods: {
    //保存设置的群内昵称属性
    async saveInGroupNickname() {
      try {
        await setSingleGroupAttributesFromServer({
          groupId: this.groupId,
          userId: EMClient.user,
          memberAttributes: {
            nickName: this.groupNicknameValue,
          },
        });
        uni.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      } catch (error) {
        console.log('保存设置的群组昵称失败', error);
        uni.showToast({
          title: '保存设置的群组昵称失败',
          icon: 'none',
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style scoped>
.edit_nickname {
  width: 95%;
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
</style>
