let WebIM = require("../../utils/WebIM.js")["default"];

let msgType = require("./msgtype.js");


function getMsgData(sendableMsg, type) {
  if (type == msgType.TEXT) {
    return WebIM.parseEmoji(sendableMsg.value.replace(/\n/gm, ""));
  } else if (type == msgType.EMOJI) {
    return sendableMsg.value;
  } else if (
    type == msgType.IMAGE ||
    type == msgType.VIDEO ||
    type == msgType.AUDIO
  ) {
    return sendableMsg.body.body.url;
  } else if (type == msgType.FILE) {
    return sendableMsg.body.body.url;
  }

  return "";
}
module.exports = function (sendableMsg, type, myName) {
  console.log(sendableMsg, 'sendableMsg')
//   var time = WebIM.time();
  var renderableMsg = {
    info: {
      from: sendableMsg.body.from,
      to: sendableMsg.body.to
    },
    username:
      sendableMsg.body.from == myName
        ? sendableMsg.body.to
        : sendableMsg.body.from,
    yourname: sendableMsg.body.from,
    msg: {
      type: type,
      url: sendableMsg.body.url ? sendableMsg.body.url : "",
      data: getMsgData(sendableMsg, type),
      ext: sendableMsg.body.ext
    },
    style: sendableMsg.body.from == myName ? "self" : "",
    time: sendableMsg.time || Date.now(),
    mid: sendableMsg.type + sendableMsg.id,
    id: sendableMsg.id,
    chatType: sendableMsg.body.chatType
  };

  if (type == msgType.IMAGE) {
    renderableMsg.msg.size = {
      width: sendableMsg.body.body.size.width,
      height: sendableMsg.body.body.size.height
    };
  } else if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
  } else if (type == msgType.FILE) {
    renderableMsg.msg.url = sendableMsg?.body?.body.url || "";
    renderableMsg.msg.filename = sendableMsg?.body?.body.filename || "";
    renderableMsg.msg.size = sendableMsg?.body?.body.file_length || 0;
  }

  return renderableMsg;

};
