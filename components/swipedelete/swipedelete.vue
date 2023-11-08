<template>
  <view
    class="swipedelete-wrapper"
    @touchmove="touchMoveHandler"
    @touchstart="touchStartHandler"
    :style="'transform:translateX(' + translateX + 'rpx)'"
  >
    <slot></slot>
    <view class="swipedelete-btn" @tap="deleteItem">删除</view>
  </view>
</template>

<script>
let startX = 0;

export default {
  data() {
    return {
      translateX: 0,
    };
  },

  components: {},
  props: {},
  methods: {
    deleteItem: function (e) {
      this.setData({
        translateX: 0,
      });
      this.$emit(
        'deleteChatItem',
        {},
        {
          bubbles: true,
        }
      );
    },

    /**
     * 滑动删除事件-滑动开始
     */
    touchStartHandler: function (e) {
      startX = e.touches[0].pageX;
    },

    /**
     * 滑动删除事件-滑动
     */
    touchMoveHandler: function (e) {
      let pageX = e.touches[0].pageX;
      let moveX = pageX - startX;

      if (Math.abs(moveX) < 80) {
        return;
      } // e.target.style.WebkitTransform = `translateX(${moveX}px)`

      if (moveX > 0) {
        // 右滑 隐藏删除
        if (Math.abs(this.translateX) == 0) {
          return;
        } else {
          this.setData({
            translateX: 0,
          });
        }
      } else {
        // 左滑 显示删除
        if (Math.abs(this.translateX) >= 160) {
          return;
        } else {
          this.setData({
            translateX: -160,
          });
        }
      }
    },
  },
};
</script>
<style>
@import './swipedelete.css';
</style>
