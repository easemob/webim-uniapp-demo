const Emoji = {
  path: '../static/images/faces/',
  map: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    "[:'(]": 'ee_11.png',
    '[<o)]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[8-|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[|-)]': 'ee_17.png',
    '[:|]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[^o)]': 'ee_21.png',
    '[:-*]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[del]': 'btn_del.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png',
  },
};

const parseEmoji = (msg) => {
  if (typeof Emoji === 'undefined' || typeof Emoji.map === 'undefined') {
    return msg;
  }

  var emoji = Emoji,
    reg = null;
  var msgList = [];
  var objList = [];

  for (var face in emoji.map) {
    if (emoji.map.hasOwnProperty(face)) {
      while (msg.indexOf(face) > -1) {
        msg = msg.replace(face, '^' + emoji.map[face] + '^');
      }
    }
  }

  var ary = msg.split('^');
  var reg = /^e.*g$/;

  for (var i = 0; i < ary.length; i++) {
    if (ary[i] != '') {
      msgList.push(ary[i]);
    }
  }

  for (var i = 0; i < msgList.length; i++) {
    if (reg.test(msgList[i])) {
      var obj = {};
      obj.data = msgList[i];
      obj.type = 'emoji';
      objList.push(obj);
    } else {
      var obj = {};
      obj.data = msgList[i];
      obj.type = 'txt';
      objList.push(obj);
    }
  }

  return objList;
};
export default parseEmoji;
