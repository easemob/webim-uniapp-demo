<template>
<view>
<view class="main">
	<chat-suit-audio id="chat-suit-audio" :username="username" :chatType="chatType" @newAudioMsg="saveSendMsg"></chat-suit-audio>

	<chat-msglist id="chat-msglist" :username="username" @msglistTap="normalScroll"></chat-msglist>
</view>
	<chat-inputbar id="chat-inputbar" :username="username" :chatType="chatType" @newTextMsg="saveSendMsg" @newImageMsg="saveSendMsg" @newLocationMsg="saveSendMsg" @newVideoMsg="saveSendMsg" @tapSendAudio="toggleRecordModal" @inputFocused="shortScroll" @inputBlured="normalScroll"></chat-inputbar>
</view>
</template>

<script>
let msgStorage = require("./msgstorage");
let msgType = require("./msgtype");
import chatMsglist from "./msglist/msglist";
import chatInputbar from "./inputbar/inputbar";
import chatSuitAudio from "./inputbar/suit/audio/audio";

export default {
  data() {
    return {
      __comps__: {
        msglist: null,
        inputbar: null,
        audio: null
      }
    };
  },

  components: {
    chatMsglist,
    chatInputbar,
    chatSuitAudio
  },
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
  created() {},

  beforeMount() {},

  mounted() {
    this.$data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
    this.$data.__comps__.msglist = this.selectComponent("#chat-msglist");
    this.$data.__comps__.audio = this.selectComponent("#chat-suit-audio");
  },

  moved() {},

  destroyed() {},

  methods: {
    toggleRecordModal() {
      this.$data.__comps__.audio.toggleRecordModal();
    },

    normalScroll() {
      this.$data.__comps__.msglist.normalScroll();

      this.$data.__comps__.inputbar.cancelEmoji();
    },

    shortScroll() {
      this.$data.__comps__.msglist.shortScroll();
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.detail.msg, evt.detail.type);

      this.$data.__comps__.inputbar.cancelEmoji();
    },

    getMore() {
      this.selectComponent('#chat-msglist').getHistoryMsg();
    }

  }
};
</script>
<style>
@import "./chat.css";
</style>