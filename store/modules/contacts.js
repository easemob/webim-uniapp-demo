import { emContacts, emUserInfos } from '@/EaseIM/emApis';
import Vue from 'vue';
const { fetchContactsListFromServer, getBlocklistFromServer } = emContacts();
const { fetchOtherInfoFromServer } = emUserInfos();
const ContactsStore = {
  state: {
    friendList: [],
    friendUserInfoCollection: {}, //用对象替换好友属性集合
    blockUserList: [],
  },
  mutations: {
    RESET_CONTACTS_STORE: (state) => {
      state.friendList = [];
      state.friendUserInfoCollection = {};
      state.blockUserList = [];
    },
    SET_FROEND_LIST: (state, payload) => {
      if (state.friendList.length === 0) {
        if (Array.isArray(payload)) {
          Vue.set(state, 'friendList', [...payload]);
        } else {
          Vue.set(state, 'friendList', [payload]);
        }
      } else {
        if (Array.isArray(payload)) {
          Vue.set(state, 'friendList', [...state.friendList, ...payload]);
        } else {
          Vue.set(state, 'friendList', [...state.friendList, payload]);
        }
      }
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
  },
};
export default ContactsStore;
