<template>
  <view class="chat-input-bar-container">
    <view class="chat-input-bar">
      <image
        class="chat-audio-icon-container"
        @click="onShowAudioMessageContainer"
        src="/static/images/new_ui/inputbar/audio_click_icon.png"
      ></image>
      <view class="chat-input-container">
        <input
          class="chat-input"
          v-model="msg"
          :cursor-spacing="cursorSpacing"
          confirm-type="send"
          type="text"
          placeholder="请输入内容"
          @focus="onInputFocus"
          @confirm="sendClick"
        />
      </view>
      <image
        class="chat-emoji-icon-container"
        @click="onShowEmojiIconContainer"
        src="/static/images/new_ui/inputbar/emoji_click_icon.png"
      ></image>

      <image
        class="chat-emoji-icon-container"
        v-if="msg"
        src="/static/images/new_ui/inputbar/audio_send_icon.png"
      ></image>
      <image
        v-else
        class="chat-emoji-icon-container"
        src="/static/images/new_ui/inputbar/more_click_icon.png"
        @click="onShowMoreFuncContainer"
      ></image>
    </view>
    <!-- 音频发送板块 -->
    <view v-show="isShowAudioMessageContainer" class="chat-audio-container">
      <RecordAudioContainer
        @changeRecordAudioContainer="
          () => (isShowAudioMessageContainer = false)
        "
      />
    </view>
    <!-- Emoji Icon选择板块 -->
    <view v-show="isShowEmojiIconContainer" class="chat-emoji-picker-container">
      <EmojiPickerContainer />
    </view>
    <!-- 更多功能选择板块 -->
    <view v-show="isShowMoreFuncContainer" class="chat-more-icon-container">
      <MoreFuncContainer />
    </view>
    <view class="chat-input-bar-bottom-placeholder"></view>
  </view>
</template>

<script>
import RecordAudioContainer from './recordAudioContainer';
import EmojiPickerContainer from './emojiPickerContainer';
import MoreFuncContainer from './moreFuncContainer';
export default {
  name: 'chat-input-bar',
  components: {
    RecordAudioContainer,
    EmojiPickerContainer,
    MoreFuncContainer,
  },
  data() {
    return {
      msg: '',
      cursorSpacing: 20,
      isShowAudioMessageContainer: false,
      isShowEmojiIconContainer: false,
      isShowMoreFuncContainer: false,
    };
  },
  mounted() {
    // #ifndef APP-NVUE
    const query = uni.createSelectorQuery().in(this);
    query
      .select('.chat-input-bar-bottom-placeholder')
      .boundingClientRect((data) => {
        if (data && data.height) {
          this.cursorSpacing = data.height + 20;
        }
      })
      .exec();
    // #endif
  },
  methods: {
    onInputFocus() {
      // input focus的时候重新设置一下input内容以修复在微信小程序&QQ小程序中input focus后位置偏移的bug
      // #ifdef MP-WEIXIN || MP-QQ
      this.msg += ' ';
      this.$nextTick(() => {
        this.msg = this.msg.slice(0, -1);
      });
      // #endif
      this.onCloseAllShowContainer();
    },
    sendClick() {
      if (!this.msg.length) return;
      this.$emit('send', this.msg);
      this.msg = '';
    },
    onShowAudioMessageContainer() {
      this.isShowAudioMessageContainer = !this.isShowAudioMessageContainer;
      this.isShowEmojiIconContainer && (this.isShowEmojiIconContainer = false);
      this.isShowMoreFuncContainer && (this.isShowMoreFuncContainer = false);
      this.$emit('resetScrollHeight', 200);
    },
    onShowEmojiIconContainer() {
      this.isShowEmojiIconContainer = !this.isShowEmojiIconContainer;
      this.isShowAudioMessageContainer &&
        (this.isShowAudioMessageContainer = false);
      this.isShowMoreFuncContainer && (this.isShowMoreFuncContainer = false);
    },
    onShowMoreFuncContainer() {
      this.isShowMoreFuncContainer = !this.isShowMoreFuncContainer;
      this.isShowAudioMessageContainer &&
        (this.isShowAudioMessageContainer = false);
      this.isShowEmojiIconContainer && (this.isShowEmojiIconContainer = false);
    },
    onCloseAllShowContainer() {
      this.isShowAudioMessageContainer = false;
      this.isShowEmojiIconContainer = false;
      this.isShowMoreFuncContainer = false;
    },
  },
};
</script>

<style scoped>
.chat-input-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: solid 1px #f5f5f5;
  background-color: #f8f8f8;
  padding: 10rpx 15rpx;
}
.chat-input-bar-bottom-placeholder {
  background-color: #f8f8f8;
  /* #ifndef APP-PLUS */
  height: env(safe-area-inset-bottom);
  /* #endif */
}
.chat-input-container {
  flex: 1;
  display: flex;
  /* #ifndef APP-NVUE */
  padding: 15rpx;
  /* #endif */
  /* #ifdef APP-NVUE */
  padding: 10rpx;
  /* #endif */
  background-color: white;
  border-radius: 10rpx;
}
.chat-input {
  flex: 1;
  font-size: 28rpx;
}
.chat-input-send {
  background-color: #007aff;
  margin: 10rpx 10rpx 10rpx 20rpx;
  border-radius: 10rpx;
  padding: 10rpx 30rpx;
}
.chat-input-send-text {
  color: white;
  font-size: 26rpx;
}
.chat-audio-icon-container,
.chat-emoji-icon-container,
.chat-cancel-icon-container {
  width: 30px;
  height: 30px;
}
.chat-audio-container {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #fff;
}
.chat-emoji-picker-container {
  width: 100%;
  height: 300px;
  background: #fff;
}
</style>
