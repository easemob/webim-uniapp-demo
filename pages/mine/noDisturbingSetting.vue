<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="消息通知"
      :autoBack="true"
    >
    </u-navbar>
    <u-cell-group :border="false">
      <u-cell title="消息免打扰" label="开启后，你将收不到任何消息推送与提示">
        <view slot="value">
          <u-switch v-model="isOpenNoDisturbingSetting"></u-switch>
        </view>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isOpenNoDisturbingSetting: false, //是否开启消息免打扰
    };
  },
};
</script>

<style lang="scss" scoped></style>
