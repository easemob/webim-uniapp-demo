<template>
  <view class="room_bar">
    <chatSuitEmoji
      ref="chatSuitEmoji"
      @newEmojiStr="emojiAction"
    ></chatSuitEmoji>
    <chatSuitMain
      ref="chatSuitMain"
      :username="username"
      :chatType="chatType"
      @inputFocused="closeAllModal"
      @openEmoji="openEmoji"
      @openRecordModal="toggleRecordModal"
      @openFunModal="openFunModal"
    ></chatSuitMain>
    <chatSuitImage
      ref="chatSuitImage"
      :username="username"
      :chatType="chatType"
    ></chatSuitImage>
    <!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
    <!-- <chat-suit-video ref="chatSuitVideo" :username="username"></chat-suit-video> -->
    <chatSuitPtopcall
      ref="chatSuitPtopcall"
      :chatType="chatType"
      @makeVideoCall="onMakeVideoCall"
    >
    </chatSuitPtopcall>

    <swiper
      :class="showFunModal"
      :indicator-dots="true"
      :autoplay="false"
      :interval="5000"
      :duration="1000"
    >
      <swiper-item>
        <view :class="'other_func ' + (isIPX ? 'other_func_X' : '')">
          <view class="open_camera" @tap="openCamera">
            <image src="/static/images/camora.png"></image>
            相机
          </view>
          <view class="menu_wrap" @tap="sendImage">
            <image src="/static/images/pic.png"></image>
            相册
          </view>
          <!-- #ifdef APP-PLUS -->
          <view class="menu_wrap">
            <chatSuitAttach :username="username" :chatType="chatType">
              <image
                style="background-color: #fff"
                src="/static/images/file.png"
              ></image>
              附件
            </chatSuitAttach>
          </view>
          <!-- #endif -->
          <view
            class="menu_wrap"
            @tap="edit_group"
            v-show="chatType === 'chatRoom'"
          >
            <image src="/static/images/pic.png"></image>
            群信息
          </view>

          <!-- <view class="menu_wrap" @tap="sendVideo">
            <image
              src="/static/images/video.png"
              style="height: 20px; width: 20px"
            ></image>
          </view>
          <view class="menu_wrap" bind:tap="sendLocation">
            <image
              src="../../../static/images/iconLocation2x.png"
              style="height: 18px"
            />
          </view>

          <view class="v-record" @tap="callVideo" v-if="username.groupId">
            <image
              src="/static/images/call2x.png"
              style="height: 24px; width: 15px"
            />
          </view> -->
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
let RecordStatus = require("./suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");
import chatSuitEmoji from "./suit/emoji/emoji";
import chatSuitImage from "./suit/image/image";
import chatSuitLocation from "./suit/location/location";
import chatSuitMain from "./suit/main/main";
import chatSuitPtopcall from "./suit/ptopcall/ptopcall.vue";
import chatSuitAttach from "./suit/attach";

// import chatSuitVideo from "./suit/videoComp/videoComp"

let FUNMODAL_STATUS = {
  OPENED: "showFunModal",
  CLOSED: "fun_list"
};

export default {
  data() {
    return {
      recordStatus: RecordStatus.HIDE,
      RecordStatus,
      __comps__: {
        main: null,
        emoji: null,
        image: null,
        location: null,
        video: null
      },
      isIPX: "",
      showFunModal: FUNMODAL_STATUS.CLOSED
    };
  },

  components: {
    chatSuitEmoji,
    chatSuitImage,
    chatSuitLocation,
    chatSuitMain,
    chatSuitPtopcall,
    chatSuitAttach
    // chatSuitVideo
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

  onLoad() {
    this.setData({
      isIPX: false //getApp().globalData.isIPX
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
    // 	this.$refs.chatSuitVideo.sendVideo();
    // },
    openCamera() {
      this.$refs.chatSuitImage.openCamera();
    },

    openEmoji() {
      setTimeout(() => {
        this.setData({
          showFunModal: FUNMODAL_STATUS.CLOSED
        });
      }, 100);
      this.$refs.chatSuitEmoji.openEmoji();
    },

    cancelEmoji() {
      this.$refs.chatSuitEmoji.cancelEmoji();
    },

    sendImage() {
      this.$refs.chatSuitImage.sendImage();
    },

    sendLocation() {
      // this.data.__comps__.location.sendLocation();
    },

    emojiAction(evt) {
      this.$refs.chatSuitMain.emojiAction(evt.msg);
    },

    callVideo() {
      this.$refs.chatSuitPtopcall.show();
    },

    onMakeVideoCall() {
      console.log("onMakeVideoCall -> inputbar");
      this.$emit("makeVideoCall", null, "single");
    },

    openFunModal() {
      this.setData({
        showFunModal: FUNMODAL_STATUS.OPENED
      });
      this.cancelEmoji();
    },
    closeFunModal() {
      this.setData({
        showFunModal: FUNMODAL_STATUS.CLOSED
      });
      this.cancelEmoji();
    },
    closeAllModal() {
      this.cancelEmoji();
      this.closeFunModal();
    },
    edit_group() {
      var nameList = {
        myName: this.username.myName,
        groupName: this.username.your,
        roomId: this.username.groupId
      };
      uni.navigateTo({
        url:
          "../groupSetting/groupSetting?groupInfo=" + JSON.stringify(nameList)
      });
    }
  }
};
</script>
<style>
@import "./inputbar.css";
</style>
