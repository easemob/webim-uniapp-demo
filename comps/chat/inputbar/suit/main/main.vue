<template>
  <!-- <chat-suit-emoji id="chat-suit-emoji" bind:newEmojiStr="emojiAction"></chat-suit-emoji> -->
  <form class="text-input">
    <!-- <view class="f-row"> -->
    <input
      class="f news"
      type="text"
      cursor-spacing="65"
      confirm-type="send"
      v-model="changeValue"
      @confirm="sendMessage"
      @input="bindMessage"
      @tap="focus"
      @focus="focus"
      @blur="blur"
      :confirm-hold="isIPX?true:false"
      placeholder="输入新消息"
      placeholder-style="color:#CFCFCF ;padding-left:5px"
    >

    <!-- 	</view> -->
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
      changeValue: "",
      isIPX:false
    };
  },

  components: {},
  props: {
    username: {
      type: Object,
      default: () => ({})
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT
    }
  },

  // lifetimes
  created() {
     this.setData({
      isIPX: getApp().globalData.isIPX
    });
  },

  beforeMount() {},

  moved() {},

  destroyed() {},

  mounted() {},

  methods: {
    focus() {
      this.$emit("inputFocused", null, {
        bubbles: true
      });
    },
    blur() {
      this.$emit("inputBlured", null, {
        bubbles: true
      });
    },

    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    // bindinput 不能打冒号！
    bindMessage(e) {
      this.setData({
        userMessage: e.detail.value
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

      this.setData({
        userMessage: str,
        inputMessage: str
      });
    },

    sendMessage() {
      let me = this;
      String.prototype.trim = function() {
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
        roomType: false,
        chatType: this.chatType,
        success(id, serverMsgId) {
          console.log("成功了");
          me.changeValue=""
          me.userMessage=""
          disp.fire("em.chat.sendSuccess", id, me.userMessage);
        },
        fail(id, serverMsgId) {
          console.log("失败了");
        }
      });
      if (this.chatType == msgType.chatType.CHAT_ROOM) {
        msg.setGroup("groupchat");
      }
      WebIM.conn.send(msg.body);
      let obj = {
        msg: msg,
        type: msgType.TEXT
      };
      this.saveSendMsg(obj);
    },
    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    }
  }
};
</script>
<style>
@import "./main.css";
</style>