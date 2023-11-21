export const CHAT_TYPE = {
  SINGLE_CHAT: 'singleChat',
  GROUP_CHAT: 'groupChat',
};
export const INFORM_TYPE = {
  CONTACTS: 'contacts',
  GROUPS: 'groups',
};
export const HANDLER_EVENT_NAME = {
  CONNECT_EVENT: 'connectEvent',
  MESSAGES_EVENT: 'messagesEvent',
  CONTACTS_EVENT: 'contactsEvent',
  GROUP_EVENT: 'groupEvent',
  ERROR_EVENT: 'errorEvent',
};

export const CONNECT_CALLBACK_TYPE = {
  CONNECT_CALLBACK: 'connected',
  DISCONNECT_CALLBACK: 'disconnected',
  RECONNECTING_CALLBACK: 'reconnecting',
  ERROR_CALLBACK: 'onerror',
};

export const SESSION_MESSAGE_TYPE = {
  img: '[图片]',
  file: '[文件]',
  audio: '[语音]',
  loc: '[位置]',
};

export const CUSTOM_TYPE = {
  userCard: '个人名片',
};
export const MESSAGE_TYPE = {
  IMAGE: 'img',
  TEXT: 'txt',
  LOCATION: 'location',
  VIDEO: 'video',
  AUDIO: 'audio',
  EMOJI: 'emoji',
  FILE: 'file',
  CUSTOM: 'custom',
};

export const EMOJI = {
  path: '@/static/images/faces',
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
export const EMOJIOBJ = {
  // 相对 emoji.js 路径
  path: '/static/images/faces',
  map1: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
  },
  map2: {
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    "[:'(]": 'ee_11.png',
    '[<o)]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
  },
  map3: {
    '[8-|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[|-)]': 'ee_17.png',
    '[:|]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[del]': 'del.png',
  },
  map4: {
    '[^o)]': 'ee_21.png',
    '[:-*]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
  },
  map5: {
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png',
  },
  map6: {
    '[del]': 'del.png',
  },
};
export const GROUP_ROLE_TYPE_NAME = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
};
export const GROUP_ROLE_TYPE = {
  [GROUP_ROLE_TYPE_NAME.OWNER]: 0,
  [GROUP_ROLE_TYPE_NAME.ADMIN]: 1,
  [GROUP_ROLE_TYPE_NAME.MEMBER]: 2,
};
