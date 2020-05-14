<template>
<view class="room_bar">
	<!-- <chatSuitEmoji ref="chatSuitEmoji" @newEmojiStr="emojiAction"></chatSuitEmoji> -->
	<chatSuitMain ref="chatSuitMain" :username="username" :chatType="chatType" @inputFocused="cancelEmoji"></chatSuitMain>
	<chatSuitImage ref="chatSuitImage" :username="username" :chatType="chatType"></chatSuitImage>
	<!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
	<!-- <chat-suit-video id="chat-suit-video" username="{{ username }}"></chat-suit-video> -->
	
	<view :class="'other_func ' + (isIPX? 'other_func_X': '')">
		<!-- <view class="open_emoji" bind:tap="openEmoji">
			<image src="/static/images/Emoji.png"/>
		</view> -->
		<view class="v-record" @tap="toggleRecordModal">
			<image class="icon-record" :src="recordStatus != RecordStatus.HIDE ? '../../../static/images/iconAudioActive@2x.png' : '../../../static/images/voice.png'" style="width:16px; height: 18px"></image>
		</view>
		<view class="open_camera" @tap="openCamera">
			<image src="/static/images/camora.png" style="width:24px; height: 18px"></image>
		</view>
		<view class="send_image" @tap="sendImage">
			<image src="/static/images/pic.png" style="height:20px; width: 20px"></image>
		</view>
		<!-- <view class="send_image" bind:tap="sendLocation">
			<image src="../../../static/images/iconLocation@2x.png" style="height:18px;"/>
		</view> -->
	</view>
</view>
</template>

<script>
let RecordStatus = require("./suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");
// import chatSuitEmoji from "./suit/emoji/emoji";
import chatSuitImage from "./suit/image/image";
import chatSuitLocation from "./suit/location/location";
import chatSuitMain from "./suit/main/main";

export default {
  data() {
    return {
      recordStatus: RecordStatus.HIDE,
      RecordStatus,
      __comps__: {
        main: null,
        emoji: null,
        image: null,
        location: null //video: null,

      },
      isIPX: ""
    };
  },

  components: {
    // chatSuitEmoji,
    chatSuitImage,
    chatSuitLocation,
    chatSuitMain
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

  moved() {},

  destroyed() {},

  mounted() {
    this.setData({
      isIPX: getApp().globalData.isIPX
    });
    // let comps = this.$data.__comps__;
    // comps.main = this.selectComponent("#chatSuitMain");
    // comps.emoji = this.selectComponent("#chatSuitEmoji");
    // comps.image = this.selectComponent("#chatSuitImage"); 
  },

  methods: {
    // 事件有长度限制：仅限 26 字符
    toggleRecordModal() {
      this.$emit("tapSendAudio", null, {
        bubbles: true,
        composed: true
      });
    },

    // sendVideo(){
    // 	this.data.__comps__.video.sendVideo();
    // },
    openCamera() {
      // this.__comps__.image.openCamera()
       this.$refs.chatSuitImage.openCamera();
    },

    openEmoji() {
      // this.__comps__.emoji.openEmoji();
       this.$refs.chatSuitEmoji.openEmoji();
    },

    cancelEmoji() {
      // this.__comps__.emoji.cancelEmoji();
      // this.$refs.chatSuitEmoji.cancelEmoji();
    },

    sendImage() {
      // this.__comps__.image.sendImage();
      this.$refs.chatSuitImage.sendImage();
    },

    sendLocation() {// this.data.__comps__.location.sendLocation();
    },

    emojiAction(evt) {
      // this.__comps__.main.emojiAction(evt.detail.msg);
       this.$refs.chatSuitMain.emojiAction(evt.detail.msg);
    }

  }
};
</script>
<style>
@import "./inputbar.css";
</style>