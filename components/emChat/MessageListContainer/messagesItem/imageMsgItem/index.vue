<template>
  <view class="image_msg_container">
    <u--image
      @click="onPrevieImage"
      mode="aspectFit"
      :src="msgBody.thumb"
      :width="imgSize.width"
      :height="imgSize.height"
      :radius="5 + 'px'"
    >
    </u--image>
  </view>
</template>

<script>
export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    imgSize() {
      let imgSize = {
        width: '',
        height: '',
      };

      if (this.msgBody.width > 1000 || this.msgBody.height > 1000) {
        imgSize.width = this.msgBody.width / 10 + 'px';
        imgSize.height = this.msgBody.height / 10 + 'px';
      } else {
        imgSize.width = this.msgBody.width / 2 + 'px';
        imgSize.height = this.msgBody.height / 2 + 'px';
      }
      return imgSize;
    },
  },
  data() {
    return {
      src: 'https://cdn.uviewui.com/uview/album/1.jpg',
    };
  },
  methods: {
    onPrevieImage() {
      uni.previewImage({
        urls: [this.msgBody.url],
      });
    },
  },
};
</script>

<style scoped></style>
