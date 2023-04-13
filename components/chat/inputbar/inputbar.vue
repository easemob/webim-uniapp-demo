<template>
  <view class="room_bar">
    <chatSuitEmoji
      ref="chatSuitEmojiComp"
      @newEmojiStr="emojiAction"
    ></chatSuitEmoji>
    <chatSuitMain
      ref="chatSuitMainComp"
      :chatParams="chatParams"
      :chatType="chatType"
      @inputFocused="closeAllModal"
      @openEmoji="openEmoji"
      @openRecordModal="toggleRecordModal"
      @openFunModal="openFunModal"
      @cancelEmoji="cancelEmoji"
      @closeFunModal="closeFunModal"
    ></chatSuitMain>
    <chatSuitImage
      ref="chatSuitImageComp"
      :chatParams="chatParams"
      :chatType="chatType"
    ></chatSuitImage>
    <!-- <chat-suit-location id="chat-suit-location" chatParams="{{ chatParams }}"></chat-suit-location> -->
    <!-- <chat-suit-video ref="chatSuitVideo" :chatParams="chatParams"></chat-suit-video> -->
    <view v-if="inputbarState.showFunModal" :class="'showFunModal'">
      <view
        :class="'other_func ' + (inputbarState.isIPX ? 'other_func_X' : '')"
      >
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
          <chatSuitAttach
            :chatParams="chatParams"
            :chatType="chatType"
            @closeAllModal="closeAllModal"
          >
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
        <view class="menu_wrap">
          <view class="account_box" @tap="openUserCardModal">
            <image src="/static/images/pic.png"></image>
          </view>
          用户名片
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

          <view class="v-record" @tap="callVideo" v-if="chatParams.groupId">
            <image
              src="/static/images/call2x.png"
              style="height: 24px; width: 15px"
            />
          </view> -->
      </view>
    </view>

    <chatUserCard
      ref="chatUserCardComp"
      :chatParams="chatParams"
      :chatType="chatType"
      @closeFunModal="closeFunModal"
    />
  </view>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { RecordStatus } from './suit/audio/record_status';
import msgType from '../msgtype';
import chatSuitEmoji from './suit/emoji/emoji';
import chatSuitImage from './suit/image/image';
// import chatSuitLocation from './suit/location/location';
import chatSuitMain from './suit/main/main';
import chatSuitAttach from './suit/attach';
import chatUserCard from './suit/userCard/userCard';
// import chatSuitVideo from "./suit/videoComp/videoComp"

let FUNMODAL_STATUS = {
  OPENED: 'showFunModal',
  CLOSED: 'fun_list',
};
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
    required: true,
  },
});
const { chatParams, chatType } = toRefs(props);
/* emits */
const $emits = defineEmits(['tapSendAudio']);
const inputbarState = reactive({
  recordStatus: RecordStatus.HIDE,
  RecordStatus,
  __comps__: {
    main: null,
    emoji: null,
    image: null,
    location: null,
    video: null,
  },
  isIPX: '',
  showFunModal: false,
});
onLoad(() => {
  inputbarState.isIPX = false;
});
// 事件有长度限制：仅限 26 字符
const toggleRecordModal = () => {
  $emits('tapSendAudio', null, {
    bubbles: true,
    composed: true,
  });
};
const chatSuitEmojiComp = ref(null);
const openEmoji = () => {
  setTimeout(() => {
    inputbarState.showFunModal = false;
  }, 100);
  chatSuitEmojiComp.value.openEmoji();
};
const cancelEmoji = () => {
  chatSuitEmojiComp.value.cancelEmoji();
};
const chatSuitImageComp = ref(null);
const openCamera = () => {
  chatSuitImageComp.value.openCamera();
};

const sendImage = () => {
  chatSuitImageComp.value.sendImage();
};
const chatSuitMainComp = ref(null);
const emojiAction = (evt) => {
  chatSuitMainComp.value.emojiAction(evt.msg);
};
const openFunModal = () => {
  inputbarState.showFunModal = true;
  cancelEmoji();
};
const closeFunModal = () => {
  inputbarState.showFunModal = false;
  cancelEmoji();
};
const closeAllModal = () => {
  cancelEmoji();
  closeFunModal();
};
const edit_group = () => {
  const nameList = {
    myName: chatParams.value.myName,
    groupName: chatParams.value.your,
    roomId: chatParams.value.groupId,
  };
  console.log('>>>>>群信息', nameList);
  uni.navigateTo({
    url: '../groupSetting/groupSetting?groupInfo=' + JSON.stringify(nameList),
  });
};
//打开用户卡片选择
const chatUserCardComp = ref(null);
const openUserCardModal = () => {
  console.log('>>>>>>>openUserCardModal');
  chatUserCardComp.value.showModal = true;
};

defineExpose({
  cancelEmoji,
  closeFunModal,
  toggleRecordModal,
});
</script>
<style>
@import './inputbar.css';
</style>
