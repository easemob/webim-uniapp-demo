import { emGroups } from '@/EaseIM/emApis';
const { fetchJoinedGroupListFromServer } = emGroups();
const groupStore = {
  state: {
    joinedGroupList: [],
  },
  mutations: {
    SET_JOINEND_GROUP_LIST: (state, groupList) => {
      state.joinedGroupList = [...groupList];
    },
    ADD_NEW_JOINEND_GROUP: (state, group) => {
      state.joinedGroupList.unshift(group);
    },
    DELETE_JOINEND_GROUP: (state, groupId) => {
      state.joinedGroupList = this.joinedGroupList.filter(
        (group) => group.groupid !== groupId
      );
    },
  },
  actions: {
    fetchJoinedGroupList: async ({ commit }) => {
      try {
        const joinedGroupList = await fetchJoinedGroupListFromServer();
        commit('SET_JOINEND_GROUP_LIST', joinedGroupList);
      } catch (error) {
        console.log('>>>>>远端群组列表拉取失败', error);
      }
    },
  },
  getters: {},
};
export default groupStore;
