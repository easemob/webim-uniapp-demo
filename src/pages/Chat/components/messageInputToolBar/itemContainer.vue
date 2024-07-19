<template>
  <view class="tool-item-wrap">
    <view class="icon-wrap">
      <image class="icon" :src="iconUrl"></image>
    </view>
    <view>{{ title }}</view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  iconUrl: string;
}
const props = defineProps<Props>();

const { title, iconUrl } = props;
</script>

<style lang="scss" scoped>
.tool-item-wrap {
  width: 130rpx;
  height: 130rpx;
  font-size: 24rpx;
  color: #464e53;
  text-align: center;
  cursor: pointer;
}

.icon-wrap {
  display: flex;
  width: 130rpx;
  height: 130rpx;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
}

.icon {
  width: 70rpx;
  height: 70rpx;
}
</style>
