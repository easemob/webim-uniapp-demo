import { emConversation, emSilent } from '@/EaseIM/emApis';
import { EMClient } from '@/EaseIM';
import { CHAT_TYPE } from '@/EaseIM/constant';
import Vue from 'vue';
import MessageStore from './message';
const {
  fetchPinConversationFromServer,
  pinConversationItem,
  fetchConversationFromServer,
  removeConversationFromServer,
  sendChannelAck,
} = emConversation();
const {
  getSilentModeForConversation,
  getSilentModeForConversationList,
  setSilentModeForConversation,
  clearRemindTypeForConversation,
} = emSilent();
const ConversationStore = {
  state: {
    chattingId: '', //进入聊天页面聊天中的目标聊天用户信息
    chattingChatType: CHAT_TYPE.SINGLE_CHAT, //当前聊天页面中的聊天类型类型
    chattingTypingStatus: false, //当前聊天页面中是否正在输入
    pinConversationList: [],
    conversationList: [],
    silentConversationMap: {},
  },
  mutations: {
    RESET_CONVERSATION_STORE: (state) => {
      state.chattingId = '';
      state.chattingChatType = CHAT_TYPE.SINGLE_CHAT;
      state.chattingTypingStatus = false;
      state.pinConversationList = [];
      state.conversationList = [];
      state.silentConversationMap = {};
    },
    /**
     * Sets the chatting user info of the current page.
     * @param {object} payload - The payload contains the target user id and chat type.
     * @param {string} payload.targetId - The target user id.
     * @param {CHAT_TYPE} payload.chatType - The chat type.
     */
    /**
     * Sets the chatting user info of the current page.
     * @param {object} payload - The payload contains the target user id and chat type.
     * @param {string} payload.targetId - The target user id.
     * @param {CHAT_TYPE} payload.chatType - The chat type.
     */
    SET_CHATING_USER_INFO: (state, payload) => {
      state.chattingId = payload.targetId || '';
      state.chattingChatType = payload.chatType || CHAT_TYPE.SINGLE_CHAT;
    },
    /**
     * Sets the typing status of the current chatting user.
     * @param {boolean} payload - The typing status.
     */
    SET_CHATING_USER_INFO_TYPING_STATUS: (state, payload) => {
      state.chattingTypingStatus = payload;
    },
    /**
     * Sets the pin conversation list of the current page.
     * @param {object} state - The state object.
     * @param {array} pinConversationList - The pin conversation list.
     */
    SET_PIN_CONVERSATION_LIST: (state, pinConversationList) => {
      state.pinConversationList = [...pinConversationList];
    },
    /**
     * Sets the silent conversation map of the current page.
     * @param {object} state - The state object.
     * @param {string} type - The type of the action.
     * @param {object} data - The data contains the conversation id and type.
     */
    SET_SILENT_CONVERSATION_MAP: (state, payload) => {
      const { type, data } = payload;
      if (type === 'init') {
        state.silentConversationMap = data;
      }
      if (type === 'setSingleSilentMode') {
        const { conversationId, type } = data;
        if (!state.silentConversationMap[conversationId]) {
          Vue.set(state.silentConversationMap, conversationId, {});
        }
        state.silentConversationMap[conversationId] = { type };
      }
    },
    UPDATE_PIN_CONVERSATION_ITEM: (state, conversationItem) => {
      const { conversationId, isPinned } = conversationItem;
      const pinConversationItemIndex = state.pinConversationList.findIndex(
        (item) => item.conversationId === conversationId
      );
      const unPinConversationItemIndex = state.conversationList.findIndex(
        (item) => item.conversationId === conversationId
      );
      console.log('unPinConversationItemIndex', unPinConversationItemIndex);
      if (isPinned) {
        state.pinConversationList.unshift(conversationItem);
        unPinConversationItemIndex > -1 &&
          state.conversationList.splice(unPinConversationItemIndex, 1);
      } else {
        state.conversationList.unshift(conversationItem);
        pinConversationItemIndex > -1 &&
          state.pinConversationList.splice(pinConversationItemIndex, 1);
      }
    },
    SET_CONVERSATION_LIST: (state, conversationList) => {
      state.conversationList = [...conversationList];
    },
    DELETE_CONVERSATION_ITEM: (state, conversationId) => {
      if (state.pinConversationList.length) {
        state.pinConversationList = state.pinConversationList.filter(
          (item) => item.conversationId !== conversationId
        );
      }
      if (state.conversationList.length) {
        state.conversationList = state.conversationList.filter(
          (item) => item.conversationId !== conversationId
        );
      }
    },
    UPDATE_CONVERSATION_ITEM: (state, payload) => {
      console.log('>>>>更新会话列表', payload);
      const { conversationId, lastMessage } = payload;
      let foundChannel = false;

      const updateConversationItem = (conversationItem) => {
        if (
          lastMessage.from !== EMClient.user &&
          state.chattingId !== conversationId
        ) {
          conversationItem.unReadCount += 1;
        }
        conversationItem.lastMessage = { ...lastMessage };
        foundChannel = true;
      };

      state.conversationList.forEach((conversationItem) => {
        if (conversationItem.conversationId === conversationId) {
          updateConversationItem(conversationItem);
        }
      });

      state.pinConversationList.forEach((conversationItem) => {
        if (conversationItem.conversationId === conversationId) {
          updateConversationItem(conversationItem);
        }
      });

      if (!foundChannel) {
        console.log('>>>新增会话列表');
        const conversationItem = {
          conversationId,
          conversationType: lastMessage.chatType,
          lastMessage,
          pinnedTime: 0,
          isPinned: false,
          unReadCount: 1,
        };
        console.log('conversationItem', conversationItem);
        state.conversationList.push({
          ...conversationItem,
        });
      }
    },
    clearConversationUnReadNum(state, payload) {
      const { conversationId } = payload;
      state.conversationList.forEach((conversationItem) => {
        if (conversationItem.conversationId === conversationId) {
          conversationItem.unReadCount = 0;
        }
      });
    },
    SET_CONVERSATION_ITEM_READ_SATUS: (state, payload) => {
      const {
        conversationItem: { isPinned, conversationId },
        isRead,
      } = payload;

      const conversationList = isPinned
        ? state.pinConversationList
        : state.conversationList;

      const targetConversationItem = conversationList.find(
        (conversationItem) => conversationItem.conversationId === conversationId
      );

      if (targetConversationItem) {
        if (isRead) {
          targetConversationItem.unReadCount = 0;
        }
        targetConversationItem.isRead = isRead;
      }
    },
  },
  actions: {
    //主动更新lastMessage
    updateConversationLastMsg: async ({ commit, dispatch }, payload) => {
      const { conversationId } = payload;
      const { messageCollection } = MessageStore.state;
      //收集conversationId 对应的消息合集。
      if (messageCollection[conversationId]) {
        const messagesList = messageCollection[conversationId];
        const lastMessage = messagesList[0];
        console.log('>>>>>>执行主动更新对应会话的最后一条数据。', lastMessage);
        commit('UPDATE_CONVERSATION_ITEM', {
          conversationId,
          lastMessage,
        });
      }
      console.log('messageCollection', messageCollection);
    },
    fetchPinConversationList: async ({ commit }) => {
      try {
        const result = await fetchPinConversationFromServer();
        console.log('>>>>>>>置顶会话result', result);
        commit('SET_PIN_CONVERSATION_LIST', result.data.conversations);
      } catch (error) {
        console.log('>>>>>置顶会话列表拉取失败', error);
      }
    },
    fetchConversationList: async ({ commit, dispatch }) => {
      let filteredConversationList = [];
      try {
        const result = await fetchConversationFromServer();
        console.log('>>>>>>>result', result);
        filteredConversationList = result.filter(
          (item) => item.isPinned === false
        );
        commit('SET_CONVERSATION_LIST', [...filteredConversationList]);
        dispatch('fetchSilentConversationList', [...result]);
      } catch (error) {
        console.log('>>>>> 会话列表拉取失败', error);
      }
    },
    //处理会话置顶
    pinConversationItem: async ({ commit }, params) => {
      const { conversationId, conversationType, isPinned } = params;
      try {
        const result = await pinConversationItem({
          conversationId,
          conversationType,
          isPinned,
        });
        commit('UPDATE_PIN_CONVERSATION_ITEM', { ...params });
        console.log('>>>>>>>置顶会话成功', result);
      } catch (error) {
        console.log('>>>>>置顶会话列表拉取失败', error);
      }
    },
    deleteConversation: async ({ commit }, params) => {
      const { conversationId, conversationType } = params;
      return new Promise((resolve, reject) => {
        removeConversationFromServer(conversationId, conversationType)
          .then((res) => {
            commit('DELETE_CONVERSATION_ITEM', conversationId);
            resolve(res);
          })
          .catch((err) => {
            console.log('>>>>会话列表删除失败', error);
            reject(err);
          });
      });
    },
    sendConversatonReadedAck: async ({ commit }, params) => {
      const { targetId, chatType } = params;
      sendChannelAck(targetId, chatType);
      commit('clearConversationUnReadNum', { conversationId: targetId });
    },
    //获取会话免打扰状态
    fetchSilentConversationList: async ({ commit }, params) => {
      const conversationList = params;
      const silentConversationListParams = conversationList.map(
        (conversation) => {
          return {
            id: conversation.conversationId,
            type: conversation.conversationType,
          };
        }
      );
      try {
        const { data } = await getSilentModeForConversationList(
          silentConversationListParams
        );
        const silentUserInfo = { ...data?.user, ...data?.group };
        commit('SET_SILENT_CONVERSATION_MAP', {
          type: 'init',
          data: silentUserInfo,
        });
      } catch (error) {
        console.log('>>>>>会话免打扰列表拉取失败', error);
      }
    },
    //获取单个会话免打扰状态
    fetchSilentConversation: ({ commit }, params) => {
      const { conversationId, chatType } = params;
      return new Promise((resolve, reject) => {
        getSilentModeForConversation(conversationId, chatType)
          .then((res) => {
            if (Object.keys(res?.data).length) {
              commit('SET_SILENT_CONVERSATION_MAP', {
                type: 'setSingleSilentMode',
                data: {
                  conversationId,
                  type: 'NONE',
                },
              });
            } else {
              commit('SET_SILENT_CONVERSATION_MAP', {
                type: 'setSingleSilentMode',
                data: {
                  conversationId,
                  type: '',
                },
              });
            }
            resolve(res?.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //设置会话免打扰
    setConversationSilentMode: async ({ commit }, params) => {
      const { conversationId, type } = params;
      try {
        if (params.hasOwnProperty('options')) {
          console.log('>>>>设置会话免打扰');
          await setSilentModeForConversation({ ...params });
          commit('SET_SILENT_CONVERSATION_MAP', {
            type: 'setSingleSilentMode',
            data: {
              conversationId,
              type: 'NONE',
            },
          });
        } else {
          console.log('>>>>>取消会话免打扰');
          await clearRemindTypeForConversation({ ...params });
          commit('SET_SILENT_CONVERSATION_MAP', {
            type: 'setSingleSilentMode',
            data: {
              conversationId,
              type: '',
            },
          });
        }
      } catch (error) {
        console.log('>>>>>>会话设置失败', error);
      }
    },
    //调整会话已读状态
    setConversationReadStatus: async ({ commit }, params) => {
      const { conversationItem, isRead } = params;
      if (isRead) {
        sendChannelAck(
          conversationItem.conversationId,
          conversationItem.conversationType
        );
        commit('SET_CONVERSATION_ITEM_READ_SATUS', {
          conversationItem,
          isRead: true,
        });
      } else {
        commit('SET_CONVERSATION_ITEM_READ_SATUS', {
          conversationItem,
          isRead: false,
        });
      }
    },
  },
  getters: {
    //排序会话列表
    sortedConversationList(state) {
      return state.conversationList.sort((a, b) => {
        return b.lastMessage.time - a.lastMessage.time;
      });
    },
    //排序指定会话列表
    sortedPinConversationList(state) {
      return state.pinConversationList.sort((a, b) => {
        return b.lastMessage.time - a.lastMessage.time;
      });
    },
    //会话免打扰信息
    silentConversationMap(state) {
      return state.silentConversationMap;
    },
    //会话未读总数
    calcAllUnReadNumFromConversation(state) {
      // 计算置顶会话的未读数
      const pinConversationListUnReadNum = state.pinConversationList.reduce(
        (total, conversation) => {
          const silentInfo =
            state.silentConversationMap[conversation.conversationId];
          if (silentInfo?.type !== 'NONE' && conversation.unReadCount > 0) {
            return total + conversation.unReadCount;
          }
          return total;
        },
        0
      );

      // 计算普通会话的未读数
      const conversationListUnReadNum = state.conversationList.reduce(
        (total, conversation) => {
          const silentInfo =
            state.silentConversationMap[conversation.conversationId];
          if (silentInfo?.type !== 'NONE' && conversation.unReadCount > 0) {
            return total + conversation.unReadCount;
          }
          return total;
        },
        0
      );
      // 返回总未读数
      return pinConversationListUnReadNum + conversationListUnReadNum;
    },
    //聊天中用户ID
    chattingId(state) {
      return state.chattingId;
    },
    chattingChatType(state) {
      return state.chattingChatType;
    },
    chattingTypingStatus(state) {
      return state.chattingTypingStatus;
    },
  },
};
export default ConversationStore;
