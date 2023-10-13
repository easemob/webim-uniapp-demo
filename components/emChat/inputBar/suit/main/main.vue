<template>
  <form class="text-input">
    <view :class="isIPX ? 'f-row-x' : 'f-row'">
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
        v-model.trim="inputMessage"
        @confirm="sendTextMessage"
        @focus="inputFocus"
        :confirm-hold="isIPX ? true : false"
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
      <view v-show="!inputMessage" @tap="openFunModal">
        <image class="icon-mic" src="/static/images/ad.png"></image>
      </view>
      <button
        class="send-btn-style"
        hover-class="hover"
        @tap="sendTextMessage"
        v-show="inputMessage"
      >
        发送
      </button>
    </view>
  </form>
</template>

<script>
import { emMessages } from '@/EaseIM/emApis';
const { sendDisplayMessages } = emMessages();
export default {
  inject: ['targetId', 'chatType'],
  data() {
    return {
      inputMessage: '',
      // render input 的值
      userMessage: '', // input 的实时值
      isIPX: false,
    };
  },
  computed: {
    /* inject */
    ItargetId() {
      return this.targetId();
    },
    IchatType() {
      return this.chatType();
    },
  },
  methods: {
    inputFocus() {
      console.log('>>>>输入框聚焦');
      this.$emit('closeAllModal');
    },
    //删除输入内容中的emojiMapStr
    delEmojiMapString() {
      if (!this.inputMessage) return;
      let newInputContent = '';
      let inputContentlength = this.inputMessage.length - 1;
      let start = this.inputMessage.lastIndexOf('[');
      let end = this.inputMessage.lastIndexOf(']');
      let len = end - start;

      if (end != -1 && end == inputContentlength && len >= 3 && len <= 4) {
        newInputContent = this.inputMessage.slice(0, start);
      } else {
        newInputContent = this.inputMessage.slice(0, inputContentlength);
      }
      this.inputMessage = newInputContent;
    },
    // emojiAction(emoji) {
    //   var str;
    //   var msglen = this.userMessage.length - 1;

    //   if (emoji && emoji != '[del]') {
    //     str = this.userMessage + emoji;
    //   } else if (emoji == '[del]') {
    //     let start = this.userMessage.lastIndexOf('[');
    //     let end = this.userMessage.lastIndexOf(']');
    //     let len = end - start;

    //     if (end != -1 && end == msglen && len >= 3 && len <= 4) {
    //       str = this.userMessage.slice(0, start);
    //     } else {
    //       str = this.userMessage.slice(0, msglen);
    //     }
    //   }
    //   this.userMessage = str;
    //   this.inputMessage = str;
    // },

    // sendMessage() {
    //   let me = this;
    //   String.prototype.trim = function () {
    //     return this.replace(/(^\s*)|(\s*$)/g, '');
    //   };
    //   if (!this.userMessage.trim()) {
    //     return;
    //   }
    //   let id = WebIM.conn.getUniqueId();
    //   let msg = new WebIM.message(msgType.TEXT, id);
    //   msg.set({
    //     msg: this.userMessage,
    //     from: this.username.myName,
    //     to: this.getSendToParam(),
    //     // roomType: false,
    //     chatType: this.chatType,
    //     success(id, serverMsgId) {
    //       console.log('成功了');
    //       // 关闭表情弹窗
    //       me.$parent.cancelEmoji();
    //       me.$parent.closeFunModal();
    //       disp.fire('em.chat.sendSuccess', id, me.userMessage);
    //     },
    //     fail(id, serverMsgId) {
    //       console.log('失败了');
    //     },
    //   });

    //   if (this.chatType == msgType.chatType.CHAT_ROOM) {
    //     // msg.setGroup("groupchat");
    //     msg.setChatType('groupchat');
    //   }
    //   WebIM.conn.send(msg.body);
    //   let obj = {
    //     msg: msg,
    //     type: msgType.TEXT,
    //   };
    //   this.saveSendMsg(obj);
    //   this.userMessage = '';
    //   this.inputMessage = '';
    //   uni.hideKeyboard();
    // },
    async sendTextMessage() {
      const params = {
        // 消息类型。
        type: 'txt',
        // 消息内容。
        msg: this.inputMessage,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.ItargetId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.IchatType,
      };
      try {
        const res = await sendDisplayMessages({ ...params });
        this.$emit('closeAllModal');
        console.log('>>>>>文本消息发送成功', res);
      } catch (error) {
        console.log('>>>>>文本消息发送失败', error);
        uni.showToast({
          title: '消息发送失败',
          icon: 'none',
        });
      } finally {
        this.inputMessage = '';
        uni.hideKeyboard();
      }
    },
    openEmoji() {
      this.$emit('openEmojiModal');
    },
    openRecordModal() {
      this.$emit('toggleRecordModal');
    },
    openFunModal() {
      this.$emit('openFunModal');
    },
  },
};
</script>
<style>
@import './main.css';
</style>
