<template>
<view></view>
</template>
<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
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
    isGroupChat() {
      return this.chatType == msgType.chatType.CHAT_ROOM;
    },

    getSendToParam() {
      return this.isGroupChat() ? this.username.groupId : this.username.your;
    },

    sendLocation() {
      var me = this;
      uni.authorize({
        scope: "scope.userLocation",

        fail() {
          uni.showToast({
            title: "已拒绝",
            icon: "none"
          });
        },

        success() {
          uni.chooseLocation({
            fail() {
              console.log(arguments);
            },

            complete() {
              console.log(arguments);
            },

            success(respData) {
              var id = WebIM.conn.getUniqueId();
              var msg = new WebIM.message(msgType.LOCATION, id);
              msg.set({
                msg: "",
                from: me.username.myName,
                to: me.getSendToParam(),
                roomType: false,
                lng: respData.longitude,
                lat: respData.latitude,
                addr: respData.address,
                chatType: me.chatType,

                success(id, serverMsgId) {}

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

      });
    },
    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
    }

  }
};
</script>
