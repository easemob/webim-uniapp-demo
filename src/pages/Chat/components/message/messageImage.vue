<template>
  <view class="msg-image">
    <image
      mode="aspectFit"
      :style="{ width: styles.width, height: styles.height }"
      @error="onError"
      @tap="previewImage"
      @load="onImgLoad"
      class="image"
      :src="msg.thumb"
    />
  </view>
</template>

<script lang="ts" setup>
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import ImageNotFound from "@/static/images/img404.jpg";
import { ref } from "vue";
interface Props {
  msg: EasemobChat.ImgMsgBody;
}
const IMAGE_MAX_SIZE = 160;
const props = defineProps<Props>();
const isError = ref(false);
const styles = ref({ width: "auto", height: `${IMAGE_MAX_SIZE}px` });

const onError = () => {
  isError.value = true;
  props.msg.thumb = ImageNotFound;
};

const previewImage = () => {
  if (isError.value) {
    return;
  }
  uni.previewImage({
    urls: [props.msg.url || ""]
  });
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
  genImageStyles(e.detail);
};
</script>

<style lang="scss" scoped>
.image {
  border-radius: 20rpx;
}
</style>
