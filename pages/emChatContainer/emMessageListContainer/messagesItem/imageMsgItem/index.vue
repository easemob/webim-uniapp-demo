<template>
  <view class="image_msg_container">
    <u--image
      @click="onPrevieImage"
      mode="aspectFit"
      :src="msgBody.thumb || msgBody.url"
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
        width: '110',
        height: '110',
      };
      //   if (this.msgBody.width > 1000 || this.msgBody.height > 1000) {
      //     imgSize.width = this.msgBody.width / 10 + 'px';
      //     imgSize.height = this.msgBody.height / 10 + 'px';
      //   } else if (
      //     this.msgBody.width > 800 < 1000 ||
      //     this.msgBody.height > 800 < 1000
      //   ) {
      //     imgSize.width = this.msgBody.width / 3 + 'px';
      //     imgSize.height = this.msgBody.height / 3 + 'px';
      //   } else if (this.msgBody.width < 100 || this.msgBody.height < 100) {
      //     imgSize.width = this.msgBody.width + 'px';
      //     imgSize.height = this.msgBody.height + 'px';
      //   } else {
      //     imgSize.width = this.msgBody.width / 2 + 'px';
      //     imgSize.height = this.msgBody.height / 2 + 'px';
      //   }
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
