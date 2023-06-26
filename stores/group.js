import { defineStore } from 'pinia';
export const useGroupStore = defineStore('group', {
  state: () => ({
    joinedGroupList: [],
  }),
  actions: {
    setJoinedGroupList(joinedGroupList) {
      this.joinedGroupList = Object.assign([], joinedGroupList);
    },
    addNewGroup(params) {
      this.joinedGroupList.unshift(params);
    },
    removeGroup(groupId) {
      this.joinedGroupList = this.joinedGroupList.filter(
        (group) => group.groupid !== groupId
      );
    },
  },
});
