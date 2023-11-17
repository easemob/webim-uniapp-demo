import { EMClient } from '@/EaseIM';
const ReceiveInviteStore = {
  state: {
    receiveInviteList: [],
  },
  mutations: {
    INIT_RECEIVE_INVITE_LIST(state, payload) {
      state.receiveInviteList = uni.getStorageSync(
        `EM_${EMClient.user}_RECEOVE_INVITE_LIST`
      );
    },
    ADD_NEW_RECEIVE_INVITE_MSG(state, payload) {
      console.log('UPDATE_RECEIVE_INVITE_LIST', payload);
      const params = {
        isHandled: false,
        ...payload,
      };
      const _index = state.receiveInviteList.findIndex(
        (item) => item.from === payload.from
      );
      //如果邀请已经存在且类型相同
      if (
        _index > -1 &&
        payload.chatType === state.receiveInviteList[_index].chatType
      ) {
        console.log('>>>>存在相同邀请进行删除使用最新邀请');
        state.receiveInviteList.splice(_index, 1);
      }
      console.log('>>>>>_index', _index);
      state.receiveInviteList.unshift(params);
      uni.setStorageSync(
        `EM_${EMClient.user}_RECEOVE_INVITE_LIST`,
        state.receiveInviteList
      );
    },
    UPDATE_RECEIVE_INVITE_LIST(state, payload) {
      console.log('UPDATE_RECEIVE_INVITE_LIST', payload);
      uni.setStorageSync(
        `EM_${EMClient.user}_RECEOVE_INVITE_LIST`,
        state.receiveInviteList
      );
    },
  },
  actions: {},
  getters: {
    getReceiveInviteList(state) {
      return state.receiveInviteList;
    },
  },
};

export default ReceiveInviteStore;
