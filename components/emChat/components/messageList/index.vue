<template>
  <view>
    <scroll-view
      id="commentContainer"
      class="message_list_container"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="lightgreen"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
      :style="{
        height: `${msgWindowHeight - inputBarHeight - keyboardHeight}px`,
      }"
      :scroll-with-animation="true"
      :scroll-top="commentScrollTop"
    >
      <view id="commentContent">
        <view
          class="comment-item-wrap"
          v-for="(item, index) in 100"
          :key="index"
        >
          <view class="comment-item">
            {{ item }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { onLoad, onUnload } from '@dcloudio/uni-app';
//视图高
let msgWindowHeight = ref(0);
//输入框高度
const inputBarHeight = 100;
//存储键盘高度
let keyboardHeight = ref(0);
onLoad(async () => {
  const { windowHeight } = await uni.getSystemInfo();
  msgWindowHeight.value = windowHeight;
  console.log('windowHeightwindowHeightwindowHeight', windowHeight);
  //监听键盘抬起事件
  uni.onKeyboardHeightChange((e) => {
    if (e.height > 0) {
      keyboardHeight.value = e.height;
      console.log(
        '>>>>>>>调整软键盘高度',
        msgWindowHeight.value - keyboardHeight.value
      );
      nextTick(() => {
        scrollToBottom();
      });
    } else {
      keyboardHeight.value = 0;
      commentScrollTop.value = 0;
      console.log(
        '>>>>>>>调整软键盘高度2',
        msgWindowHeight.value - keyboardHeight.value
      );
    }
  });
});
onUnload(() => {
  uni.offKeyboardHeightChange();
});
const commentScrollTop = ref(0);
//滚动到底部
const scrollToBottom = () => {
  console.log('>>>>>执行滚动置底');
  let query = uni.createSelectorQuery().in(this);
  query.select('#commentContainer').boundingClientRect();
  query.select('#commentContent').boundingClientRect();
  query.exec((res) => {
    console.log(res);
    //如果子元素高度大于父元素高度(显示高度)
    if (res[1].height > res[0].height) {
      //计算出二者差值就是需要滚动的距离

      commentScrollTop.value = res[1].height - res[0].height;
    }
  });
};
/* 下拉刷新逻辑 */
const triggered = ref(false);
const onPulling = (e) => {
  console.log('onpulling', e);
};
const onRefresh = () => {
  if (this._freshing) return;
  this._freshing = true;
  setTimeout(() => {
    this.triggered = false;
    this._freshing = false;
  }, 3000);
};
const onRestore = () => {
  this.triggered = 'restore'; // 需要重置
  console.log('onRestore');
};

const onAbort = () => {
  console.log('onAbort');
};
</script>

<style>
.message_list_container {
  /* height: 500rpx; */
}
</style>
