<template>
  <view
    v-if="recordStatus != RecordStatus.HIDE"
    class="modal modal-record"
    @tap="toggleRecordModal"
  >
    <view class="modal-body" @tap.stop="toggleWithoutAction">
      <view class="sound-waves">
        <view
          v-for="(item, index) in radomHeight"
          :key="index"
          :style="'height:' + item + 'rpx;margin-top:-' + item / 2 + 'rpx'"
        ></view>
        <view style="clear: both; width: 0; height: 0"></view>
      </view>
      <text class="desc">{{ RecordDesc[recordStatus] }}</text>
      <view
        class="dot"
        @touchstart="handleRecording"
        @touchmove="handleRecordingMove"
        @touchend="handleRecordingCancel"
      >
        <image class="icon-mic" src="/static/images/send.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let RECORD_CONST = require("./record_status");
let RecordStatus = RECORD_CONST.RecordStatus;
let RecordDesc = RECORD_CONST.RecordDesc;
let disp = require("../../../../../utils/broadcast");
let msgStorage = require("../../../msgstorage");
let RunAnimation = false;
let recordTimeInterval = null;
let waveTimer = null;
const InitHeight = [
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50
];
export default {
  data() {
    return {
      changedTouches: null,
      recordStatus: RecordStatus.HIDE,
      RecordStatus,
      RecordDesc,
      radomHeight: InitHeight,
      recorderManager: uni.getRecorderManager(),
      recordClicked: false,
      isLongPress: false,
      recordTime: 0,
      rec: null // h5 audio record
    };
  },
  components: {},
  props: {
    username: {
      type: Object,
      default: () => ({})
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT
    }
  },

  destroyed() {
    clearInterval(recordTimeInterval);
    clearTimeout(waveTimer);
    this.recordTime = 0;
  },

  methods: {
    toggleWithoutAction(e) {
      // 阻止 tap 冒泡
    },

    toggleRecordModal() {
      if (this.recordStatus === RecordStatus.HIDE) {
        this.recordStatus = RecordStatus.SHOW;
      } else {
        this.recordStatus = RecordStatus.HIDE;
      }
      this.radomHeight = InitHeight;
    },

    handleRecordingMove(e) {
      var touches = e.touches[0];
      var changedTouches = this.changedTouches;

      if (!changedTouches) {
        return;
      }

      if (this.recordStatus == RecordStatus.SWIPE) {
        if (changedTouches.pageY - touches.pageY < 20) {
          this.recordStatus = RecordStatus.HOLD;
        }
      }

      if (this.recordStatus == RecordStatus.HOLD) {
        if (changedTouches.pageY - touches.pageY > 20) {
          this.recordStatus = RecordStatus.SWIPE;
        }
      }
    },
    // 初始化开始录音状态
    initStartRecord(e) {
      clearInterval(recordTimeInterval);
      this.recordTime = 0;
      this.changedTouches = e.touches[0];
      this.recordStatus = RecordStatus.HOLD;
      RunAnimation = true;
      this.startWave();
    },
    // 记录录音时长
    saveRecordTime() {
      recordTimeInterval = setInterval(() => {
        this.recordTime++;
        if (this.recordTime === 100) {
          this.handleRecordingCancel();
          RunAnimation = false;
        }
      }, 1000);
    },
    startRecord(e) {
      let me = this;
      me.initStartRecord(e);
      let recorderManager = me.recorderManager || uni.getRecorderManager();
      recorderManager.onStart(() => {
        this.saveRecordTime();
      });
      recorderManager.start({
        format: "mp3"
      });
    },

    executeRecord(e) {
      let me = this;
      if (uni.getSetting) {
        uni.getSetting({
          success: (res) => {
            clearInterval(recordTimeInterval);
            me.recordTime = 0;
            let recordAuth = res.authSetting["scope.record"];

            if (recordAuth == false) {
              // 已申请过授权，但是用户拒绝
              uni.openSetting({
                success: function (res) {
                  let recordAuth = res.authSetting["scope.record"];

                  if (recordAuth == true) {
                    uni.showToast({
                      title: "授权成功",
                      icon: "success"
                    });
                  } else {
                    uni.showToast({
                      title: "请授权录音",
                      icon: "none"
                    });
                  }

                  me.isLongPress = false;
                }
              });
            } else if (recordAuth == true) {
              // 用户已经同意授权
              me.startRecord(e);
            } else {
              // 第一次进来，未发起授权
              uni.authorize({
                scope: "scope.record",
                success: () => {
                  // 授权成功
                  uni.showToast({
                    title: "授权成功",
                    icon: "success"
                  });
                }
              });
            }
          },
          fail: function () {
            uni.showToast({
              title: "鉴权失败，请重试",
              icon: "none"
            });
          }
        });
        return;
      } else {
        me.startRecord(e);
        return;
      }
    },

    handleRecording(e) {
      const sysInfo = uni.getSystemInfoSync();
      console.log("getSystemInfoSync", sysInfo);
      if (sysInfo.app === "alipay") {
        // https://forum.alipay.com/mini-app/post/7301031?ant_source=opendoc_recommend
        uni.showModal({
          content: "支付宝小程序不支持语音消息，请查看支付宝相关api了解详情"
        });
        return;
      }
      let me = this;
      me.recordClicked = true;
      // h5不支持uni.getRecorderManager, 需要单独处理
      if (sysInfo.uniPlatform === "web") {
        import("../../../../../recorderCore/src/recorder-core").then((Recorder) => {
          require("../../../../../recorderCore/src/engine/mp3");
          require("../../../../../recorderCore/src/engine/mp3-engine");
          if (me.recordClicked == true) {
            clearInterval(recordTimeInterval);
            me.initStartRecord(e);
            me.rec = new Recorder.default({
              type: "mp3"
            });
            me.rec.open(
              () => {
                me.saveRecordTime();
                me.rec.start();
              },
              (msg, isUserNotAllow) => {
                if (isUserNotAllow) {
                  uni.showToast({
                    title: "鉴权失败，请重试",
                    icon: "none"
                  });
                } else {
                  uni.showToast({
                    title: `开启失败，请重试`,
                    icon: "none"
                  });
                }
              }
            );
          }
        });
      } else {
        setTimeout(() => {
          if (me.recordClicked == true) {
            me.executeRecord(e);
          }
        }, 350);
      }
    },

    // 取消录音
    handleRecordingCancel() {
      RunAnimation = false;
      let recorderManager = this.recorderManager; // 向上滑动状态停止：取消录音发放
      let me = this;
      if (this.recordStatus == RecordStatus.SWIPE) {
        this.recordStatus = RecordStatus.RELEASE;
      } else {
        this.recordStatus = RecordStatus.HIDE;
        this.recordClicked = false;
      }
      if (uni.getSystemInfoSync().uniPlatform === "web") {
        this.rec.stop(
          function (blob) {
            clearInterval(recordTimeInterval);
            let duration = me.recordTime * 1000;
            if (me.recordStatus == RecordStatus.RELEASE) {
              console.log("user canceled");
              me.recordStatus = RecordStatus.HIDE;
              return;
            }
            if (duration <= 1000) {
              uni.showToast({
                title: "录音时间太短",
                icon: "none"
              });
            } else {
              let blobURL = window.URL.createObjectURL(blob);
              me.uploadRecord(blobURL, duration);
            }
            me.recordStatus = RecordStatus.HIDE;
            me.recordTime = 0;
          },
          function (s) {
            console.log("结束出错：" + s, 1);
          },
          true
        );
      } else {
        recorderManager.onStop((res) => {
          clearInterval(recordTimeInterval);
          let duration = this.recordTime * 1000;
          if (this.recordStatus == RecordStatus.RELEASE) {
            console.log("user canceled");
            this.recordStatus = RecordStatus.HIDE;
            return;
          }

          if (duration <= 1000) {
            uni.showToast({
              title: "录音时间太短",
              icon: "none"
            });
          } else {
            // 上传
            this.uploadRecord(res.tempFilePath, duration);
          }
          clearInterval(recordTimeInterval);
          this.recordStatus = RecordStatus.HIDE;
          this.recordTime = 0;
        }); // 停止录音

        recorderManager.stop();
      }
    },

    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    uploadRecord(tempFilePath, dur) {
      var str = WebIM.config.appkey.split("#");
      var me = this;
      var token = WebIM.conn.context.accessToken;
      uni.uploadFile({
        url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
        filePath: tempFilePath,
        fileType: "audio",
        name: "file",
        header: {
          Authorization: "Bearer " + token
        },

        success(res) {
          var id = WebIM.conn.getUniqueId();
          var msg = new WebIM.message(msgType.AUDIO, id);
          var dataObj = JSON.parse(res.data); // 接收消息对象

          msg.set({
            apiUrl: WebIM.config.apiURL,
            accessToken: token,
            body: {
              type: msgType.AUDIO,
              url: dataObj.uri + "/" + dataObj.entities[0].uuid,
              filetype: "",
              filename: `${new Date().getTime()}.mp3`,
              accessToken: token,
              length: Math.ceil(dur / 1000)
            },
            from: me.username.myName,
            to: me.getSendToParam(),
            roomType: false,
            chatType: me.chatType,
            success: function (argument) {
              disp.fire("em.chat.sendSuccess", id);
            }
          });

          if (me.isGroupChat()) {
            msg.setGroup("groupchat");
          }

          msg.body.length = Math.ceil(dur / 1000); //console.log('发送的语音消息', msg.body)

          WebIM.conn.send(msg.body);
          let obj = {
            msg: msg,
            type: msgType.AUDIO
          };
          me.saveSendMsg(obj);
        }
      });
    },
    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    },
    // 波纹动画
    startWave() {
      const that = this;
      var _radomHeight = [...that.radomHeight];
      for (var i = 0; i < that.radomHeight.length; i++) {
        //+1是为了避免为0
        _radomHeight[i] = 100 * Math.random().toFixed(2) + 10;
      }
      that.radomHeight = _radomHeight;
      if (RunAnimation) {
        waveTimer = setTimeout(function () {
          that.startWave();
        }, 500);
      } else {
        clearInterval(waveTimer);
        return;
      }
    }
  }
};
</script>
<style>
@import "./audio.css";
</style>
