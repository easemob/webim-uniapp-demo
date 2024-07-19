<template>
  <view>
    <view :class="['mic-layer', { 'mic-layer-talking': isTalking }]">
      <!-- 按钮样式 -->
      <view
        :class="isTalking ? 'mic-btn-talking' : 'mic-btn'"
        @touchstart="touchStart"
        @touchend="onEnd"
        @longpress="onStart"
        @touchmove="handleRecordMove"
      >
        <view v-show="!isTalking" class="record-button">
          <text class="">
            {{ $t("holdToTalk") }}
          </text>
        </view>
        <view v-show="isTalking" class="mic-btn-talking_text">
          {{ $t("recording") }}
        </view>
        <view v-show="isTalking && !sendLock" class="tip-text"
          ><text class="mr-10">
            {{ $t("loose") }}
          </text>
          {{ $t("sendAudio") }}
        </view>
      </view>
      <!-- 语音音阶动画 -->
      <view
        v-if="isTalking"
        :class="['record-animate-box', { active: sendLock }]"
      >
        <view class="voice-scale">
          <view class="item" v-for="(item, index) in 10" :key="index"></view>
        </view>
      </view>
      <!-- 取消发送 -->
      <view v-if="isTalking" :class="['record-cancel', { active: sendLock }]">
        <text class="close-icon">x</text>
        <view class="tip-text" v-show="sendLock"
          ><text class="mr-10">
            {{ $t("loose") }}
          </text>
          {{ $t("cancel") }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { API_URL } from "@/const/index";
import { useConnStore } from "@/store/conn";
import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/message";
import { useAppUserStore } from "@/store/appUser";
import type { InputToolbarEvent } from "@/types/index";
import { useI18n } from "vue-i18n";
const connStore = useConnStore();
const conn = connStore.getChatConn();
const toolbarInject = inject<InputToolbarEvent>("InputToolbarEvent");

const SDK = connStore.getChatSDK();
const convStore = useConversationStore();
const { getSelfUserInfo } = useAppUserStore();
const { sendMessage, setPlayingAudioMessageId } = useMessageStore();
const { t } = useI18n();

const isTalking = ref(false); // 是否正在讲话
const sendLock = ref(false); // 语音是否发送锁，true-不发送，false-发送（用于上滑取消发送）
const record = ref<UniApp.RecorderManager>(); // 语音对象
const startPoint = ref<any>({}); //记录长按录音开始点信息,用于后面计算滑动距离。
const startTime = ref<number>(0);
const duration = ref<number>(0);

/**
 * 开始录音
 */
const onStart = () => {
  console.log("start");
  // 录音时清空播放中的音频
  setPlayingAudioMessageId("");
  const option = {
    format: "mp3"
  };
  duration.value = 0;
  startTime.value = new Date().getTime();
  isTalking.value = true;
  uni.vibrateShort();
  record.value?.start(option);
};

/**
 * 结束录音
 */
const onEnd = () => {
  console.log("onend");
  duration.value = new Date().getTime() - startTime.value;
  startTime.value = 0;
  isTalking.value = false;
  record.value?.stop();
};

/**
 * 开始触屏
 * @param {Object} e
 */
const touchStart = (e: any) => {
  startPoint.value.clientX = e.changedTouches[0].clientX; //手指按下时的X坐标
  startPoint.value.clientY = e.changedTouches[0].clientY; //手指按下时的Y坐标
};
/**
 * 录音时手指滑动
 * @param {Object} e
 */
const handleRecordMove = (e: any) => {
  let touchData = e.touches[0]; //滑动过程中，手指滑动的坐标信息
  let moveX = touchData.clientX - startPoint.value.clientX;
  let moveY = touchData.clientY - startPoint.value.clientY;
  if (moveY > -45) {
    // 滑动距离不够则不取消发送
    sendLock.value = false;
  } else {
    sendLock.value = true;
  }
};

/**
 * 上传录音文件并发送
 */

const sendAudioMessage = (tempFilePath: string) => {
  const uploadUrl = `${API_URL}/${conn.orgName}/${conn.appName}/chatfiles`;

  if (!tempFilePath) {
    return;
  }
  uni.showLoading();
  const token = conn.token;
  const requestParams = {
    url: uploadUrl,
    filePath: tempFilePath,
    fileType: "image",
    name: "file",
    header: {
      Authorization: "Bearer " + token
    },
    success: async (res: any) => {
      console.log("音频上传成功", res);
      const data = JSON.parse(res.data);
      //@ts-ignore TODO: 发送附件消息类型问题
      const audioMsg = SDK.message.create({
        type: "audio",
        to: convStore.currConversation!.conversationId,
        chatType: convStore.currConversation!.conversationType,
        filename: "audio.mp3",
        body: {
          url: data.uri + "/" + data.entities[0].uuid,
          filename: "audio.mp3",
          type: "mp3",
          //@ts-ignore
          length: Math.ceil(duration.value / 1000)
        },
        ext: {
          ease_chat_uikit_user_info: {
            avatarURL: getSelfUserInfo().avatar,
            nickname: getSelfUserInfo().name
          }
        }
      });
      try {
        duration.value = 0;
        await sendMessage(audioMsg);
        toolbarInject?.onMessageSend();
      } catch (error: any) {
        uni.showToast({
          title: `send failed: ${error.message}`,
          icon: "none"
        });
      }

      uni.hideLoading();
    },
    fail: (e: any) => {
      uni.hideLoading();
      uni.showToast({ title: t("uploadFailed"), icon: "none" });
    }
  };
  //@ts-ignore
  uni.uploadFile(requestParams);
};

onMounted(() => {
  record.value = uni.getRecorderManager();
  record.value?.onStart((res) => {
    console.log("onStart", res);
  });
  record.value?.onError((res) => {
    console.log("录音错误事件：", res);
  });
  record.value?.onStop((res) => {
    console.log(res, "录音回调地址", duration);
    if (sendLock.value) {
      sendLock.value = false; // 恢复锁状态
      console.log("取消发送");
      return;
    } // 取消发送
    if (duration.value < 1000) {
      uni.showToast({
        icon: "error",
        title: t("audioDurationIsShort")
      });
      return;
    }
    sendAudioMessage(res.tempFilePath);
  });
});
</script>

<style lang="scss" scoped>
.mr-10 {
  margin-right: 10rpx;
}
.mic-layer {
  width: 100%;
  box-sizing: border-box;
  .record-button {
    border-radius: 10rpx;
    background-color: #f3f3f3;
    color: black;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
  }
}
/* 讲话中样式 */
.mic-layer-talking {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  .mic-btn-talking {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 200rpx;
    border-radius: 80px 80px 0 0;
    background-color: #f2f2f2;
    z-index: 999;
    &_text {
      color: #999999;
      padding: 60rpx 0;
      text-align: center;
    }
  }
  /* 发送、取消提示文字 */
  .tip-text {
    position: absolute;
    top: -60rpx;
    left: 50%;
    width: 160rpx;
    text-align: center;
    transform: translateX(-50%);
    color: #e3e4ea;
    font-size: 24rpx;
  }
  /* 上方语音动画 */
  .record-animate-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300rpx;
    height: 140rpx;
    background-color: #2878f4;
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    &.active {
      background-color: #f56c6c;
      width: 140rpx;
    }
    /* 语音音阶 */
    .voice-scale {
      width: 60%;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        display: block;
        background: #333333;
        width: 4rpx;
        height: 10%;
        margin-right: 2.5px;
        float: left;
        &:last-child {
          margin-right: 0px;
        }
        &:nth-child(1) {
          animation: load 1s 0.8s infinite linear;
        }

        &:nth-child(2) {
          animation: load 1s 0.6s infinite linear;
        }

        &:nth-child(3) {
          animation: load 1s 0.4s infinite linear;
        }

        &:nth-child(4) {
          animation: load 1s 0.2s infinite linear;
        }

        &:nth-child(5) {
          animation: load 1s 0s infinite linear;
        }

        &:nth-child(6) {
          animation: load 1s 0.2s infinite linear;
        }

        &:nth-child(7) {
          animation: load 1s 0.4s infinite linear;
        }

        &:nth-child(8) {
          animation: load 1s 0.6s infinite linear;
        }

        &:nth-child(9) {
          animation: load 1s 0.8s infinite linear;
        }

        &:nth-child(10) {
          animation: load 1s 1s infinite linear;
        }
      }
    }

    @keyframes load {
      0% {
        height: 10%;
      }

      50% {
        height: 100%;
      }

      100% {
        height: 10%;
      }
    }
  }
  /* 取消按钮 */
  .record-cancel {
    position: absolute;
    left: 50%;
    bottom: 300rpx;
    transform: translateX(-50%);
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &.active {
      transform: translateX(-50%) scale(1.2);
      background-color: #f56c6c;
    }
    .close-icon {
      font-size: 40rpx;
      color: #ffffff;
    }
  }
}
</style>
