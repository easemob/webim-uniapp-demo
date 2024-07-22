<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="关于我们"
      :autoBack="true"
    >
    </u-navbar>
    <web-view
      :webview-styles="webviewStyles"
      src="https://www.easemob.com/"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333',
        },
      },
    };
  },
};
</script>

<style scoped></style>
