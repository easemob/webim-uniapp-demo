<template>
  <view
    class="input_bar_container"
    :style="{ bottom: `${keyboardHeight}px` }"
    @touchmove.stop.prevent="moveStop"
  >
    <input-audio ref="inputAudioComp" />
    <input-main
      ref="inputMainComp"
      @toggleRecordModal="toggleRecordModal"
      @openEmojiModal="openEmojiModal"
      @closeEmojiModal="closeEmojiModal"
      @openFunModal="openFunModal"
      @closeAllModal="closeAllModal"
    />
    <!-- 更多功能 -->
    <input-emoji
      ref="inputEmojiComp"
      @appendEmojiMapString="appendEmojiMapString"
      @deleteEmojiMapString="deleteEmojiMapString"
    />
    <!-- 图片上传组件 -->
    <input-image ref="inputImageComp" @closeAllModal="closeAllModal" />
    <!-- 用户卡片组件 -->
    <input-user-card ref="inputUserCardComp" @closeAllModal="closeAllModal" />
    <view v-if="isShowFunModal" :class="'showFunModal'">
      <view :class="'other_func'">
        <view> </view>
        <view class="other_func_item open_camera" @click="openCamera">
          <image src="/static/images/camora.png"></image>
          相机
        </view>
        <view class="other_func_item menu_wrap" @click="openPhotoAlbum">
          <image src="/static/images/pic.png"></image>
          相册
        </view>
        <view
          class="other_func_item menu_wrap"
          @tap="edit_group"
          v-show="injectChatType === 'groupChat'"
        >
          <image src="/static/images/pic.png"></image>
          群信息
        </view>
        <view class="other_func_item menu_wrap">
          <view class="account_box" @tap="openUserCardModal">
            <image src="/static/images/pic.png"></image>
          </view>
          用户名片
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="other_func_item menu_wrap">
          <input-attach
            :chatParams="chatParams"
            :chatType="chatType"
            @closeAllModal="closeAllModal"
          >
            <image
              style="background-color: #fff"
              src="/static/images/file.png"
            ></image>
            附件
          </input-attach>
        </view>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, inject } from 'vue';
import { onLoad, onUnload } from '@dcloudio/uni-app';
/* components */
import InputMain from './suit/main';
import InputAudio from './suit/audio';
import InputEmoji from './suit/emoji';
//附件
import InputAttach from './suit/attach';
import InputImage from './suit/image';
import InputUserCard from './suit/userCard';
/* 动态调整输入框位置，防止输入框遮挡现象 */
//存储键盘高度
let keyboardHeight = ref(0);
const listenerKeyboardHeight = (e) => {
  keyboardHeight.value = e.height;
};
const moveStop = () => {
  return;
};
onLoad(() => {
  //监听键盘抬起事件
  uni.onKeyboardHeightChange(listenerKeyboardHeight);
});
onUnload(() => {
  //卸载监听键盘事件
  uni.offKeyboardHeightChange(listenerKeyboardHeight);
});
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
//核心文本输入相关
const inputMainComp = ref(null);
//语音录制相关
const inputAudioComp = ref(null);
const toggleRecordModal = () => {
  inputAudioComp.value.toggleRecordModal();
};
//emoji输入相关
const inputEmojiComp = ref(null);
const openEmojiModal = () => {
  inputEmojiComp.value.openEmoji();
  if (isShowFunModal.value) {
    closeFunModal();
  }
};
const closeEmojiModal = () => {
  inputEmojiComp.value.cancelEmoji();
};
const appendEmojiMapString = (emoji) => {
  if (!emoji) return;
  inputMainComp.value.inputContent = inputMainComp.value.inputContent + emoji;
};
const deleteEmojiMapString = () => {
  inputMainComp.value.delEmojiMapString();
};
/* 更多功能相关 */
const isShowFunModal = ref(false);
const openFunModal = () => {
  console.log('>>>>打开更多功能');
  isShowFunModal.value = true;
  closeEmojiModal();
};
const closeFunModal = () => {
  isShowFunModal.value = false;
  //   closeEmojiModal();
};
const closeAllModal = () => {
  closeEmojiModal();
  closeFunModal();
};
//点击拍照
const inputImageComp = ref(null);
const openCamera = () => {
  inputImageComp.value.openCamera();
};
//从相册选择
const openPhotoAlbum = () => {
  inputImageComp.value.openPhotoAlbum();
};

//用户卡片相关
const inputUserCardComp = ref(null);
const openUserCardModal = () => {
  console.log('>>>>执行打开好友卡片');
  inputUserCardComp.value.alertUserCardModal();
};
//编辑群组相关信息
const edit_group = () => {
  const nameList = {
    groupid: injectTargetId.value,
  };
  uni.navigateTo({
    url: '../groupSetting/groupSetting?groupInfo=' + JSON.stringify(nameList),
  });
};
defineExpose({
  closeAllModal,
});
</script>

<style>
@import './index.css';
</style>
