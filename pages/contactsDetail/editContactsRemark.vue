<template>
  <view>
    <view>
      <u-navbar
        :safeAreaInsetTop="true"
        :placeholder="true"
        :fixed="true"
        left-text="取消"
        :autoBack="true"
      >
        <view slot="right" @click="saveContactsRemark">
          <text
            :class="[contactsRemark ? 'edit_save_btn' : 'edit_save_btn_gray']"
            >确认</text
          >
        </view>
      </u-navbar>
      <view class="edit_nickname u-border-bottom">
        <view class="edit_nickname_title">设置备注</view>
        <view class="edit_nickname_input">
          <u-input
            v-model="contactsRemark"
            placeholder="请输入"
            border="none"
            :focus="true"
            inputAlign="right"
          ></u-input>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { emContacts } from '@/EaseIM/emApis';
const { setContactRemarkFromServer } = emContacts();
export default {
  data() {
    return {
      contactsUserId: '',
      contactsRemark: '',
    };
  },
  onLoad(option) {
    this.contactsUserId = option.userId;
    this.contactsRemark = option?.contactsRemark;
  },
  methods: {
    async saveContactsRemark() {
      if (!this.contactsUserId || !this.contactsRemark) return;
      //好友备注不能超过100个字符
      if (this.contactsRemark.length > 100) {
        uni.showToast({
          title: '备注不能超过100个字符',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      try {
        const contactId = this.contactsUserId;
        const remark = this.contactsRemark;
        await setContactRemarkFromServer(contactId, remark);
        this.$store.commit('UPDATE_FRIEND_USER_REMARK', { contactId, remark });
        uni.navigateBack({
          delta: 1,
        });
      } catch (error) {
        console.log('好友备注修改失败', error);
        uni.showToast({
          title: '联系人备注修改失败',
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
