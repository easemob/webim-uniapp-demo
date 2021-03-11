<template>
  <div></div>
</template>

<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let msgStorage = require("../../../msgstorage");
let disp = require("../../../../../utils/broadcast");

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    username: {
      type: Object,
      default: () => ({}),
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT,
    },
  },
  methods: {
    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    // 未启用
    sendVideo() {
      var me = this;
      var token = WebIM.conn.context.accessToken;
      uni.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success(res) {
          var tempFilePaths = res.tempFilePath;
          var str = WebIM.config.appkey.split("#");
          uni.uploadFile({
            url:
              "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
            filePath: tempFilePaths,
            name: "file",
            header: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
            success(res) {
              var data = res.data;
              var dataObj = JSON.parse(data);
              var id = WebIM.conn.getUniqueId(); // 生成本地消息id
              var msg = new WebIM.message(msgType.VIDEO, id);
              msg.set({
                apiUrl: WebIM.config.apiURL,
                accessToken: token,
                body: {
                  type: msgType.VIDEO,
                  url: dataObj.uri + "/" + dataObj.entities[0].uuid,
                  filetype: "mp4",
                  filename: tempFilePaths,
									accessToken: token,
                },
                from: me.username.myName,
                to: me.getSendToParam(),
                roomType: false,
                chatType: me.chatType,
                success: function (argument) {
									disp.fire('em.chat.sendSuccess', id);
								}
              });
              if (me.isGroupChat()) {
                msg.setGroup("groupchat");
              }
              WebIM.conn.send(msg.body);
              let obj = {
                msg: msg,
                type: msgType.VIDEO,
              };
              me.saveSendMsg(obj);
            },
          });
        },
      });
    },
    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    },
  },

  // lifetimes
  created() {},

  beforeMount() {},

  moved() {},

  destroyed() {},

  mounted() {},
};
</script>

