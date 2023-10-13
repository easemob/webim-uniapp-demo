<template>
  <view>
    <lsj-upload
      ref="lsjUpload"
      childId="upload1"
      :width="width"
      :height="height"
      :option="option"
      :size="size"
      :formats="formats"
      :debug="debug"
      :instantly="instantly"
      @uploadEnd="onUploadEnd"
    >
      <view :style="{ width: width, height: height }">
        <slot></slot>
      </view>
    </lsj-upload>
  </view>
</template>

<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
let msgStorage = require("../../../msgstorage");
const str = WebIM.config.appkey.split("#");
const token = WebIM.conn.context.accessToken;
export default {
  data() {
    return {
      option: {
        url: `https://a1.easemob.com/${str[0]}/${str[1]}/chatfiles `,
        name: "file",
        header: {
          Authorization: `Bearer${token}`
        }
      },
      // 选择文件后是否立即自动上传，true=选择后立即上传
      instantly: true,
      // 必传宽高且宽高应与slot宽高保持一致
      width: "108rpx",
      height: "155rpx",
      // 限制允许选择的格式，空串=不限制，默认为空
      formats: "",
      // 文件上传大小限制
      size: 10,
      // 是否打印日志
      debug: true
    };
  },
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
  onReady() {},
  methods: {
    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },
    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    },

    onUploadEnd(res) {
      console.log(res);
      let id = WebIM.conn.getUniqueId();
      let msg = new WebIM.message(msgType.FILE, id);
      let dataObj = JSON.parse(res.responseText); // 接收上传文件对象
      let me = this;

      msg.set({
        apiUrl: WebIM.config.apiURL,
        accessToken: token,
        body: {
          type: msgType.FILE,
          url: dataObj.uri + "/" + dataObj.entities[0].uuid,
          filename: res.name,
          accessToken: token,
          file_length: res.size
        },
        from: me.username.myName,
        to: me.getSendToParam(),
        roomType: false,
        chatType: me.chatType,
        success: function (argument) {
          disp.fire("em.chat.sendSuccess", id);
        }
      });

      if (this.isGroupChat()) {
        msg.setGroup("groupchat");
      }

      WebIM.conn.send(msg.body);
      let obj = {
        msg: msg,
        type: msgType.FILE
      };
      this.saveSendMsg(obj);
    }
  }
};
</script>
