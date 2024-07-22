<template>
  <view class="more_func_container">
    <!-- 照片 -->
    <!-- <view class="more_func_item" @click="openPhotoAlbum('album')">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_img"
          src="/static/images/new_ui/inputbar/more_picture_icon.png "
        ></image>
      </view>
      <text>照片</text>
    </view> -->
    <!-- 相机 -->
    <!-- <view class="more_func_item" @click="openPhotoAlbum('camera')">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_common"
          src="/static/images/new_ui/inputbar/more_camera_icon.png"
        ></image>
      </view>
      <text>相机</text>
    </view> -->
    <!-- 文件 -->
    <!-- <view class="more_func_item">
      <SendFileMessage
        ref="fileComps"
        @onCloseAllShowContainer="onCloseAllShowContainer"
      >
        <view class="more_func_item_icon">
          <image
            class="more_func_item_icon_common"
            src="/static/images/new_ui/inputbar/more_file_icon.png"
          ></image>
        </view>
      </SendFileMessage>
      <text>文件</text>
    </view> -->
    <!-- 名片 -->
    <view class="more_func_item" @click="entrySelectUserCard">
      <view class="more_func_item_icon">
        <image
          class="more_func_item_icon_profile"
          src="/static/images/new_ui/inputbar/more_profile_card_icon.png"
        ></image>
      </view>
      <text>名片</text>
    </view>
    <SendImageMessage
      ref="imageComps"
      @onCloseAllShowContainer="onCloseAllShowContainer"
    />
    <!-- <SendLocalMessage @onCloseAllShowContainer="onCloseAllShowContainer" /> -->
  </view>
</template>

<script>
import SendImageMessage from '../inputMessages/sendImageMessage';
import SendFileMessage from '../inputMessages/sendFileMessage';
import SendLocalMessage from '../inputMessages/sendLocalMessage';
export default {
  components: { SendImageMessage, SendFileMessage, SendLocalMessage },
  data() {
    return {};
  },
  methods: {
    openPhotoAlbum(type) {
      if (type === 'camera') {
        this.$refs.imageComps.openCamera();
      } else if (type === 'album') {
        this.$refs.imageComps.openPhotoAlbum();
      }
    },
    onCloseAllShowContainer() {
      this.$emit('onCloseAllShowContainer', true);
    },
    entrySelectUserCard() {
      uni.navigateTo({
        url: '../emChatContainer/emSelectUserCard/index',
      });
      this.onCloseAllShowContainer();
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
