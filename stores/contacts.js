import { defineStore } from 'pinia';

export const useContactsStore = defineStore('contacts', {
  state: () => {
    return {
      friendList: [],
      friendUserInfoMap: new Map(), //好友属性
    };
  },
  actions: {
    setFriendList(friendList) {
      this.friendList = Object.assign([], friendList);
    },
    setFriendUserInfotoMap(friendInfos) {
      if (Object.keys(friendInfos).length) {
        for (const key in friendInfos) {
          if (Object.hasOwnProperty.call(friendInfos, key)) {
            const values = friendInfos[key];
            Object.values(values).length &&
              this.friendUserInfoMap.set(key, values);
          }
        }
      }
    },
    //本地添加但环信远端会同步好友关系
    addNewFriendToFriendList(friendUserId) {
      friendUserId && this.friendList.push(friendUserId);
    },
    //本地列表删除但环信远端会同步好友关系
    deleteFriendFromFriendList(friendUserId) {
      friendUserId &&
        this.friendList.filter((userId) => friendUserId != userId);
    },
  },
});
