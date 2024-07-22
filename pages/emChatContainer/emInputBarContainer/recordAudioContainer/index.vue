<template>
  <view>
    <view class="audio_start_box" @click="startRecordAudio">
      <image src="/static/images/new_ui/inputbar/audio_click_start_icon.png">
      </image>
      <text>点击录音</text>
    </view>
    <u-popup :show="isStartRecording" @close="isStartRecording = false">
      <view class="audio_record_box">
        <image
          class="audio_icon"
          @click="cannelRecordAudio"
          src="/static/images/new_ui/inputbar/audio_delete_icon.png"
        ></image>
        <view class="record_statistics_box">
          <view class="record_length_text">{{ recordTime }}s</view>
          <text>正在录音</text>
        </view>

        <image
          class="audio_icon"
          @click="sendAudioMessage"
          src="/static/images/new_ui/inputbar/audio_send_icon.png"
        ></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { EMClient } from "@/EaseIM";
import { emMessages } from "@/EaseIM/emApis";
import { RECORD_STATUS, RECOED_DESC } from "@/constant";
const { sendDisplayMessages } = emMessages();
let recordTimeInterval = null;
export default {
  data() {
    return {
      RECOED_DESC,
      RECORD_STATUS,
      isStartRecording: false,
      recordStatus: RECORD_STATUS.HIDE,
      recorderManager: null, //全局唯一录音管理器
      recording: false, //是否正在录音中
      recordTime: 0,
      webRecorderManager: null, // h5 audio record
      platFormInfo: uni.getSystemInfoSync(),
    };
  },
  mounted() {
    this.platFormInfo = uni.getSystemInfoSync();
    if (this.platFormInfo !== "web") {
      this.recorderManager = uni.getRecorderManager();
    }
  },
  watch: {
    recordTime(newVal, oldVal) {
      if (this.recording && newVal > 50) {
        uni.showToast({
          icon: "none",
          title: "录音时长最大60秒，注意时长！",
          duration: 2000,
        });
        this.cannelRecordAudio();
      }
      if (this.recording && newVal > 60) {
        uni.showToast({
          icon: "none",
          title: "录音时长最大60秒",
          duration: 2000,
        });
        this.cannelRecordAudio();
      }
    },
  },
  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
  },
  methods: {
    startRecordAudio() {
      console.log(">>>>>开始采集");
      this.isStartRecording = true;
      this.handleRecording();
    },
    handleRecording() {
      // h5不支持uni.getRecorderManager, 需要单独处理
      if (this.platFormInfo.uniPlatform === "web") {
        console.log(">>>>>>>>++++++");
        this.executeWebAudioRecord();
      } else {
        setTimeout(() => {
          //请求授权
          this.requestMiniProgramAuthorization();
        }, 350);
      }
    },

    //web平台采集音频录音
    //#ifdef WEB
    executeWebAudioRecord() {
      import("../../../../recorderCore/src/recorder-core").then((Recorder) => {
        require("../../../../recorderCore/src/engine/mp3");
        require("../../../../recorderCore/src/engine/mp3-engine");
        this.initStartRecord();
        this.webRecorderManager = new Recorder.default({
          type: "mp3",
        });
        this.webRecorderManager.open(
          () => {
            console.log(">>>>>>web 录音开始执行");
            this.recording = true;
            this.saveRecordTime();
            this.webRecorderManager.start();
          },
          (msg, isUserNotAllow) => {
            if (isUserNotAllow) {
              uni.showToast({
                title: "鉴权失败，请重试",
                icon: "none",
              });
            } else {
              uni.showToast({
                title: `开启失败，请重试`,
                icon: "none",
              });
            }
          }
        );
      });
    },
    // #endif
    requestMiniProgramAuthorization() {
      const onSuccess = (res) => {
        this.initStartRecord();
        const recordAuth = res.authSetting["scope.record"];
        if (!recordAuth) {
          // 已申请过授权，但是用户拒绝
          uni.openSetting({
            success: function (res) {
              const recordAuth = res.authSetting["scope.record"];
              if (recordAuth == true) {
                uni.showToast({
                  title: "授权成功",
                  icon: "success",
                });
              } else {
                uni.showToast({
                  title: "请授权录音",
                  icon: "none",
                });
              }
            },
          });
          return;
        }
        // 用户已经同意授权
        if (recordAuth) {
          this.executeMiniProgramRecord();
          return;
        }
        // 第一次进来，未发起授权
        uni.authorize({
          scope: "scope.record",
          success: () => {
            // 授权成功
            uni.showToast({
              title: "授权成功",
              icon: "icon",
            });
            this.executeMiniProgramRecord();
          },
        });
      };
      const onFail = (res) => {
        uni.showToast({
          title: "鉴权失败，请重试",
          icon: "none",
        });
      };
      if (uni.getSetting) {
        uni.getSetting({
          success: onSuccess,
          fail: onFail,
        });
        return;
      } else {
        this.executeMiniProgramRecord();
        return;
      }
    },
    //针对mini program 平台采集音频录音
    executeMiniProgramRecord() {
      this.initStartRecord();
      let recorderManager = this.recorderManager || uni.getRecorderManager();
      recorderManager.onStart(() => {
        this.recording = true;
        this.saveRecordTime();
      });
      recorderManager.start({
        format: "mp3",
      });
    },
    // 初始化开始录音状态
    initStartRecord() {
      clearInterval(recordTimeInterval);
      this.recordTime = 0;
      this.recording = false;
    },
    getRecorderCollectionData() {
      const recorderManager = this.recorderManager;
      const webRecorderManager = this.webRecorderManager;
      const duration = this.recordTime * 1000;
      return new Promise((resolve, reject) => {
        if (webRecorderManager && this.platFormInfo.uniPlatform === "web") {
          this.webRecorderManager.stop(
            (blob) => {
              clearInterval(recordTimeInterval);
              if (duration <= 1000) {
                uni.showToast({
                  title: "录音时间太短",
                  icon: "none",
                });
                this.$emit("changeRecordAudioContainer");
              } else {
                const tempFilePath = window.URL.createObjectURL(blob);
                resolve({ tempFilePath, duration });
              }
              this.recordTime = 0;
            },
            (s) => {
              reject(s);
              console.log("结束出错：" + s, 1);
            },
            true
          );
        } else if (recorderManager) {
          recorderManager.onStop((res) => {
            if (duration <= 1000) {
              uni.showToast({
                title: "录音时间太短",
                icon: "none",
              });
              this.$emit("changeRecordAudioContainer");
            } else {
              // 上传
              resolve({ tempFilePath: res.tempFilePath, duration });
            }
            this.initStartRecord();
          });
          // 停止录音
          recorderManager.stop();
        }
      });
    },
    //取消录音
    cannelRecordAudio() {
      //调用对应管理器结束录音采集
      if (this.platFormInfo.uniPlatform === "web" && this.webRecorderManager) {
        this.webRecorderManager.close(() => {
          this.initStartRecord();
        });
      } else if (this.recorderManager) {
        this.recorderManager.onStop(() => {
          this.initStartRecord();
        });
        this.recorderManager.stop();
      }
      this.isStartRecording = false;
      this.$emit("changeRecordAudioContainer");
    },
    //上传录音附件资源至环信服务器
    async uploadRecordFile(tempFilePath) {
      if (!tempFilePath) return;
      const apiUrl = EMClient.apiUrl;
      const orgName = EMClient.orgName;
      const appName = EMClient.appName;
      const uploadTargetUrl = `${apiUrl}/${orgName}/${appName}/chatfiles`;
      const accessToken = EMClient.token;
      return new Promise((resolve, reject) => {
        const requestParams = {
          url: uploadTargetUrl,
          filePath: tempFilePath,
          fileType: "audio",
          name: "file",
          header: {
            Authorization: "Bearer " + accessToken,
          },
          success: (res) => {
            console.log(">>>>>录音上传成功", res);
            uni.showToast({ title: "音源已上传...", icon: "none" });
            resolve(res);
          },
          fail: (e) => {
            console.log(">>>>>上传失败", e);
            uni.showToast({ title: "录音上传失败", icon: "none" });
            reject(e);
          },
        };
        uni.uploadFile(requestParams);
      });
    },
    //发送语音消息
    async sendAudioMessage() {
      try {
        //获取对应音频源文件
        const { tempFilePath, duration } =
          await this.getRecorderCollectionData();
        //进行文件上传
        const uploadFileRes = await this.uploadRecordFile(tempFilePath);
        const dataObj = JSON.parse(uploadFileRes.data); // 接收消息对象
        const bodys = {
          url: dataObj.uri + "/" + dataObj.entities[0].uuid,
          filename: `${new Date().getTime()}.mp3`,
          filetype: "mp3",
          length: Math.ceil(duration / 1000),
        };
        const params = {
          // 消息类型。
          type: "audio",
          body: { ...bodys },
          filename: bodys.filename,
          // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
          to: this.chattingId,
          // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
          chatType: this.chattingChatType,
          ext: {},
        };
        const res = await sendDisplayMessages({ ...params });
        console.log(">>>>>>已发送", res);
      } catch (error) {
        console.log(">>>>>语音消息发送失败", error);
        if (error.type === 508) {
          uni.showToast({
            title: "发送内容不合规",
            icon: "none",
          });
        } else {
          uni.showToast({
            title: `消息发送失败${error.type}`,
            icon: "none",
          });
        }
      } finally {
        this.isStartRecording = false;
        this.$emit("changeRecordAudioContainer");
      }
    },
    // 记录录音时长
    saveRecordTime() {
      recordTimeInterval = setInterval(() => {
        this.recordTime++;
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(recordTimeInterval);
    this.recordTime = 0;
  },
};
</script>

<style scoped>
.audio_record_box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #fff;
}
.audio_start_box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.audio_start_box image {
  width: 48px;
  height: 48px;
}
.audio_start_box text {
  /* 点击录音 */

  width: 56px;
  height: 18px;

  /* 简体中文/标签/中 */
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
.audio_icon {
  width: 36px;
  height: 36px;
}
.record_statistics_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 82px;
}
.record_length_text {
  width: 80px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: #009eff;
  border-radius: 45px;
  border: 10px solid #e5f5ff;
  color: #e5f5ff;
}
.record_statistics_box text {
  /* 正在录音 */

  width: 56px;
  height: 18px;

  /* 简体中文/标签/中 */
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
