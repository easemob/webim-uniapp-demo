<template>
  <view class="chat-input-bar-container">
    <reply-message-container
      ref="replyMessageContainerComps"
      v-show="isShowReplyMessageContainer"
      @onShowReplyMessageContainer="onShowReplyMessageContainer"
      :checkedPopupMsgBody="checkedPopupMsgBody"
    />
    <edit-message-container
      v-show="isShowEditMessageContainer"
      @onShowEditMessageContainer="onShowEditMessageContainer"
    />
    <view class="chat-input-bar">
      <!-- <template v-if="!isShowEditMessageContainer">
        <image
          class="chat-audio-icon-container"
          @click="onShowAudioMessageContainer"
          src="/static/images/new_ui/inputbar/audio_click_icon.png"
        ></image>
      </template> -->
      <!-- 文本输入input -->
      <view class="chat-input-container">
        <input
          ref="input"
          class="chat-input"
          v-model="msgContent"
          :cursor-spacing="cursorSpacing"
          confirm-type="send"
          type="text"
          :always-embed="true"
          :adjust-position="false"
          @focus="onInputFocus"
          @blur="onInputBlur"
          @confirm="sendTextMessage"
          @input="onInput"
        />
      </view>
      <template v-if="isShowEditMessageContainer">
        <image
          class="chat-emoji-icon-container"
          @click="actionModifyMessage"
          src="/static/images/new_ui/message/send_edit_msg_icon.png"
        ></image>
      </template>
    </view>
    <!-- 输入框底部功能栏 -->
    <view class="chat-input-bottom-bar">
      <!-- 语音 -->
      <view class="input-bottom-bar-icon" @click="onShowAudioMessageContainer">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/mic_stroke@2x.png"
        ></image>
      </view>
      <!-- 图库 -->
      <view class="input-bottom-bar-icon" @click="openPhotoAlbum('album')">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/img@2x.png"
        ></image>
      </view>
      <!-- 拍照 -->
      <view class="input-bottom-bar-icon" @click="openPhotoAlbum('camera')">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/camera@2x.png"
        ></image>
      </view>
      <!-- 文件 -->
      <!-- <view class="input-bottom-bar-icon">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/folder@2x.png"
        ></image>
      </view> -->
      <!-- 发送附件暂时隐藏 -->
      <!-- <SendFileMessage
        ref="fileComps"
        @onCloseAllShowContainer="onCloseAllShowContainer"
      >
        <view class="input-bottom-bar-icon">
          <image
            src="/static/images/new_ui/inputbar/tofeipeng/icons/folder@2x.png"
          ></image>
        </view>
      </SendFileMessage> -->
      <!-- emoji -->
      <view class="input-bottom-bar-icon" @click="onShowEmojiIconContainer">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/face@2x.png"
        ></image>
      </view>
      <!-- 更多 -->
      <view class="input-bottom-bar-icon" @click="onShowMoreFuncContainer">
        <image
          src="/static/images/new_ui/inputbar/tofeipeng/icons/plus_in_circle@2x.png"
        ></image>
      </view>
    </view>

    <!-- 软键盘弹起占位容器 -->
    <view
      class="softkeyword-placeholder"
      :style="{ height: softkeyboardHeight + 'px' }"
    >
      <!-- 音频发送板块 -->
      <view v-if="isShowAudioMessageContainer" class="chat-audio-container">
        <RecordAudioContainer
          @changeRecordAudioContainer="changeRecordAudioContainer"
        />
      </view>
      <!-- Emoji Icon选择板块 -->
      <view v-if="isShowEmojiIconContainer" class="chat-emoji-picker-container">
        <EmojiPickerContainer
          @appendEmojiIcon="appendEmojiIcon"
          @sendTextMessage="sendTextMessage"
          @deleteEmojs="deleteEmojs"
        />
      </view>
      <!-- 更多功能选择板块 -->
      <view v-if="isShowMoreFuncContainer" class="chat-more-icon-container">
        <MoreFuncContainer @onCloseAllShowContainer="onCloseAllShowContainer" />
      </view>
      <!-- 发送图片 -->
      <SendImageMessage
        ref="imageComps"
        @onCloseAllShowContainer="onCloseAllShowContainer"
      />
    </view>
    <!-- #ifdef H5 || APP-PLUS -->
    <!-- 小程序的宿主一般自带底部安全区 -->
    <view class="chat-input-bar-bottom-placeholder"></view>
    <!-- #endif -->
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { CHAT_TYPE } from '@/EaseIM/constant';
import { emMessages } from '@/EaseIM/emApis';
import RecordAudioContainer from './recordAudioContainer';
import EmojiPickerContainer from './emojiPickerContainer';
import MoreFuncContainer from './moreFuncContainer';
import ReplyMessageContainer from './replyMessageContainer';
import EditMessageContainer from './editMessageContainer';
import SendImageMessage from './inputMessages/sendImageMessage';
import SendFileMessage from './inputMessages/sendFileMessage';
import { MESSAGE_TYPE } from '../../../EaseIM/constant';
const { sendDisplayMessages, sendCommandMessages, modifyDisplayMessages } =
  emMessages();
