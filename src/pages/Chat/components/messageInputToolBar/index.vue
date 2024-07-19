<template>
  <view class="message-input-toolbar">
    <swiper class="swiper">
      <swiper-item class="swiper-item">
        <ImageUpload />
        <VideoUpload />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import ImageUpload from "./imageUpload.vue";
import VideoUpload from "./videoUpload.vue";
const emits = defineEmits(["onMessageSend"]);
</script>
<style lang="scss" scoped>
.message-input-toolbar {
  background:#f3f3f3;
}

.swiper-item {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 100px);
}
</style>
