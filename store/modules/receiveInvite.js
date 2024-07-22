import { EMClient } from '@/EaseIM';
import Vue from 'vue';
const ReceiveInviteStore = {
  state: {
    receiveInviteList: [],
  },
  mutations: {
    RESET_RECEIVE_INVITE_STIRE: (state) => {
      state.receiveInviteList = [];
    },
    INIT_RECEIVE_INVITE_LIST(state, payload) {
      const res = uni.getStorageSync(`EM_${EMClient.user}_RECEOVE_INVITE_LIST`);
      res && state.receiveInviteList.push(...res);
      !res && (state.receiveInviteList = []);
    },
    ADD_NEW_RECEIVE_INVITE_MSG(state, payload) {
      console.log('UPDATE_RECEIVE_INVITE_LIST', payload);
      const params = {
        isHandled: false,
        ...payload,
      };
      if (state.receiveInviteList.length) {
        const _index = state.receiveInviteList.findIndex(
          (item) => item.from === payload.from
        );
        //如果邀请已经存在且类型相同
        if (
          _index > -1 &&
          payload.chatType === state.receiveInviteList[_index].chatType
        ) {
          state.receiveInviteList.splice(_index, 1, params);
        } else {
          state.receiveInviteList.unshift(params);
        }
      } else {
        state.receiveInviteList.push(params);
      }
      uni.setStorageSync(
        `EM_${EMClient.user}_RECEOVE_INVITE_LIST`,
        state.receiveInviteList
      );
    },
    UPDATE_RECEIVE_INVITE_LIST(state, payload) {
      console.log('UPDATE_RECEIVE_INVITE_LIST', payload);
      const { from } = payload;
      //目前只有已添加状态，因此触发更新，固定只追加一个added属性
      const _index = state.receiveInviteList.findIndex(
        (item) => item.from === from
      );
      console.log('>>>>>_index', _index);
      state.receiveInviteList[_index].isHandled = true;
      Vue.set(state.receiveInviteList[_index], 'added', true);
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
