import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      loginStatus: false,
      loginUserBaseInfos: {
        loginUserId: '',
        phoneNumber: '',
      },
      loginUserProfiles: {},
    };
  },
  actions: {
    setLoginStatus(status) {
      if (typeof status !== 'boolean') {
        throw '登录状态修改失败，请传入boolean类型';
      }
      this.loginStatus = status;
    },
    setLoginUserBaseInfos(baseInfos) {
      this.loginUserBaseInfos = Object.assign({}, baseInfos);
    },
    setLoginUserProfiles(profiles) {
      this.loginUserProfiles = Object.assign({}, profiles);
    },
  },
});
