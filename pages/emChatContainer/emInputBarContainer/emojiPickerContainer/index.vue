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
  },
};
</script>

<style scoped>
.scroll-emoji-box {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
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

</style>
