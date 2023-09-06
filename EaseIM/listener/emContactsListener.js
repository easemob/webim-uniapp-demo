import { EMClient } from '../index';
import { HANDLER_EVENT_NAME } from '../constant';
import { useInformStore } from '@/stores/inform';
import { useContactsStore } from '@/stores/contacts';
import { emUserInfos } from '@/EaseIM/imApis';
export const emContactsListener = (callback, listenerEventName) => {
  const informStore = useInformStore();
  const contactsStore = useContactsStore();
  const { fetchOtherInfoFromServer } = emUserInfos();
  console.log('>>>>>好友关系监听挂载');
  const contactsListenFunc = {
    // 当前用户收到好友请求。用户 B 向用户 A 发送好友请求，用户 A 收到该事件。
    onContactInvited: function (msg) {
      const contactsInform = Object.assign({}, msg);
      callback && callback(contactsInform);
      informStore.addNewInform('contacts', contactsInform);
    },
    // 当前用户被其他用户从联系人列表上移除。用户 B 将用户 A 从联系人列表上删除，用户 A 收到该事件。
    onContactDeleted: function (msg) {
      callback && callback(msg);
      contactsStore.deleteFriendFromFriendList(msg.from);
    },
    // 当前用户新增了联系人。用户 B 向用户 A 发送好友请求，用户 A 同意该请求，用户 A 收到该事件，而用户 B 收到 `onContactAgreed` 事件。
    onContactAdded: function (msg) {
      callback && callback(msg);
    },
    // 当前用户发送的好友请求被拒绝。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，拒绝加好友，则用户 A 收到该事件。
    onContactRefuse: function (msg) {
      callback && callback(msg);
    },
    // 当前用户发送的好友请求经过了对方同意。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，同意加好友，则用户 A 收到该事件。
    onContactAgreed: async function (msg) {
      callback && callback(msg);
      contactsStore.addNewFriendToFriendList(msg.from);
      try {
        const friendProfiles = await fetchOtherInfoFromServer([msg.from]);
        contactsStore.setFriendUserInfotoMap(friendProfiles);
      } catch (error) {
        console.log('>>>>好友info获取失败', error);
      }
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
