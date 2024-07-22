import Vue from "vue";
import _ from "lodash";
import { GROUP_ROLE_TYPE_NAME } from "@/EaseIM/constant";
import { emUserInfos, emGroups } from "@/EaseIM/emApis";
import { convertGroupDetailsToGroupList } from "@/EaseIM/utils";
const { fetchOtherInfoFromServer } = emUserInfos();
const {
  getMultiGroupAttributesFromServer,
  fetchJoinedGroupListFromServer,
  removeGroupMembers,
  changeGroupOwner,
} = emGroups();
const GroupStore = {
  state: {
    /* 默认存储在state中的分页参数 */
    pageNum: 0,
    pageSize: 20,
    joinedGroupList: [],
    joinedGroupTotal: 0,
    groupMembersProfile: {},
  },
  mutations: {
    RESET_GROUP_STORE: (state) => {
      state.pageNum = 0;
      state.pageSize = 20;
      state.joinedGroupList = [];
      state.joinedGroupTotal = 0;
      state.groupMembersProfile = {};
    },
    UPDATE_PAGE_PARAMS: (state, payload) => {
      if (payload.pageNum !== undefined) {
        state.pageNum = payload.pageNum;
      }
      if (state.pageSize !== undefined) {
        state.pageSize = state.pageSize;
      }
    },
    SET_JOINEND_GROUP_LIST: (state, payload) => {
      const { isInit, groupList, joinedGroupTotal } = payload;
      if (isInit) {
        state.joinedGroupList = [...groupList];
        state.pageNum = 0;
      } else {
        state.joinedGroupList = [...state.joinedGroupList, ...groupList];
      }
      state.joinedGroupTotal = joinedGroupTotal;
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
      const _index = state.joinedGroupList.findIndex(
        (item) => item.groupId === convertGroupDetails.groupId
      );
      const oldGroupData = state.joinedGroupList[_index];
      const newGroupDetails = Object.assign(oldGroupData, convertGroupDetails);
      state.joinedGroupList.splice(_index, 1, newGroupDetails);
    },
    SET_GROUP_MEMBERS_PROFILE: (state, payload) => {
      console.log("111",payload)
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
    TRANSFER_GROUP_OWNER: (state, payload) => {
      const { groupId, newOwner } = payload;
      const soureData = state.joinedGroupList.find(
        (group) => group.groupId === groupId
      );
      const _index = state.joinedGroupList.findIndex(
        (group) => group.groupId === groupId
      );
      if (soureData && _index > -1) {
        soureData.role = GROUP_ROLE_TYPE_NAME.MEMBER;
        soureData.owner = newOwner;
      }
      state.joinedGroupList.splice(_index, 1, soureData);
    },
    CHANGE_AFFILIATIONS_COUNT: (state, payload) => {
      const { groupId, count } = payload;
      const soureData = state.joinedGroupList.find(
        (group) => group.groupId === groupId
      );
      const _index = state.joinedGroupList.findIndex(
        (group) => group.groupId === groupId
      );
      if (soureData && _index > -1) {
        if (count > 0) {
          soureData.affiliationsCount = soureData.affiliationsCount + 1;
        } else {
          soureData.affiliationsCount = soureData.affiliationsCount - 1;
        }
      }
      soureData && state.joinedGroupList.splice(_index, 1, soureData);
    },
  },
  actions: {
    fetchJoinedGroupList: async ({ state, commit }, params) => {
      //isInit 为是否从头获取
      const { isInit } = params;
      const param = {
        pageNum: isInit ? 0 : params.pageNum,
        pageSize: isInit ? 20 : params.pageSize,
      };
      return new Promise((resolve, reject) => {
        fetchJoinedGroupListFromServer(param.pageNum, param.pageSize)
          .then((joinedGroupList) => {
            const { total, entities } = joinedGroupList;
            console.log("total, entities ", total, entities);
            commit("SET_JOINEND_GROUP_LIST", {
              isInit,
              groupList: [...entities],
              joinedGroupTotal: total,
            });
            resolve(joinedGroupList);
          })
          .catch((error) => {
            console.log(">>>>>远端群组列表拉取失败", error);
            reject(error);
          });
      });
    },
    fetchGroupMembersProfile: async ({ commit }, params) => {
      console.log("fetchGroupMembersProfile", params);
      const { groupId, memberList } = params;
      //获取对应用户属性
      const profileRes = await fetchOtherInfoFromServer(memberList);
      //获取对应群成员属性
      const groupAttributesRes = await getMultiGroupAttributesFromServer({
        groupId,
        userIds: memberList,
        keys: ["nickName"],
      });
      commit("SET_GROUP_MEMBERS_PROFILE", {
        groupId,
        groupMembersProfile: _.merge(groupAttributesRes, profileRes),
      });
    },
    deleteInGroupMembers: async ({ commit }, params) => {
      const { groupId, memberList } = params;
      return new Promise((resolve, reject) => {
        removeGroupMembers(groupId, memberList)
          .then((res) => {
            resolve(res);
            /**
             * 目前依赖memberAbsence，事件调用DELETE_GROUP_MEMBERS_PROFILE。
             * 删除群内信息，因此暂时注释
             */
            // commit('DELETE_GROUP_MEMBERS_PROFILE', {
            //   groupId,
            //   memberList,
            // });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    transferGroupOwners: async ({ commit }, params) => {
      const { groupId, newOwner } = params;
      return new Promise((resolve, reject) => {
        changeGroupOwner(groupId, newOwner)
          .then((res) => {
            commit("TRANSFER_GROUP_OWNER", { groupId, newOwner });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    groupPageParams: (state) => {
      return {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      };
    },
    joinedGroupList: (state) => state.joinedGroupList,
    joinedGroupTotal: (state) => state.joinedGroupTotal,
    groupMembersProfile: (state) => state.groupMembersProfile,
  },
};
export default GroupStore;
