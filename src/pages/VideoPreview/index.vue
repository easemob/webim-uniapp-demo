<template>
  <view class="video-preview">
    <video
      v-if="isShow"
      class="video-box"
      :src="videoUrl"
      controls
      autoplay
    ></video>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { isSafari, isiOS, isWechat } from "@/utils/index";

const videoUrl = ref("");
const isShow = ref(false);

onLoad((option) => {
  // 支持safari浏览器播放
  if (isSafari() || (isWechat() && isiOS())) {
    videoUrl.value = `${option?.url}&origin-file=true`;
  } else {
    videoUrl.value = option?.url;
  }
  const timer = setTimeout(() => {
    // 延时显示视频，否则多次进入视频video发生偏移
    isShow.value = true;
    clearTimeout(timer);
  }, 200);
});
</script>

<style lang="scss" scoped>
.video-preview {
  width: 100%;
  height: 100%;
  background-color: #000;
}
.video-box {
  width: 100%;
  height: 100%;
}
</style>
