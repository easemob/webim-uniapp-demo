let Disp = require("../../utils/Dispatcher.js");

let msgPackager = require("./msgpackager.js");

let msgType = require("./msgtype.js");

let msgStorage = new Disp();

let disp = require("../../utils/broadcast.js");

msgStorage.saveReceiveMsg = function (receiveMsg, type) {
  let sendableMsg;

  if (type == msgType.IMAGE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          size: {
            width: receiveMsg.width,
            height: receiveMsg.height
          }
        }
      }
    };
  } else if (type == msgType.TEXT || type == msgType.EMOJI) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          msg: receiveMsg.data
        }
      },
      value: receiveMsg.data
    };
  } 
  else if (type == 'INFORM') { // 通知消息
    sendableMsg = {
      body: {
        from: receiveMsg.from,
        to: receiveMsg.to,
        chatType: 'INFORM',
        gid:receiveMsg.gid ? receiveMsg.gid:'',
        type:receiveMsg.type
      },
    };
  } else if (type == msgType.FILE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.file_length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          msg: "当前不支持此格式消息展示"
        }
      },
      value: receiveMsg.data
    };
  } else if (type == msgType.AUDIO) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      accessToken: receiveMsg.token || receiveMsg.accessToken,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          from: receiveMsg.from,
          to: receiveMsg.to
        }
      }
    };
  } else if (type == msgType.VIDEO) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      accessToken: receiveMsg.token || receiveMsg.accessToken,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          from: receiveMsg.from,
          to: receiveMsg.to
        },
      },
    };
  } else {
    return;
  }

  this.saveMsg(sendableMsg, type, receiveMsg);
};

msgStorage.saveMsg = function (sendableMsg, type, receiveMsg) {
  let me = this;
  let myName = uni.getStorageSync("myUsername");
  let sessionKey; // 仅用作群聊收消息，发消息没有 receiveMsg

  if (receiveMsg && receiveMsg.type == "groupchat") {
    sessionKey = receiveMsg.to + myName;
  } else if (sendableMsg.body.chatType === 'INFORM'){
    sessionKey = 'INFORM'
  }
  
  // 群聊发 & 单发 & 单收
  else {
    sessionKey = sendableMsg.body.from == myName ? sendableMsg.body.to + myName : sendableMsg.body.from + myName;
  }

  let curChatMsg = uni.getStorageSync(sessionKey) || [];
  let renderableMsg = msgPackager(sendableMsg, type, myName);

  if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
    renderableMsg.msg.token = sendableMsg.accessToken;
  }

  curChatMsg.push(renderableMsg); //console.log('renderableMsgrenderableMsg', renderableMsg)

  if (type == msgType.VIDEO) {
    renderableMsg.msg.token = sendableMsg.accessToken; //如果是音频则请求服务器转码
  }


  save();

  function save() {
    uni.setStorage({
      key: sessionKey,
      data: curChatMsg,

      success() {
        if (type == msgType.AUDIO || type == msgType.VIDEO) {
          disp.fire('em.chat.audio.fileLoaded');
        }

        me.fire("newChatMsg", renderableMsg, type, curChatMsg, sessionKey);
      }

    });
  }
};

module.exports = msgStorage;