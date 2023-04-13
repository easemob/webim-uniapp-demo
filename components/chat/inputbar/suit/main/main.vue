<template>
  <!-- <chat-suit-emoji id="chat-suit-emoji" bind:newEmojiStr="emojiAction"></chat-suit-emoji> -->
  <form class="text-input">
    <view :class="mainState.isIPX ? 'f-row-x' : 'f-row'">
      <!-- 发送语音 -->
      <view>
        <image
          class="icon-mic"
          src="/static/images/voice.png"
          @tap="openRecordModal"
        ></image>
      </view>
      <!-- 输入框 -->
      <textarea
        class="f news"
        type="text"
        cursor-spacing="65"
        confirm-type="done"
        v-model.trim="mainState.inputMessage"
        @confirm="sendMessage"
        @input="bindMessage"
        @tap="focus"
        @focus="focus"
        @blur="blur"
        :confirm-hold="mainState.isIPX ? true : false"
        auto-height
        :show-confirm-bar="false"
        maxlength="300"
      />
      <view>
        <image
          class="icon-mic"
          src="/static/images/Emoji.png"
          @tap="openEmoji"
        ></image>
      </view>
      <view v-show="!mainState.inputMessage" @tap="openFunModal">
        <image class="icon-mic" src="/static/images/ad.png"></image>
      </view>
      <button
        class="send-btn-style"
        hover-class="hover"
        @tap="sendMessage"
        v-show="mainState.inputMessage"
      >
        发送
      </button>
    </view>
  </form>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import msgType from '@/components/chat/msgtype';
import msgStorage from '@/components/chat/msgstorage';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
  },
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
  },
});
const { chatParams, chatType } = toRefs(props);
/* emits */
const $emits = defineEmits([
  'inputFocused',
  'inputBlured',
  'closeFunModal',
  'closeFunModal',
  'openEmoji',
  'openRecordModal',
  'openFunModal',
]);
const mainState = reactive({
  inputMessage: '',
  // render input 的值
  userMessage: '', // input 的实时值
  isIPX: false,
});

mainState.isIPX = getApp().globalData.isIPX;
const focus = () => {
  $emits('inputFocused', null, {
    bubbles: true,
  });
};
const blur = () => {
  $emits('inputBlured', null, {
    bubbles: true,
  });
};
const isGroupChat = () => {
  return chatType.value == msgType.chatType.CHAT_ROOM;
};

const getSendToParam = () => {
  console.log('chatParmas', chatParams);
  return isGroupChat() ? chatParams.value.groupId : chatParams.value.your;
};

const bindMessage = (e) => {
  mainState.userMessage = e.detail.value;
};
const emojiAction = (emoji) => {
  let str;
  let msglen = mainState.userMessage.length - 1;

  if (emoji && emoji != '[del]') {
    str = mainState.userMessage + emoji;
  } else if (emoji == '[del]') {
    let start = mainState.userMessage.lastIndexOf('[');
    let end = mainState.userMessage.lastIndexOf(']');
    let len = end - start;

    if (end != -1 && end == msglen && len >= 3 && len <= 4) {
      str = mainState.userMessage.slice(0, start);
    } else {
      str = mainState.userMessage.slice(0, msglen);
    }
  }
  mainState.userMessage = str;
  mainState.inputMessage = str;
};
const sendMessage = () => {
  if (mainState.userMessage.match(/^\s*$/)) return;
  let id = WebIM.conn.getUniqueId();
  let msg = new WebIM.message(msgType.TEXT, id);
  msg.set({
    msg: mainState.userMessage,
    from: WebIM.conn.user,
    to: getSendToParam(),
    // roomType: false,
    chatType: isGroupChat()
      ? msgType.chatType.GROUP_CHAT
      : msgType.chatType.SINGLE_CHAT,
    success(id, serverMsgId) {
      console.log('成功了');
      // 关闭表情弹窗
      $emits.cancelEmoji && $emits.cancelEmoji();
      $emits.closeFunModal && $emits.closeFunModal();
      disp.fire('em.chat.sendSuccess', id, mainState.userMessage);
    },
    fail(id, serverMsgId) {
      console.log('失败了');
    },
  });

  WebIM.conn.send(msg.body);
  let obj = {
    msg: msg,
    type: msgType.TEXT,
  };
  saveSendMsg(obj);
  mainState.userMessage = '';
  mainState.inputMessage = '';
  uni.hideKeyboard();
};
const saveSendMsg = (evt) => {
  msgStorage.saveMsg(evt.msg, evt.type);
};
const openEmoji = () => {
  $emits('openEmoji');
};
const openRecordModal = () => {
  $emits('openRecordModal');
};
const openFunModal = () => {
  $emits('openFunModal');
};
defineExpose({
  emojiAction,
});
</script>
<style>
@import './main.css';
</style>
