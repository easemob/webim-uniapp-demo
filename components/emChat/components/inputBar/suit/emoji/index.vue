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
          v-for="(item, key, index) in emojiState.emojiObj.map1"
          :key="key + index"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiState.emojiObj.map2"
          :key="key + index"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiState.emojiObj.map3"
          :key="(key, index)"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
    </swiper-item>
    <swiper-item>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiState.emojiObj.map4"
          :key="key + index"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiState.emojiObj.map5"
          :key="key + index"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item last_item">
        <image
          v-for="(item, key, index) in emojiState.emojiObj.map6"
          :key="key + index"
          :src="`${emojiState.emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
    </swiper-item>
  </swiper>
</template>

<script setup>
import { reactive } from 'vue';
/* EaseIM */
import { EMOJI, EMOJIOBJ } from '@/EaseIM/constant';
let EMOJI_STATUS = {
  OPENED: 'showEmoji',
  CLOSED: 'emoji_list',
};
/* emits */
const emits = defineEmits(['appendEmojiMapString', 'deleteEmojiMapString']);
const emojiState = reactive({
  show: EMOJI_STATUS.CLOSED,
  emoji: EMOJI,
  emojiObj: EMOJIOBJ,
  interval: 5000,
  duration: 1000,
  autoplay: false,
  indicatorDots: false, // 显示面板指示点
});
const openEmoji = () => {
  emojiState.show = EMOJI_STATUS.OPENED;
};
const cancelEmoji = () => {
  emojiState.show = EMOJI_STATUS.CLOSED;
};
// 输出 emoji
const pickedTheEmoji = (emoji) => {
  if (emoji === '[del]') {
    emits('deleteEmojiMapString');
  } else {
    emits('appendEmojiMapString', emoji);
  }
};
defineExpose({
  openEmoji,
  cancelEmoji,
});
</script>
<style>
@import './index.css';
</style>
