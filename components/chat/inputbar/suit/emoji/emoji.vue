<template>
  <swiper
    :class="emojiState.show"
    :indicator-dots="emojiState.indicatorDots"
    :autoplay="emojiState.autoplay"
    :interval="emojiState.interval"
    :duration="emojiState.duration"
  >
    <swiper-item>
      <view class="emoji_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map1"
          :key="index"
          :src="`../../../../${emojiState.emojiObj.path}${item}`"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map2"
          :key="index"
          :src="'../../../../' + emojiState.emojiObj.path + item"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map3"
          :key="index"
          :src="'../../../../' + emojiState.emojiObj.path + item"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
    </swiper-item>
    <swiper-item>
      <view class="emoji_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map4"
          :key="index"
          :src="'../../../../' + emojiState.emojiObj.path + item"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map5"
          :key="index"
          :src="'../../../../' + emojiState.emojiObj.path + item"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
      <view class="emoji_item last_item">
        <image
          v-for="(item, index) in emojiState.emojiObj.map6"
          :key="index"
          :src="'../../../../' + emojiState.emojiObj.path + item"
          @tap="sendEmoji"
          :data-emoji="index"
        ></image>
      </view>
    </swiper-item>
  </swiper>
</template>

<script setup>
import { reactive } from 'vue';
import msgType from '@/components/chat/msgtype';
const WebIM = uni.WebIM;
let EMOJI_STATUS = {
  OPENED: 'showEmoji',
  CLOSED: 'emoji_list',
};
/* emits */
const $emits = defineEmits(['newEmojiStr']);
const emojiState = reactive({
  show: EMOJI_STATUS.CLOSED,
  emoji: WebIM.Emoji,
  emojiObj: WebIM.EmojiObj,
  interval: 5000,
  duration: 1000,
  autoplay: false,
  indicatorDots: true, // 显示面板指示点
});

const openEmoji = () => {
  emojiState.show = EMOJI_STATUS.OPENED;
};
const cancelEmoji = () => {
  emojiState.show = EMOJI_STATUS.CLOSED;
};
// 输出 emoji
const sendEmoji = (event) => {
  var emoji = event.target.dataset.emoji;
  $emits(
    'newEmojiStr',
    {
      msg: emoji,
      type: msgType.EMOJI,
    },
    {
      bubbles: true,
      composed: true,
    }
  );
};
defineExpose({
  openEmoji,
  cancelEmoji,
});
</script>
<style>
@import './emoji.css';
</style>
