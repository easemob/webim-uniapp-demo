<template>
  <view class="input_bar_container" :style="{ bottom: `${keyboardHeight}px` }">
    <input-audio ref="inputAudioComp" />
    <input-main
      ref="inputMainComp"
      @toggleRecordModal="toggleRecordModal"
      @openEmojiModal="openEmojiModal"
      @closeEmojiModal="closeEmojiModal"
      @openFunModal="openFunModal"
      @closeAllModal="closeAllModal"
    />
    <input-emoji
      ref="inputEmojiComp"
      @appendEmojiMapString="appendEmojiMapString"
      @deleteEmojiMapString="deleteEmojiMapString"
    />
    <input-image ref="inputImageComp" @closeAllModal="closeAllModal" />
    <!-- 更多功能 -->
    <view v-if="isShowFunModal" :class="'showFunModal'">
      <view :class="'other_func'">
        <view class="open_camera" @click="openCamera">
          <image src="/static/images/camora.png"></image>
          相机
        </view>
        <view class="menu_wrap" @click="openPhotoAlbum">
          <image src="/static/images/pic.png"></image>
          相册
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="menu_wrap">
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
        <view
          class="menu_wrap"
          @tap="edit_group"
          v-show="injectChatType === 'groupChat'"
        >
          <image src="/static/images/pic.png"></image>
          群信息
        </view>
        <view class="menu_wrap">
          <view class="account_box" @tap="openUserCardModal">
            <image src="/static/images/pic.png"></image>
          </view>
          用户名片
        </view>
      </view>
    </view>
    <input-user-card ref="inputUserCardComp" @closeAllModal="closeAllModal" />
  </view>
</template>

<script setup>
import { ref, inject } from 'vue';
import { onLoad, onUnload } from '@dcloudio/uni-app';
/* components */
import InputAudio from './suit/audio';
import InputMain from './suit/main';
import InputEmoji from './suit/emoji';
//附件
import InputAttach from './suit/attach';
import InputImage from './suit/image';
import InputUserCard from './suit/userCard';
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
//控制输入框根据软键盘弹起从而调整高度
const keyboardHeight = ref(0);
const listenerKeyboardHeight = (event) => {
  const { height } = event;
  keyboardHeight.value = height;
  console.log('keyboardHeight++++++', height);
};
onLoad(() => {
  uni.onKeyboardHeightChange(listenerKeyboardHeight);
});
onUnload(() => {
  uni.offKeyboardHeightChange(listenerKeyboardHeight);
});
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
</script>

<style scoped>
@import './index.css';
</style>
