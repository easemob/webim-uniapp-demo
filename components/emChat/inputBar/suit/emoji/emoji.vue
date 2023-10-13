<template>
  <swiper
    :class="show"
    :indicator-dots="indicatorDots"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
  >
    <swiper-item>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiObj.map1"
          :key="key + index"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiObj.map2"
          :key="key + index"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiObj.map3"
          :key="(key, index)"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
    </swiper-item>
    <swiper-item>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiObj.map4"
          :key="key + index"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item">
        <image
          v-for="(item, key, index) in emojiObj.map5"
          :key="key + index"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
      <view class="emoji_item last_item">
        <image
          v-for="(item, key, index) in emojiObj.map6"
          :key="key + index"
          :src="`${emojiObj.path}/${item}`"
          @click="pickedTheEmoji(key)"
        ></image>
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
import { EMOJI, EMOJIOBJ } from '@/EaseIM/constant';
let EMOJI_STATUS = {
  OPENED: 'showEmoji',
  CLOSED: 'emoji_list',
};
export default {
  data() {
    return {
      show: EMOJI_STATUS.CLOSED,
      emoji: EMOJI,
      emojiObj: EMOJIOBJ,
      interval: 5000,
      duration: 1000,
      autoplay: false,
      indicatorDots: true, // 显示面板指示点
    };
  },

  components: {},
  props: {},
  methods: {
    openEmoji() {
      this.show = EMOJI_STATUS.OPENED;
    },

    cancelEmoji() {
      this.show = EMOJI_STATUS.CLOSED;
    },
    // 输出 emoji
    pickedTheEmoji(emoji) {
      if (emoji === '[del]') {
        this.$emit('deleteEmojiMapString');
      } else {
        this.$emit('appendEmojiMapString', emoji);
      }
    },
    // 输出 emoji
    // sendEmoji(event) {
    //   var emoji = event.target.dataset.emoji;
    //   this.$emit(
    //     'newEmojiStr',
    //     {
    //       msg: emoji,
    //       type: msgType.EMOJI,
    //     },
    //     {
    //       bubbles: true,
    //       composed: true,
    //     }
    //   );
    // },
  },
};
</script>
<style>
@import './emoji.css';
</style>
