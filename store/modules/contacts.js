import { emContacts, emUserInfos } from '@/EaseIM/emApis';
const { fetchContactsListFromServer } = emContacts();
const { fetchOtherInfoFromServer } = emUserInfos();
const ContactsStore = {
  state: {
    friendList: [],
    friendUserInfoMap: new Map(), //好友属性
  },
  mutations: {
    SET_FROEND_LIST: (state, friendList) => {
      state.friendList = [...friendList];
    },
    SET_FRIEND_USER_INFO: (state, friendProfiles) => {
      if (Object.keys(friendProfiles).length) {
        for (const key in friendProfiles) {
          if (Object.hasOwnProperty.call(friendProfiles, key)) {
            const values = friendProfiles[key];
            Object.values(values).length &&
              state.friendUserInfoMap.set(key, values);
          }
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
    async setFriendUserInfotoMap({ state, commit }) {
      if (state.friendList.length) {
        try {
          const friendProfiles = await fetchOtherInfoFromServer(
            state.friendList
          );
          commit('SET_FRIEND_USER_INFO', friendProfiles);
        } catch (error) {
          console.log('>>>>>好友属性获取失败', error);
        }
      }
    },
  },
  getters: {
    friendUserInfoMap(state) {
      return state.friendUserInfoMap;
    },
    friendList(state) {
      return state.friendList;
    },
  },
};
export default ContactsStore;
