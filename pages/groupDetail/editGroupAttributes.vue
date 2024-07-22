<template>
  <view>
    <!-- #ifdef H5 || APP-PLUS -->
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
    <!-- #endif -->
    <!-- #ifndef H5 || APP-PLUS-->
    <u-navbar :safeAreaInsetTop="true" :placeholder="true" :fixed="true">
      <view class="u-nav-slot" slot="left">
        <u-icon
          name="arrow-left"
          label="取消"
          size="16"
          @click="onArrowLeftBackClick"
        ></u-icon>

        <u-line
          direction="column"
          :hairline="false"
          length="12"
          margin="0 5px"
        ></u-line>
        <view slot="right" @click="saveInGroupNickname">
          <text
            :class="[
              groupNicknameValue ? 'edit_save_btn' : 'edit_save_btn_gray',
            ]"
            >确认</text
          >
        </view>
      </view>
    </u-navbar>
    <!-- #endif -->
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
import { EMClient } from "@/EaseIM";
import { emGroups } from "@/EaseIM/emApis";
const { setSingleGroupAttributesFromServer } = emGroups();
export default {
  data() {
    return {
      groupId: "",
      groupNicknameValue: "",
    };
  },
  onLoad(option) {
    this.groupId = option.groupId;
    this.groupNicknameValue = option.inGroupNickname;
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    //保存设置的群内昵称属性
    async saveInGroupNickname() {
      // 检查群昵称值是否为空
      if (!this.groupNicknameValue.trim()) {
        // 如果为空，显示提示并返回，不执行后续操作
        uni.showToast({
          title: "群昵称不能为空",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      try {
        const groupId = this.groupId;
        const groupMembersProfile = {
          [EMClient.user]: { nickName: this.groupNicknameValue },
        };
        await setSingleGroupAttributesFromServer({
          groupId: this.groupId,
          userId: EMClient.user,
          memberAttributes: {
            nickName: this.groupNicknameValue,
          },
        });
        uni.showToast({
          title: "修改成功",
          icon: "none",
          duration: 2000,
        });

        this.$store.commit("SET_GROUP_MEMBERS_PROFILE", {
          groupId,
          groupMembersProfile: groupMembersProfile,
        });

        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      } catch (error) {
        console.log("保存设置的群组昵称失败", error);
        uni.showToast({
          title: "保存设置的群组昵称失败",
          icon: "none",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style scoped>
.u-nav-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-width: 0.5px;
  border-radius: 100px;
  border-color: #ccc;
  padding: 3px 7px;
  /* opacity: 0.8; */
}
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
</style>
