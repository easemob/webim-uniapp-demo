<template>
<view></view>
</template>
<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
let msgStorage = require("../../../msgstorage");
export default {
  data() {
    return {};
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
  methods: {
    openCamera() {
      var me = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["camera"],

        success(res) {
          me.upLoadImage(res);
        }

      });
    },

    sendImage() {
      var me = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],

        success(res) {
          me.upLoadImage(res);
        }

      });
    },

    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    upLoadImage(res) {
      var me = this;
      var tempFilePaths = res.tempFilePaths;
      var token = WebIM.conn.context.accessToken;
      uni.getImageInfo({
        src: res.tempFilePaths[0],

        success(res) {
          var allowType = {
            jpg: true,
            gif: true,
            png: true,
            bmp: true
          };
          var str = WebIM.config.appkey.split("#");
          var width = res.width;
          var height = res.height;
          var index = res.path.lastIndexOf(".");
          var filetype = ~index && res.path.slice(index + 1) || "";

          if (filetype.toLowerCase() in allowType) {
            uni.uploadFile({
              url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token
              },

              success(res) {
                var data = res.data;
                var dataObj = JSON.parse(data);
                var id = WebIM.conn.getUniqueId(); // 生成本地消息 id
                console.log('dataObj>>',dataObj);
                
                var msg = new WebIM.message(msgType.IMAGE, id);
                var file = {
                  type: msgType.IMAGE,
                  size: {
                    width: width,
                    height: height
                  },
                  url: dataObj.uri + "/" + dataObj.entities[0].uuid,
                  filetype: filetype,
                  filename: tempFilePaths[0]
                };
                msg.set({
                  apiUrl: WebIM.config.apiURL,
                  body: file,
                  from: me.username.myName,
                  to: me.getSendToParam(),
                  roomType: false,
                  chatType: me.chatType,
                  success: function (argument) {
                    disp.fire('em.chat.sendSuccess', id);
                  }
                });

                if (me.chatType == msgType.chatType.CHAT_ROOM) {
                  msg.setGroup("groupchat");
                }

                WebIM.conn.send(msg.body);
                let obj = {
                  msg: msg,
                  type: msgType.IMAGE
                }
                me.saveSendMsg(obj);
              }
            });
          }
        }
      });
    },
    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    }

  }
};
</script>
