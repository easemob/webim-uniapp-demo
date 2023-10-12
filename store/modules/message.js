import { emMessages } from '@/EaseIM/emApis';
const { fetchHistoryMessagesFromServer } = emMessages();
const MessageStore = {
  state: {
    messageCollection: {},
  },
  mutations: {
    UPDATE_MESSAGE_COLLECTION(state, payload) {
      const { key, message } = payload;
      if (!state.messageCollection[key]) {
        state.messageCollection[key] = [];
      }
      state.messageCollection[key].push(message);
    },
    UPDATE_MESSAGE_FROM_SERVER(state, payload) {
      const { key, messageList } = payload;
      if (state.messageCollection[key]) {
        state.messageCollection[key].unshift(...messageList);
      } else {
        state.messageCollection[key] = [];
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
