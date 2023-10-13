<template>
  <view class="input_bar_container">
    <input-audio ref="inputAudioComp" />
    <input-main
      ref="inputMainComp"
      @toggleRecordModal="toggleRecordModal"
      @openEmojiModal="openEmojiModal"
      @closeEmojiModal="closeEmojiModal"
      @openFunModal="openFunModal"
      @closeAllModal="closeAllModal"
    />
    <input-emoji
      ref="inputEmojiComp"
      @appendEmojiMapString="appendEmojiMapString"
      @deleteEmojiMapString="deleteEmojiMapString"
    />
    <input-image ref="inputImageComp" @closeAllModal="closeAllModal" />
    <!-- 更多功能 -->
    <view v-if="isShowFunModal" :class="'showFunModal'">
      <view :class="'other_func'">
        <view class="open_camera" @click="openCamera">
          <image src="/static/images/camora.png"></image>
          相机
        </view>
        <view class="menu_wrap" @click="openPhotoAlbum">
          <image src="/static/images/pic.png"></image>
          相册
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="menu_wrap">
          <input-attach
            :chatParams="chatParams"
            :chatType="chatType"
            @closeAllModal="closeAllModal"
          >
            <image
              style="background-color: #fff"
              src="/static/images/file.png"
            ></image>
            附件
          </input-attach>
        </view>
        <!-- #endif -->
        <view
          class="menu_wrap"
          @tap="edit_group"
          v-show="IchatType === 'groupChat'"
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
      </view>
    </view>
  </view>
</template>

<script>
import InputAudio from './suit/audio/audio.vue';
import InputMain from './suit/main/main';
import InputEmoji from './suit/emoji/emoji';
import InputImage from './suit/image/image';
export default {
  inject: ['targetId', 'chatType'],
  components: {
    InputAudio,
    InputMain,
    InputEmoji,
    InputImage,
  },
  data() {
    return {
      //
      isShowFunModal: false,
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
    toggleRecordModal() {
      this.$refs.inputAudioComp.toggleRecordModal();
    },
    //emoji输入相关
    openEmojiModal() {
      this.$refs.inputEmojiComp.openEmoji();
      if (this.isShowFunModal) {
        this.closeFunModal();
      }
    },
    closeEmojiModal() {
      this.$refs.inputEmojiComp.cancelEmoji();
    },
    appendEmojiMapString(emoji) {
      if (!emoji) return;
      this.$refs.inputMainComp.inputMessage =
        this.$refs.inputMainComp.inputMessage + emoji;
    },
    deleteEmojiMapString() {
      this.$refs.inputMainComp.delEmojiMapString();
    },
    /* 更多功能相关 */
    openFunModal() {
      console.log('>>>>打开更多功能');
      this.isShowFunModal = true;
      this.closeEmojiModal();
    },
    closeFunModal() {
      this.isShowFunModal = false;
    },
    closeAllModal() {
      this.closeEmojiModal();
      this.closeFunModal();
    },
    //点击拍照
    openCamera() {
      this.$refs.inputImageComp.openCamera();
    },
    //从相册选择
    openPhotoAlbum() {
      this.$refs.inputImageComp.openPhotoAlbum();
    },
    //用户卡片相关
    openUserCardModal() {
      console.log('>>>>执行打开好友卡片页面');
      uni.navigateTo({
        url: `../emChatContainer/selectUserCard/index?targetId=${this.ItargetId}&chatType=${this.IchatType}`,
      });
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
