<template>
  <view>
    <scroll-view scroll-y="true" class="scroll-emoji-box">
      <view
        class="emoji-item"
        v-for="(item, index) in emoji.emojis"
        :key="index"
        @click="handleClick(item)"
        >{{ item }}</view
      >
      <view class="emoji-click">
        <u-icon
          name="backspace"
          color="#000"
          size="45"
          @click="deleteEmojs"
        ></u-icon>
        <u-icon
          name="checkmark-circle-fill"
          color="#2979ff"
          size="35"
          @click="sendMessage"
        ></u-icon>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { emoji } from "@/constant";
export default {
  data() {
    return {
      emoji,
    };
  },
  methods: {
    handleClick(emoji) {
      this.$emit("appendEmojiIcon", emoji);
    },
    sendMessage() {
      this.$emit("sendTextMessage");
    },
    deleteEmojs() {
      this.$emit("deleteEmojs");
    },
  },
};
</script>

<style scoped>
.scroll-emoji-box {
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.emoji-item {
  width: 10%;
  height: 37px;
  font-size: 26px;
  display: inline-block;
  text-align: center;
  line-height: 36px;
  box-sizing: border-box;
}
.emoji-click {
  position: fixed;
  bottom: 30px;
  right: 10px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90px;
}
.emoji-click image {
  width: 40px;
  height: 40px;
  margin: 10px;

}
</style>
