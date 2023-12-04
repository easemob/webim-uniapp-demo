import Vue from 'vue';
import { emMessages } from '@/EaseIM/emApis';
const { fetchHistoryMessagesFromServer } = emMessages();
const MessageStore = {
  state: {
    messageCollection: {},
    messageStatusCollection: {}, //readed、unread、recalled
  },
  mutations: {
    UPDATE_MESSAGE_COLLECTION(state, payload) {
      const { key, message } = payload;
      if (!state.messageCollection[key]) {
        /**
         * Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，
         * 因此使用Vue.set()方法，新增属性引起视图变化。
         */
        Vue.set(state.messageCollection, key, []);
      }
      state.messageCollection[key].push(message);
    },
    UPDATE_MESSAGE_FROM_SERVER(state, payload) {
      const { key, messageList } = payload;
      if (state.messageCollection[key]) {
        state.messageCollection[key].unshift(...messageList);
      } else {
        Vue.set(state.messageCollection, key, []);
        state.messageCollection[key].push(...messageList);
      }
    },
  },
  actions: {
    async fetchHistroyMessageListFromServer({ state, commit }, params) {
      const { targetId, chatType } = params;
      const sourceMessage = state.messageCollection[targetId] || [];
      const cursorMsgId = (sourceMessage.length && sourceMessage[0]?.id) || -1;

      return new Promise((resolve, reject) => {
        fetchHistoryMessagesFromServer({
          targetId,
          chatType,
          cursor: cursorMsgId,
        })
          .then((res) => {
            if (res.messages.length) {
              commit('UPDATE_MESSAGE_FROM_SERVER', {
                key: targetId,
                messageList: res.messages.reverse(),
              });
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    messageCollection(state) {
      return state.messageCollection;
    },
  },
};
export default MessageStore;
