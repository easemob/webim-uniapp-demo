import { emContacts, emUserInfos, emPresence } from '@/EaseIM/emApis';
import Vue from 'vue';
import { handlePresence } from '@/EaseIM/utils';
import { EMClient } from '@/EaseIM';
import _ from 'lodash';
const { fetchContactsListFromServer, getBlocklistFromServer } = emContacts();
const { fetchOtherInfoFromServer } = emUserInfos();
const { subscribePresence, unsubscribePresence } = emPresence();
const ContactsStore = {
  state: {
    friendList: [],
    friendUserInfoCollection: {}, //用对象替换好友属性集合
    blockUserList: [],
    subscribeStatusInfoMap: {}, //好友用户在线状态
    loginUserPresenceInfoMap: {}, //自己的用户状态变更
  },
  mutations: {
    RESET_CONTACTS_STORE: (state) => {
      state.friendList = [];
      state.friendUserInfoCollection = {};
      state.blockUserList = [];
    },
    SET_FROEND_LIST: (state, payload) => {
      let newFriendList = [];
      if (state.friendList.length === 0) {
        if (Array.isArray(payload)) {
          newFriendList = [...payload];
        } else {
          newFriendList = [payload];
        }
      } else {
        if (Array.isArray(payload)) {
          newFriendList = [...state.friendList, ...payload];
        } else {
          newFriendList = [...state.friendList, payload];
        }
      }
      // 去重
      const uniqueArray = _.uniqBy(
        _.reverse(newFriendList),
        'userId'
      ).reverse();
      // 更新 state
      Vue.set(state, 'friendList', uniqueArray);
    },
    DELETE_FRIEND_ITEM: (state, friendId) => {
      state.friendList.map((item, idnex) => {
        if (item.userId === friendId) {
          state.friendList.splice(idnex, 1);
        }
      });
    },
    SET_FRIEND_USER_INFO_COLLECTION: (state, friendProfiles) => {
      if (Object.keys(friendProfiles).length) {
        for (const key in friendProfiles) {
          if (Object.hasOwnProperty.call(friendProfiles, key)) {
            const values = friendProfiles[key];
            Object.values(values).length &&
              Vue.set(state.friendUserInfoCollection, key, values);
          }
        }
      }
    },
    SET_BLOCK_USER_LIST: (state, userList) => {
      state.blockUserList = [...userList];
    },
    UPDATE_FRIEND_USER_REMARK: (state, { contactId, remark }) => {
      state.friendList.map((item) => {
        if (item.userId === contactId) {
          Vue.set(item, 'remark', remark);
        }
      });
      //   Vue.set(state.friendUserInfoCollection[contactId], 'remark', remark);
    },
    // 好友在线状态
    SET_FRIENDSTATUS_STATUS_INFO: (state, subscribeStatus) => {
      subscribeStatus.map((item) => {
        // console.log("用户在线状态", handlePresence(item));
        const commonStatus = handlePresence(item);
        const matchingFriend = state.friendList.find(
          (friend) => friend.userId === commonStatus.uid
        );
        if (matchingFriend) {
          Vue.set(
            state.subscribeStatusInfoMap,
            matchingFriend.userId,
            commonStatus
          );
        } else {
          Vue.set(state.subscribeStatusInfoMap, commonStatus.uid, commonStatus);
        }
      });
      console.log('用户在线状态', state.subscribeStatusInfoMap);
    },
    // 自己状态变更
    SET_SUBSCRIBE_STATUS_INFO_LOGIN_USER: (state, subscribeStatus) => {
      if (Object.keys(subscribeStatus).length) {
        for (const key in subscribeStatus) {
          if (Object.hasOwnProperty.call(subscribeStatus, key)) {
            const values = subscribeStatus[key];
            Object.values(values).length &&
              Vue.set(state.loginUserPresenceInfoMap, key, values);
          }
        }
      }
      console.log('自己的状态变更', state.loginUserPresenceInfoMap);
    },
    // 取消订阅删除对应的好友状态
    DELETE_PRESENCE_ITEM: (state, friendId) => {
      for (const key in state.subscribeStatusInfoMap) {
        if (
          Object.values(state.subscribeStatusInfoMap[key]).includes(friendId)
        ) {
          Vue.delete(state.subscribeStatusInfoMap, key);
        }
      }
    },
  },
  actions: {
    async fetchFriendList({ commit }) {
      try {
        const friendList = await fetchContactsListFromServer();
        commit('SET_FROEND_LIST', friendList);
      } catch (error) {
        console.log('>>>>好友列表获取失败', error);
      }
    },
    //批量获取好友列表对应的用户属性
    async fetchFriendUserInfoCollection({ state, commit }) {
      try {
        const friendProfiles = await fetchOtherInfoFromServer(
          state.friendList.map((item) => item.userId)
        );
        console.log('friendProfiles', friendProfiles);
        commit('SET_FRIEND_USER_INFO_COLLECTION', friendProfiles);
      } catch (error) {
        console.log('>>>>获取好友属性失败', error);
      }
    },
    //获取单个用户的用户属性
    async fetchFriendUserInfo({ state, commit }, userId) {
      try {
        const friendProfile = await fetchOtherInfoFromServer([userId]);
        console.log('>>>>获取单个用户属性执行', friendProfile);
        commit('SET_FRIEND_USER_INFO_COLLECTION', friendProfile);
      } catch (error) {
        console.log('>>>>获取好友属性失败', error);
      }
    },
    async fetchBlockUserList({ commit }) {
      try {
        const userList = await getBlocklistFromServer();
        console.log('>>>>getBlocklistFromServer', userList);
        commit('SET_BLOCK_USER_LIST', userList);
      } catch (error) {
        console.log('>>>>获取好友黑名单失败', error);
      }
    },
    // 订阅用户的在线状态
    async subscribePresenceStatus({ state, commit }) {
      try {
        const subscribeStatus = await subscribePresence(
          state.friendList.map((item) => item.userId)
        );
        commit('SET_FRIENDSTATUS_STATUS_INFO', subscribeStatus);
        console.log('>>>>订阅用户在线状态', subscribeStatus);
      } catch (error) {
        console.log('>>>>订阅用户在线状态失败', error);
      }
    },
    // 取消订阅
    async unsubscribePresenceStatus({ state, commit }, userId) {
      try {
        const subscribeStatus = await unsubscribePresence(userId);
      } catch (error) {
        console.log('>>>>取消订阅用户在线状态失败', error);
      }
    },
    // 处理状态变更
    async handlePresenceChanges({ state, commit }, status) {
      const { userId } = status || {};
      if (userId === EMClient.user) {
        commit('SET_SUBSCRIBE_STATUS_INFO_LOGIN_USER', status);
      } else {
        commit('SET_FRIENDSTATUS_STATUS_INFO', [{ ...status }]);
      }
    },
  },
  getters: {
    friendUserInfoCollection(state) {
      return state.friendUserInfoCollection;
    },
    friendList(state) {
      return state.friendList;
    },
    blockUserList(state) {
      return state.blockUserList;
    },
    subscribeStatusInfoMap(state) {
      return state.subscribeStatusInfoMap;
    },
  },
};
export default ContactsStore;
