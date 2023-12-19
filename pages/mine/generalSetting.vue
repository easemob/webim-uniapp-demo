<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="通用"
      :autoBack="true"
    >
    </u-navbar>
    <u-cell-group :border="false">
      <u-cell title="显示输入状态" label="开启后，对方将看见你的输入状态">
        <view slot="value">
          <u-switch
            v-model="isShowInputingStatus"
            @input="saveGenneralConfig"
          ></u-switch>
        </view>
      </u-cell>
      <u-cell title="自动通过好友申请" label="开启后，在线时自动同意好友申请">
        <view slot="value">
          <u-switch
            v-model="isAutoAcceptFriendRequest"
            @input="saveGenneralConfig"
          ></u-switch>
        </view>
      </u-cell>
      <u-cell title="自动接收群组邀请" label="开启后，在线时自动接收群组邀请">
        <view slot="value">
          <u-switch
            v-model="isAutoAcceptGroupRequest"
            @input="saveGenneralConfig"
          ></u-switch>
        </view>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
export default {
  data() {
    return {
      isShowInputingStatus: false,
      isAutoAcceptFriendRequest: false,
      isAutoAcceptGroupRequest: false,
    };
  },
  created() {
    this.getGenneralConfig();
  },
  methods: {
    //获取当前本地存储的自定义配置
    getGenneralConfig() {
      console.log('>>>>>获取当前本地配置');
      const res = uni.getStorageSync(`EM_${EMClient.user}_GENNERAL_CONFIG`);
      const {
        isAutoAcceptFriendRequest,
        isAutoAcceptGroupRequest,
        isShowInputingStatus,
      } = res || {};
      this.isShowInputingStatus = isShowInputingStatus;
      this.isAutoAcceptFriendRequest = isAutoAcceptFriendRequest;
      this.isAutoAcceptGroupRequest = isAutoAcceptGroupRequest;

      //acceptInvitationAlways 自定通过好友申请
    },
    //保存当前本地存储的自定义配置
    saveGenneralConfig() {
      const config = {
        isShowInputingStatus: this.isShowInputingStatus,
        isAutoAcceptFriendRequest: this.isAutoAcceptFriendRequest,
        isAutoAcceptGroupRequest: this.isAutoAcceptGroupRequest,
      };
      uni.setStorageSync(`EM_${EMClient.user}_GENNERAL_CONFIG`, config);
    },
  },
};
</script>

<style scoped></style>
