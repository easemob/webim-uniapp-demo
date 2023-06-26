/* 用以获取消息存储格式时的key */
const getEMKey = (loginId, fromId, toId, chatType) => {
  let key = '';
  if (chatType === 'singleChat') {
    if (loginId === fromId) {
      key = toId;
    } else {
      key = fromId;
    }
  } else if (chatType === 'groupChat') {
    key = toId;
  }
  return key;
};
export default getEMKey;
