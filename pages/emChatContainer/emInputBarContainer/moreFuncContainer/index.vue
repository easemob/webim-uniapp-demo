<template>
  <view class="more_func_container">
    <!-- 照片 -->
    <view class="more_func_item">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_img"
          src="/static/images/new_ui/inputbar/more_picture_icon.png "
        ></image>
      </view>
      <text>照片</text>
    </view>
    <!-- 相机 -->
    <view class="more_func_item">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_common"
          src="/static/images/new_ui/inputbar/more_camera_icon.png"
        ></image>
      </view>
      <text>相机</text>
    </view>
    <!-- 文件 -->
    <view class="more_func_item">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_common"
          src="/static/images/new_ui/inputbar/more_file_icon.png"
        ></image>
      </view>
      <text>文件</text>
    </view>
    <!-- 名片 -->
    <view class="more_func_item">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_profile"
          src="/static/images/new_ui/inputbar/more_profile_card_icon.png"
        ></image>
      </view>
      <text>名片</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
@import './index.css';
</style>
