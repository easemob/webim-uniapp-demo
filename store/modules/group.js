import Vue from 'vue';
import { emUserInfos, emGroups } from '@/EaseIM/emApis';
import { convertGroupDetailsToGroupList } from '@/EaseIM/utils';
const { fetchOtherInfoFromServer } = emUserInfos();
const {
  getMultiGroupAttributesFromServer,
  fetchJoinedGroupListFromServer,
  removeGroupMembers,
} = emGroups();
const GroupStore = {
  state: {
    pageNum: 0,
    pageSize: 20,
    isLastPageStatus: false,
    joinedGroupList: [],
    joinedGroupTotal: 0,
    groupMembersProfile: {},
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
        (group) => group.groupId !== groupId
      );
      state.joinedGroupTotal = state.joinedGroupTotal - 1;
    },
    UPDATE_JOINED_GROUP_DATA: (state, payload) => {
      const { groupDetail } = payload;
      const convertGroupDetails = convertGroupDetailsToGroupList(groupDetail);
      const index = state.joinedGroupList.findIndex(
        (item) => item.groupId === convertGroupDetails.groupId
      );
      const oldGroupData = state.joinedGroupList[index];
      const newGroupDetails = { ...oldGroupData, ...convertGroupDetails };
      state.joinedGroupList[index] = newGroupDetails;
    },
    SET_GROUP_MEMBERS_PROFILE: (state, payload) => {
      const { groupId, groupMembersProfile } = payload;
      if (!state.groupMembersProfile[groupId]) {
        Vue.set(state.groupMembersProfile, groupId, {});
      }
      state.groupMembersProfile[groupId] = {
        ...state.groupMembersProfile[groupId],
        ...groupMembersProfile,
      };
    },
    DELETE_GROUP_MEMBERS_PROFILE: (state, payload) => {
      const { groupId, memberList } = payload;
      if (state.groupMembersProfile[groupId]) {
        memberList.forEach((userId) => {
          Vue.delete(state.groupMembersProfile[groupId], userId);
        });
      }
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
    fetchGroupMembersProfile: async ({ commit }, params) => {
      const { groupId, memberList } = params;
      //获取对应用户属性
      const profileRes = await fetchOtherInfoFromServer(memberList);
      //获取对应群成员属性
      const groupAttributesRes = await getMultiGroupAttributesFromServer({
        groupId,
        userIds: memberList,
        keys: ['nickName'],
      });
      commit('SET_GROUP_MEMBERS_PROFILE', {
        groupId,
        groupMembersProfile: Object.assign(
          { ...groupAttributesRes },
          { ...profileRes }
        ),
      });
    },
    deleteInGroupMembers: async ({ commit }, params) => {
      const { groupId, memberList } = params;
      return new Promise((resolve, reject) => {
        removeGroupMembers(groupId, memberList)
          .then((res) => {
            resolve(res);
            commit('DELETE_GROUP_MEMBERS_PROFILE', {
              groupId,
              memberList,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    joinedGroupList: (state) => state.joinedGroupList,
    joinedGroupTotal: (state) => state.joinedGroupTotal,
    isLastPageStatus: (state) => state.isLastPageStatus,
    groupMembersProfile: (state) => state.groupMembersProfile,
  },
};
export default GroupStore;
