<template>
  <view v-if="showPop" class="shade" @tap="hidePop">
    <view class="pop" :style="popStyle" :class="{ show: showPop }">
      <view
        v-for="(item, index) in popButton"
        :key="index"
        @tap="pickerMenu"
        :data-index="index"
        >{{ item }}</view
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "long-press-modal",
  props: {
    /* 窗口尺寸 */
    winSize: {
      type: Object,
      default() {
        return {
          witdh: 375,
          height: 603,
        };
      },
    },
    /* 显示操作弹窗 */
    showPop: {
      type: Boolean,
      default: false,
    },
    /* 弹窗按钮列表 */
    popButton: {
      type: Array,
      default() {
        // 如下
        // return ["标为关注", "置顶聊天", "删除该聊天"]
        return [];
      },
    },
    /* 弹窗定位样式 */
    popStyle: {
      type: String,
      default: "",
    },
    change:{
      type:Function,
    }
  },
  methods: {
    /* 隐藏弹窗 */
    hidePop() {
      this.$emit('hidePop')
    },
    /* 选择菜单 */
    pickerMenu() {
      this.$emit('change')
      this.hidePop();
    },
  },
};
</script>
<style scoped lang="scss">
/* 遮罩 */
.shade {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-touch-callout: none;

  .pop {
    position: fixed;
    z-index: 101;
    width: 200upx;
    box-sizing: border-box;
    font-size: 28upx;
    text-align: left;
    color: #333;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    line-height: 80upx;
    transition: transform 0.15s ease-in-out 0s;
    user-select: none;
    -webkit-touch-callout: none;
    transform: scale(0, 0);

    &.show {
      transform: scale(1, 1);
    }

    & > view {
      padding: 0 20upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;
      -webkit-touch-callout: none;

      &:active {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>