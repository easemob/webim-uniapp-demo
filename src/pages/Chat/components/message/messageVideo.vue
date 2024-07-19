<template>
  <view class="msg-video">
    <view class="video-poster">
      <image
        mode="widthFix"
        :style="{ width: styles.width, height: styles.height }"
        @error="onError"
        @load="onImgLoad"
        class="image"
        :src="msg.thumb"
      />
      <view
        v-if="!isError && isLoaded"
        @tap="toVideoPreview"
        class="video-play-btn"
      >
        <image class="video-play-btn-image" :src="VideoPlayBtn"></image>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import ImageNotFound from "@/static/images/img404.jpg";
import VideoPlayBtn from "@/static/images/videoplay.png";
import { ref } from "vue";
interface Props {
  msg: EasemobChat.VideoMsgBody;
}
const props = defineProps<Props>();

const IMAGE_MAX_SIZE = 200;

const styles = ref({ width: "auto", height: `${IMAGE_MAX_SIZE}px` });

const isError = ref(false);

const isLoaded = ref(false);

const onError = () => {
  props.msg.thumb = ImageNotFound;
  isError.value = true;
};

const genImageStyles = (value: { width?: any; height?: any }) => {
  const { width, height } = value;
  if (width === 0 || height === 0) {
    return;
  }
  let imageWidth = 0;
  let imageHeight = 0;
  if (width > height) {
    imageWidth = IMAGE_MAX_SIZE;
    imageHeight = (IMAGE_MAX_SIZE * height) / width;
  } else {
    imageWidth = (IMAGE_MAX_SIZE * width) / height;
    imageHeight = IMAGE_MAX_SIZE;
  }
  styles.value.width = imageWidth + "px";
  styles.value.height = imageHeight + "px";
};

const onImgLoad = (e: any) => {
  isLoaded.value = true;
  genImageStyles(e.detail);
};

const toVideoPreview = () => {
  uni.navigateTo({
    url: `../../pages/VideoPreview/index?url=${props.msg.url}`
  });
};
</script>

<style lang="scss" scoped>
.msg-video {
  position: relative;
}
.image {
  border-radius: 20rpx;
}

.video-poster {
  position: relative;
}

.video-play-btn {
  display: inline-block;
  position: absolute;
  width: 110rpx;
  height: 100rpx;
  top: 50%;
  left: 50%;
  transform: translateX(-50rpx) translateY(-50rpx);
  border-radius: 50%;
}

.video-play-btn-image {
  width: 110rpx;
  height: 100rpx;
}
</style>
