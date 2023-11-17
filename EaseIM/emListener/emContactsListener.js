import { EMClient } from '../index';
import { HANDLER_EVENT_NAME, INFORM_TYPE, CHAT_TYPE } from '../constant';
import store from '@/store';
console.log('>>>>>>vuex store', store);
export const emContactsListener = (callback, listenerEventName) => {
  console.log('>>>>>好友关系监听挂载');
  const addNewInformFunc = (params) => {
    store.commit('ADD_NEW_INFORM', {
      informType: INFORM_TYPE.CONTACTS,
      inform: params,
    });
  };
  //处理新邀请更新至邀请信息缓存store
  const reveiveFriendInvite = (params) => {
    store.commit('ADD_NEW_RECEIVE_INVITE_MSG', params);
  };
  const contactsListenFunc = {
    // 当前用户收到好友请求。用户 B 向用户 A 发送好友请求，用户 A 收到该事件。
    onContactInvited: function (msg) {
      const contactsInform = Object.assign({}, msg);
      callback && callback(contactsInform);
      addNewInformFunc({ ...msg });
      reveiveFriendInvite({ chatType: CHAT_TYPE.SINGLE_CHAT, ...msg });
    },
    // 当前用户被其他用户从联系人列表上移除。用户 B 将用户 A 从联系人列表上删除，用户 A 收到该事件。
    onContactDeleted: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
    },
    // 当前用户新增了联系人。用户 B 向用户 A 发送好友请求，用户 A 同意该请求，用户 A 收到该事件，而用户 B 收到 `onContactAgreed` 事件。
    onContactAdded: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
    },
    // 当前用户发送的好友请求被拒绝。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，拒绝加好友，则用户 A 收到该事件。
    onContactRefuse: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
    },
    // 当前用户发送的好友请求经过了对方同意。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，同意加好友，则用户 A 收到该事件。
    onContactAgreed: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.CONTACTS_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.CONTACTS_EVENT,
    contactsListenFunc
  );
};
