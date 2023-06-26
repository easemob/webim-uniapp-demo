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
    setFriendUserInfotoMap(friendList) {
      if (Object.keys(friendList).length) {
        for (const key in friendList) {
          if (Object.hasOwnProperty.call(friendList, key)) {
            const values = friendList[key];
            Object.values(values).length &&
              this.friendUserInfoMap.set(key, values);
          }
        }
      }
    },
  },
});
