import { emGroups } from '@/EaseIM/emApis';
const { fetchJoinedGroupListFromServer } = emGroups();
const GroupStore = {
  state: {
    pageNum: 0,
    pageSize: 20,
    isLastPageStatus: false,
    joinedGroupList: [],
    joinedGroupTotal: 0,
  },
  mutations: {
    SET_JOINEND_GROUP_LIST: (state, payload) => {
      const { groupList, joinedGroupTotal } = payload;
      state.joinedGroupList = [...state.joinedGroupList, ...groupList];
      if (!state.joinedGroupTotal) {
        state.joinedGroupTotal = joinedGroupTotal;
      }
      if (groupList.length < state.pageSize) {
        state.isLastPageStatus = true;
      }
      state.pageNum = state.pageNum + 1;
    },
    ADD_NEW_JOINEND_GROUP: (state, group) => {
      state.joinedGroupList.unshift(group);
    },
    DELETE_JOINEND_GROUP: (state, groupId) => {
      state.joinedGroupList = state.joinedGroupList.filter(
        (group) => group.groupid !== groupId
      );
    },
  },
  actions: {
    fetchJoinedGroupList: async ({ state, commit }) => {
      try {
        console.log('获取群组列表————————', state.pageNum, state.pageSize);
        const joinedGroupList = await fetchJoinedGroupListFromServer(
          state.pageNum,
          state.pageSize
        );
        const { total, entities } = joinedGroupList;
        commit('SET_JOINEND_GROUP_LIST', {
          groupList: [...entities],
          joinedGroupTotal: total,
        });
      } catch (error) {
        console.log('>>>>>远端群组列表拉取失败', error);
        uni.showToast({
          title: '远端群组列表拉取失败',
          icon: 'none',
        });
      }
    },
  },
  getters: {
    joinedGroupList: (state) => state.joinedGroupList,
    joinedGroupTotal: (state) => state.joinedGroupTotal,
    isLastPageStatus: (state) => state.isLastPageStatus,
  },
};
export default GroupStore;
