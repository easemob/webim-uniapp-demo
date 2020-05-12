<template>
  <view>
    <view class="main">
      <chatSuitAudio
        ref="chatSuitAudio"
        :username="username"
        :chatType="chatType"
        @newAudioMsg="saveSendMsg"
      ></chatSuitAudio>

      <chatMsglist ref="chatMsglist" :username="username" @msglistTap="normalScroll" id="chat-msglist"></chatMsglist>
    </view>
    <chatInputbar
      ref="chatInputbar"
      :username="username"
      :chatType="chatType"
      @newTextMsg="saveSendMsg"
      @newImageMsg="saveSendMsg"
      @newLocationMsg="saveSendMsg"
      @newVideoMsg="saveSendMsg"
      @tapSendAudio="toggleRecordModal"
      @inputFocused="shortScroll"
      @inputBlured="normalScroll"
    ></chatInputbar>
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
    // this.$data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
    // this.$data.__comps__.msglist = this.selectComponent("#chat-msglist");
    // this.$data.__comps__.audio = this.selectComponent("#chat-suit-audio");
  },

  moved() {},

  destroyed() {},

  methods: {
    toggleRecordModal() {
      // this.$data.__comps__.audio.toggleRecordModal();
      this.$refs.chatSuitAudio.toggleRecordModal();
    },

    normalScroll() {
      // this.$data.__comps__.msglist.normalScroll();

      // this.$data.__comps__.inputbar.cancelEmoji();

      this.$refs.chatMsglist.normalScroll();
      this.$refs.chatInputbar.cancelEmoji();
    },

    shortScroll() {
      // this.$data.__comps__.msglist.shortScroll();

      this.$refs.chatMsglist.shortScroll();
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.detail.msg, evt.detail.type);

      // this.$data.__comps__.inputbar.cancelEmoji();
      this.$refs.chatInputbar.cancelEmoji();
    },

    getMore() {
      this.selectComponent("#chat-msglist").$vm.getHistoryMsg()
    }
  }
};
</script>
<style>
@import "./chat.css";
</style>