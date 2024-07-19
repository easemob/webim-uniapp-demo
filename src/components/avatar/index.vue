<template>
  <view
    :class="['avatar', shape]"
    :style="{ width: size + 'rpx', height: size + 'rpx' }"
  >
    <image class="image" :src="imageSrc" :alt="alt" @error="onError"> </image>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

interface Props {
  src: string;
  alt?: string;
  size?: number;
  shape?: "circle" | "square";
  placeholder?: string;
}

const props = defineProps<Props>();
const isError = ref(false);

const imageSrc = computed(() => {
  if (isError.value) {
    return props.placeholder;
  }
  return props.src || props.placeholder;
});
const size = props.size || 100; // 默认大小为100rpx
const shape = props.shape || "circle"; // 默认形状为圆形

const onError = () => {
  isError.value = true;
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
