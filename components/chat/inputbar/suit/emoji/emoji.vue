<template>
<swiper :class="show" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
	<block>
		<swiper-item>
			<view class="emoji_item">
				<image v-for="(item, index) in emojiObj.map1" :key="index" :src="'../../../../' + emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
			<view class="emoji_item">
				<image v-for="(item, index) in emojiObj.map2" :key="index" :src="'../../../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
			<view class="emoji_item">
				<image v-for="(item, index) in emojiObj.map3" :key="index" :src="'../../../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
		</swiper-item>
	</block>
	<block class="second">
		<swiper-item>
			<view class="emoji_item">
				<image v-for="(item, index) in emojiObj.map4" :key="index" :src="'../../../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
			<view class="emoji_item">
				<image v-for="(item, index) in emojiObj.map5" :key="index" :src="'../../../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
			<view class="emoji_item last_item">
				<image v-for="(item, index) in emojiObj.map6" :key="index" :src="'../../../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
			</view>
		</swiper-item>
	</block>
</swiper>
</template>

<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let EMOJI_STATUS = {
  OPENED: "showEmoji",
  CLOSED: "emoji_list"
};

export default {
  data() {
    return {
      show: EMOJI_STATUS.CLOSED,
      emoji: WebIM.Emoji,
      emojiObj: WebIM.EmojiObj,
      interval: 5000,
      duration: 1000,
      autoplay: false,
      indicatorDots: true // 显示面板指示点

    };
  },

  components: {},
  props: {},
  methods: {
    openEmoji() {
      this.setData({
        show: EMOJI_STATUS.OPENED
      });
    },

    cancelEmoji() {
      this.setData({
        show: EMOJI_STATUS.CLOSED
      });
    },

    // 输出 emoji
    sendEmoji(event) {
      var emoji = event.target.dataset.emoji;
      this.$emit("newEmojiStr", {
        msg: emoji,
        type: msgType.EMOJI
      }, {
        bubbles: true,
        composed: true
      });
    }

  }
};
</script>
<style>
@import "./emoji.css";
</style>