const GraphemeSplitter = require('grapheme-splitter');

export default {
  name: 'chat-input-bar',
  components: {
    RecordAudioContainer,
    EmojiPickerContainer,
    MoreFuncContainer,
    ReplyMessageContainer,
    EditMessageContainer,
    SendImageMessage,
    SendFileMessage,
  },
  props: {
    checkedPopupMsgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      msgContent: '',
      cursorSpacing: 20,
      softkeyboardHeight: 0,
      isShowAudioMessageContainer: false,
      isShowEmojiIconContainer: false,
      isShowMoreFuncContainer: false,
      isShowReplyMessageContainer: false,
      isShowEditMessageContainer: false,
      isOpenedTypingBeginStatus: false,
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
    this.getLocalInputingStatus();
    //监听键盘高度变化
    //监听键盘抬起事件
    uni.onKeyboardHeightChange &&
      uni.onKeyboardHeightChange(this.listenerKeyboardHeight);
  },
  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
  },
  methods: {
    onInputFocus() {
      // input focus的时候重新设置一下input内容以修复在微信小程序&QQ小程序中input focus后位置偏移的bug
      // #ifdef MP-WEIXIN || MP-QQ
      //   this.msgContent += ' ';
      //   this.$nextTick(() => {
      //     this.msgContent = this.msgContent.slice(0, -1);
      //   });
      // #endif
      this.onCloseAllShowContainer();
    },
    listenerKeyboardHeight(e) {
      if (e.height > 0) {
        this.softkeyboardHeight = e.height;
      } else {
        this.softkeyboardHeight = 0;
      }
    },
    onInputBlur() {
      //   this.onCloseAllShowContainer();
    },
    onInput() {
      if (
        this.isShowEditMessageContainer === false &&
        this.isOpenedTypingBeginStatus
      ) {
        //节流正在输入中信令发送调用 10s发送一次。
        uni.$u.throttle(this.sendTypingBeginMessage, 10000, true);
      }
    },
    //发送文本消息
    async sendTextMessage() {
      if (this.msgContent.match(/^\s*$/)) {
        uni.showToast({
          title: '请输入内容',
          icon: 'none',
        });
        return;
      }
      let params = {
        // 消息类型。
        type: 'txt',
        // 消息内容。
        msg: this.msgContent,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
        ext: {},
      };
      //如果此时为编辑模式则直接return 并调用编辑消息
      if (this.isShowEditMessageContainer) {
        this.actionModifyMessage();
        return;
      }
      //检测是否存在引用消息
      if (this.isShowReplyMessageContainer) {
        params.ext.msgQuote = {};
        params.ext.msgQuote =
          this.$refs.replyMessageContainerComps.extractMessageBodyValue();
        console.log('>>>存在引用', params);
      }
      try {
        const res = await sendDisplayMessages({ ...params });
        console.log('>>>>>文本消息发送成功', res);
      } catch (error) {
        console.log('>>>>>文本消息发送失败', error);
        if (error.type === 508) {
          uni.showToast({
            title: '发送内容不合规',
            icon: 'none',
          });
        } else {
          uni.showToast({
            title: `消息发送失败${error.type}`,
            icon: 'none',
          });
        }
      } finally {
        this.msgContent = '';
        this.onCloseAllShowContainer(true);
        this.isShowReplyMessageContainer &&
          (this.isShowReplyMessageContainer = false);
      }
    },
    //编辑修改已发送文本消息
    async actionModifyMessage() {
      const editMessageContent = {
        msg: this.msgContent,
        to: this.checkedPopupMsgBody.to,
        id: this.checkedPopupMsgBody.id,
        chatType: this.checkedPopupMsgBody.chatType,
      };
      try {
        const res = await modifyDisplayMessages(editMessageContent);
        this.$store.commit('MODIFY_MESSAGE_FROM_COLLECTION', {
          key: editMessageContent.to,
          mid: editMessageContent.id,
          msg: editMessageContent.msg,
        });
        console.log('>>>>>>消息修改成功', res);
      } catch (error) {
        console.log('>>>>>>修改消息失败', error);
        if (error?.type === 50) {
          uni.showToast({
            icon: 'none',
            title: '该消息可编辑次数已达上限',
          });
        } else {
          uni.showToast({
            icon: 'none',
            title: '消息编辑失败请稍后重试',
          });
        }
      } finally {
        this.isShowEditMessageContainer = false;
        this.msgContent = '';
      }
    },
    //获取当前键入中开启状态
    getLocalInputingStatus() {
      const res = uni.getStorageSync(`EM_${EMClient.user}_GENNERAL_CONFIG`);
      const { isShowInputingStatus } = res || {};
      this.isOpenedTypingBeginStatus = isShowInputingStatus;
    },
    //发送正在键入command
    async sendTypingBeginMessage() {
      const params = {
        type: MESSAGE_TYPE.CMD,
        // 消息类型。
        action: 'TypingBegin',
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
      };
      try {
        await sendCommandMessages(params);
      } catch (error) {
        console.log('>>>>>发送失败', error);
      }
    },
    onShowAudioMessageContainer() {
      this.isShowAudioMessageContainer = !this.isShowAudioMessageContainer;
      if (this.isShowAudioMessageContainer) {
        this.softkeyboardHeight = 200;
      } else {
        this.softkeyboardHeight = 0;
      }
      this.isShowEmojiIconContainer && (this.isShowEmojiIconContainer = false);
      this.isShowMoreFuncContainer && (this.isShowMoreFuncContainer = false);
      this.$emit('resetScrollHeight', 200);
    },
    onShowEmojiIconContainer() {
      this.isShowEmojiIconContainer = !this.isShowEmojiIconContainer;
      //如果emoji表情框展开则给softkeyboardHeight一个撑开的高度
      if (this.isShowEmojiIconContainer) {
        this.softkeyboardHeight = 200;
      } else {
        this.softkeyboardHeight = 0;
      }
      this.isShowAudioMessageContainer &&
        (this.isShowAudioMessageContainer = false);
      this.isShowMoreFuncContainer && (this.isShowMoreFuncContainer = false);
    },
    onShowMoreFuncContainer() {
      this.isShowMoreFuncContainer = !this.isShowMoreFuncContainer;
      if (this.isShowMoreFuncContainer) {
        this.softkeyboardHeight = 200;
      } else {
        this.softkeyboardHeight = 0;
      }
      this.isShowAudioMessageContainer &&
        (this.isShowAudioMessageContainer = false);
      this.isShowEmojiIconContainer && (this.isShowEmojiIconContainer = false);
    },
    onShowReplyMessageContainer() {
      this.isShowReplyMessageContainer = !this.isShowReplyMessageContainer;
      this.isShowEditMessageContainer &&
        (this.isShowEditMessageContainer = false);
      this.onCloseAllShowContainer();
    },
    onShowEditMessageContainer() {
      if (this.isShowEditMessageContainer === false) {
        this.msgContent = this.checkedPopupMsgBody.msg;
      }
      this.isShowEditMessageContainer = !this.isShowEditMessageContainer;
      this.isShowReplyMessageContainer &&
        (this.isShowReplyMessageContainer = false);
      this.onCloseAllShowContainer();
    },
    changeRecordAudioContainer() {
      if (this.softkeyboardHeight > 0) {
        this.softkeyboardHeight = 0;
      }
      this.isShowAudioMessageContainer = false;
    },
    onCloseAllShowContainer(isSended) {
      //isSended 表示为发送消息后关闭所有弹出框，且关闭软键盘占位view
      if (isSended && this.softkeyboardHeight > 0) {
        this.softkeyboardHeight = 0;
      }
      this.isShowAudioMessageContainer = false;
      this.isShowEmojiIconContainer = false;
      this.isShowMoreFuncContainer = false;
    },
    appendEmojiIcon(emoji) {
      this.msgContent += emoji;
    },
    deleteEmojs() {
      var splitter = new GraphemeSplitter();
      let graphemes = splitter.splitGraphemes(this.msgContent);
      if (graphemes.length === 0) {
        return;
      }
      graphemes.pop();
      this.msgContent = graphemes.join('');
    },
    appendReEditTextMessage(content) {
      if (this.msgContent !== '') {
        this.msgContent += content;
      } else {
        this.msgContent = content;
      }
    },
    openPhotoAlbum(type) {
      if (type === 'camera') {
        this.$refs.imageComps.openCamera();
      } else if (type === 'album') {
        this.$refs.imageComps.openPhotoAlbum();
      }
    },
  },
  beforeDestroy() {
    uni.offKeyboardHeightChange &&
      uni.offKeyboardHeightChange(this.listenerKeyboardHeight);
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

.softkeyword-placeholder {
  width: 100%;
  background-color: white;
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

.chat-input-bottom-bar {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 50rpx;
  box-sizing: border-box;
  background-color: white;
}

.input-bottom-bar-icon {
  width: 60rpx;
  height: 60rpx;
}

.input-bottom-bar-icon image {
  width: 100%;
  height: 100%;
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
  /* height: 200px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #fff;
}

.chat-emoji-picker-container {
  width: 100%;
  background: #fff;
}
</style>
