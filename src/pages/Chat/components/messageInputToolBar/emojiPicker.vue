<template>
  <view class="emoji-picker-wrap">
    <view class="emojis-wrap">
      <image
        v-for="emoji in emojis"
        :key="emoji.alt"
        class="emoji"
        :src="emoji.url"
        @click="selectEmoji(emoji.alt)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { emojiList } from "@/const/emoji";
const emojis = ref(emojiList);

const emits = defineEmits(["onEmojiPick"]);

const selectEmoji = (alt: string) => {
  emits("onEmojiPick", alt);
};
</script>
<style lang="scss" scoped>
.emojis-wrap {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  padding: 0 10rpx;
}


.emoji {
  width: 46rpx;
  height: 46rpx;
  margin: 10rpx;

  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.8);
  }
}

</style>
