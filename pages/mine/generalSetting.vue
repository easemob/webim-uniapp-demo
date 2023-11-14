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
          <u-switch v-model="isShowInputingStatus"></u-switch>
        </view>
      </u-cell>
      <u-cell title="自动通过好友申请" label="开启后，在线时自动同意好友申请">
        <view slot="value">
          <u-switch v-model="isAutoAcceptFriendRequest"></u-switch>
        </view>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShowInputingStatus: false,
      isAutoAcceptFriendRequest: false,
    };
  },
};
</script>

<style scoped></style>
