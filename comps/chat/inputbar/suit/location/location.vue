<template><view></view></template><script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");

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
      wx.authorize({
        scope: "scope.userLocation",

        fail() {
          wx.showToast({
            title: "已拒绝",
            icon: "none"
          });
        },

        success() {
          wx.chooseLocation({
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
                // location 需要消息值吗？写死不行？
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
              me.$emit("newLocationMsg", {
                msg: msg,
                type: msgType.LOCATION
              }, {
                bubbles: true,
                composed: true
              });
            }

          });
        }

      });
    }

  }
};
</script>
