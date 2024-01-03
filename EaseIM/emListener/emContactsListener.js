import { EMClient } from "../index";
import { getEMKey } from "@/EaseIM/utils";
import emContacts from "../emApis/emContacts";
import {
  HANDLER_EVENT_NAME,
  CHAT_TYPE,
  INFORM_TYPE,
  MESSAGE_TYPE,
  GRAY_INFORM_TYPE_SINGLE,
} from "../constant";
import store from "@/store";

export const emContactsListener = (callback, listenerEventName) => {
  console.log(">>>>>好友关系监听挂载");
  //自动通过用户好友申请
  const { acceptContactInvite } = emContacts();
  const handleAutoAcceptInvitation = async (contactsInform) => {
    const { from } = contactsInform;
    const res = uni.getStorageSync(`EM_${EMClient.user}_GENNERAL_CONFIG`);
    const { isAutoAcceptFriendRequest } = res || {};
    //未开启则新增好友邀请消息
    if (!isAutoAcceptFriendRequest) {
      reveiveFriendInvite({
        chatType: CHAT_TYPE.SINGLE_CHAT,
        ...contactsInform,
      });
      return;
    }
    try {
      await acceptContactInvite(from);
      uni.showToast({
        title: "自动通过好友申请",
        icon: "none",
        duration: 2000,
      });
    } catch (error) {
      uni.showToast({
        title: "自动通过好友申请失败",
        icon: "none",
        duration: 2000,
      });
    }
  };
  //变更当前好友列表数据
  const changeFriendList = (type, params) => {
    if (type === "INCREMENT") {
      const param = {
        remark: null,
        userId: params.from,
      };
      store.commit("SET_FROEND_LIST", param);
      store.dispatch("fetchFriendUserInfo", params.from);
      store.dispatch("subscribePresenceStatus", params.from);
    }
    if (type === "DECREMENT") {
      const friendId = params.from;
      store.commit("DELETE_FRIEND_ITEM", friendId);
      store.dispatch("unsubscribePresenceStatus", friendId);
      store.commit("DELETE_PRESENCE_ITEM", friendId);
    }
  };
  const addNewInformFunc = (params) => {
    store.commit("ADD_NEW_INFORM", {
      informType: INFORM_TYPE.CONTACTS,
      inform: params,
    });
  };
  //处理新邀请更新至邀请信息缓存store
  const reveiveFriendInvite = (params) => {
    store.commit("ADD_NEW_RECEIVE_INVITE_MSG", params);
  };
  //构造inform消息体
  const addGrayInformMessage = (params) => {
    const message = {
      from: params.from,
      to: params.to,
      chatType: CHAT_TYPE.SINGLE_CHAT,
      type: MESSAGE_TYPE.GRAY_INFORM,
      time: Date.now(),
      grayInformType: params.grayInformType,
    };

    const key = getEMKey(
      EMClient.user,
      message.from,
      message.to,
      message.chatType
    );
    store.commit("ADD_NEW_GRAY_INFORM_MESSAGE", { key, message });
  };
  const contactsListenFunc = {
    // 当前用户收到好友请求。用户 B 向用户 A 发送好友请求，用户 A 收到该事件。
    onContactInvited: function (msg) {
      const contactsInform = Object.assign({}, msg);
      callback && callback(contactsInform);
      //   addNewInformFunc({ ...msg });
      //如果本地配置开启了自动通过好友申请，则自动调用同意好友申请
      handleAutoAcceptInvitation(contactsInform);
    },
    // 当前用户被其他用户从联系人列表上移除。用户 B 将用户 A 从联系人列表上删除，用户 A 收到该事件。
    onContactDeleted: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
      changeFriendList("DECREMENT", msg);
    },
    // 当前用户新增了联系人。用户 B 向用户 A 发送好友请求，用户 A 同意该请求，用户 A 收到该事件，而用户 B 收到 `onContactAgreed` 事件。
    onContactAdded: function (msg) {
      callback && callback(msg);
      addNewInformFunc(msg);
      const msgBody = Object.assign({}, msg);
      msgBody.grayInformType = GRAY_INFORM_TYPE_SINGLE.CONTACT_ADDED;
      //增加聊天页内灰色通知消息
      addGrayInformMessage(msgBody);
      //更新好友列表
      changeFriendList("INCREMENT", msgBody);
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
      const msgBody = Object.assign({}, msg);
      msgBody.grayInformType = GRAY_INFORM_TYPE_SINGLE.CONTACT_AGREED;
      addGrayInformMessage(msgBody);
      changeFriendList("INCREMENT", msgBody);
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
