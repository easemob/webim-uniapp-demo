import Vue from 'vue';
import store from '../index';
import { emMessages } from '@/EaseIM/emApis';
import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/EaseIM/constant';
import ConversationStore from './conversation';
import { EVENT_BUS_NAME } from '@/constant';
const { fetchHistoryMessagesFromServer } = emMessages();
const MessageStore = {
  state: {
    messageCollection: {},
    messageStatusCollection: {}, //readed、unread、recalled
  },
  mutations: {
    RESET_MESSAGE_STORE: (state) => {
      state.messageCollection = {};
      state.messageStatusCollection = {};
    },
    UPDATE_MESSAGE_COLLECTION(state, payload) {
      const { key, message } = payload;
      if (!state.messageCollection[key]) {
        /**
         * Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，
         * 因此使用Vue.set()方法，新增属性引起视图变化。
         */
        Vue.set(state.messageCollection, key, []);
      }
      //如果当前会话中Id为消息from，则发布消息列表更新事件。
      if (ConversationStore.state.chattingId === key) {
        uni.$emit(EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_UPDATE, {
          msgBody: message,
        });
      }

      state.messageCollection[key].unshift(message);
    },
    DELETE_MESSAGE_FROM_COLLECTION(state, payload) {
      const { key, mid } = payload;
      //!现有逻辑如果传了mid，则删除单条，否则置空key。
      if (mid) {
        if (state.messageCollection[key]) {
          const _index = state.messageCollection[key].findIndex(
            (item) => item.id == mid
          );
          console.log('>>>>>>找到对应的下标', _index);
          if (_index >= 0) {
            state.messageCollection[key].splice(_index, 1);
            //如果当前会话中Id为消息from，则发布消息列表更新事件。
            if (ConversationStore.state.chattingId === key) {
              uni.$emit(EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_DELETE, {
                mid: mid,
              });
            }
          }
        }
      } else {
        if (state.messageCollection[key]) {
          Vue.set(state.messageCollection, key, []);
        }
      }
    },
    MODIFY_MESSAGE_FROM_COLLECTION(state, payload) {
      //目前仅做了针对文本的修改调整
      const { key, mid, msg } = payload;
      if (state.messageCollection[key]) {
        state.messageCollection[key].map((m) => {
          if (m.id === mid) {
            return { ...m, msg: msg };
          }
          return m;
        });
        //执行更新会话列表(如果修改的消息是会话的lastMsg因此需要进行更新会话列表。)
        store.dispatch('updateConversationLastMsg', { conversationId: key });
        if (ConversationStore.state.chattingId === key) {
          uni.$emit(EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_MODIFY, {});
        }
      }
    },
    UPDATE_MESSAGE_FROM_SERVER(state, payload) {
      const { key, messageList } = payload;
      if (state.messageCollection[key]) {
        state.messageCollection[key].push(...messageList);
      } else {
        Vue.set(state.messageCollection, key, []);
        state.messageCollection[key].push(...messageList);
      }
    },
    UPDATE_MESSAGE_COLLECTION_STATUS(state, payload) {
      //key 为消息serverMsgId
      const { key, status } = payload;
      if (state.messageStatusCollection[key]) {
        state.messageStatusCollection[key] = status;
      } else {
        Vue.set(state.messageStatusCollection, key, status);
      }
    },
    ADD_NEW_GRAY_INFORM_MESSAGE(state, payload) {
      const { key, message } = payload;
      if (!state.messageCollection[key]) {
        Vue.set(state.messageCollection, key, []);
      }
      //如果当前会话中Id为消息from，则发布消息列表更新事件。
      if (ConversationStore.state.chattingId === key) {
        uni.$emit(EVENT_BUS_NAME.EASEIM_MESSAGE_COLLECTION_UPDATE, {
          msgBody: message,
        });
      }
      state.messageCollection[key].unshift(message);
    },
  },
  actions: {
    async fetchHistroyMessageListFromServer({ state, commit }, params) {
      const { targetId, chatType } = params;
      let cursorMsgId = '';
      const messages = state.messageCollection[targetId];
      //查找消息列表数组中的最后一条消息且不为灰色通知消息最为漫游cursorMsgId
      if (messages?.length) {
        const reverseMessages = Object.assign([], messages).reverse();
        const lastMsgBody = reverseMessages.find((message) => {
          return message.type !== MESSAGE_TYPE.GRAY_INFORM;
        });
        cursorMsgId = lastMsgBody?.id;
      }
      return new Promise((resolve, reject) => {
        fetchHistoryMessagesFromServer({
          targetId,
          chatType,
          cursor: cursorMsgId,
        })
          .then((res) => {
            const result = Object.assign({}, res);
            if (result.messages.length) {
              const filterMessages = result.messages.filter((message) => {
                if (message) {
                  return message.type !== MESSAGE_TYPE.CMD;
                }
              });
              commit('UPDATE_MESSAGE_FROM_SERVER', {
                key: targetId,
                messageList: filterMessages,
              });
              result.messages = filterMessages;
            }
            resolve(result);
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
    messageStatusCollection(state) {
      return state.messageStatusCollection;
    },
  },
};
export default MessageStore;
