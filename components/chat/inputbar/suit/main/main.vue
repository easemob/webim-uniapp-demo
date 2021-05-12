<template>
  <!-- <chat-suit-emoji id="chat-suit-emoji" bind:newEmojiStr="emojiAction"></chat-suit-emoji> -->
  <form class="text-input">
    <view :class="isIPX ?'f-row-x' :'f-row'">
      <!-- 发送语音 -->
      <view>
        <image class="icon-mic" src="/static/images/voice.png" @tap="openRecordModal"></image>
      </view>
      <!-- 输入框 -->
      <textarea
        class="f news"
        type="text"
        cursor-spacing="65"
        confirm-type='done'
        v-model="inputMessage"
        @confirm="sendMessage"
        @input="bindMessage"
        @tap="focus"
        @focus="focus"
        @blur="blur"
        :confirm-hold="isIPX ? true : false"
        auto-height
        :show-confirm-bar='false'
        maxlength="300"
      />
      <view>
        <image class="icon-mic" src="/static/images/Emoji.png" @tap="openEmoji"></image>
      </view>
      <view v-show="!inputMessage" @tap="openFunModal">
        <image class="icon-mic" src="/static/images/ad.png"></image>
      </view>
       <button 
        class="send-btn-style" 
        hover-class='hover'
        @tap="sendMessage"
        v-show="inputMessage" 
      >发送</button>
    </view>
  </form>
</template>

<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
let msgStorage = require("../../../msgstorage");

export default {
  data() {
    return {
      inputMessage: "",
      // render input 的值
      userMessage: "", // input 的实时值
      isIPX: false,
    };
  },

  components: {},
  props: {
    username: {
      type: Object,
      default: () => ({}),
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT,
    },
  },

  // lifetimes
  created() {
    this.setData({
      isIPX: getApp().globalData.isIPX,
    });
  },

  beforeMount() {},

  moved() {},

  destroyed() {},

  mounted() {},

  methods: {
    focus() {
      this.$emit("inputFocused", null, {
        bubbles: true,
      });
    },
    blur() {
      this.$emit("inputBlured", null, {
        bubbles: true,
      });
    },

    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    bindMessage(e) {
      this.setData({
        userMessage: e.detail.value,
      });
    },

    emojiAction(emoji) {
      var str;
      var msglen = this.userMessage.length - 1;

      if (emoji && emoji != "[del]") {
        str = this.userMessage + emoji;
      } else if (emoji == "[del]") {
        let start = this.userMessage.lastIndexOf("[");
        let end = this.userMessage.lastIndexOf("]");
        let len = end - start;

        if (end != -1 && end == msglen && len >= 3 && len <= 4) {
          str = this.userMessage.slice(0, start);
        } else {
          str = this.userMessage.slice(0, msglen);
        }
      }
      this.userMessage = str;
      this.inputMessage = str;
    },

    sendMessage() {
      let me = this;
      String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
      };
      if (!this.userMessage.trim()) {
        return;
      }
      let id = WebIM.conn.getUniqueId();
      let msg = new WebIM.message(msgType.TEXT, id);
      msg.set({
        msg: this.userMessage,
        from: this.username.myName,
        to: this.getSendToParam(),
        // roomType: false,
        chatType: this.chatType,
        success(id, serverMsgId) {
          console.log("成功了");
          // 关闭表情弹窗
          me.$parent.cancelEmoji()
          me.$parent.closeFunModal()
          disp.fire("em.chat.sendSuccess", id, me.userMessage);
        },
        fail(id, serverMsgId) {
          console.log("失败了");
        },
      });
	  
      if (this.chatType == msgType.chatType.CHAT_ROOM) {
        // msg.setGroup("groupchat");
		msg.setChatType("groupchat");
      }
        WebIM.conn.send(msg.body);
        let obj = {
          msg: msg,
          type: msgType.TEXT,
        };
        this.saveSendMsg(obj);
      this.userMessage = "";
      this.inputMessage = "";
      uni.hideKeyboard();
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    },

    openEmoji(){
      this.$emit('openEmoji')
    },
    openRecordModal(){
      this.$emit('openRecordModal')
    },
    openFunModal(){
      this.$emit('openFunModal')
    }
  },
};
</script>
<style>
@import "./main.css";
</style>