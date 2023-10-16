import { emConversation } from '@/EaseIM/emApis';
import { EMClient } from '@/EaseIM';
const {
  fetchConversationFromServer,
  removeConversationFromServer,
  sendChannelAck,
} = emConversation();
const ConversationStore = {
  state: {
    chattingId: '', //进入聊天页面聊天中的目标聊天用户信息
    conversationList: [],
  },
  mutations: {
    SET_CHATING_USERID: (state, conversationId) => {
      state.chattingId = conversationId;
    },
    SET_CONVERSATION_LIST: (state, conversationList) => {
      state.conversationList = [...conversationList];
    },
    DELETE_CONVERSATION_ITEM: (state, conversationId) => {
      if (state.conversationList.length) {
        state.conversationList = state.conversationList.filter(
          (item) => item.conversationId !== conversationId
        );
      }
    },
    UPDATE_CONVERSATION_ITEM: (state, payload) => {
      console.log('>>>>更新会话列表');
      const { conversationId, lastMessage } = payload;
      let foundChannel = false;
      state.conversationList.length &&
        state.conversationList.forEach((conversationItem) => {
          if (conversationItem.conversationId === conversationId) {
            //要更新的lastmsg消息来源不为当前id，且不为正在会话中的id则累加未读数。
            if (
              lastMessage.from !== EMClient.user &&
              state.chattingId !== conversationId
            ) {
              conversationItem.unReadCount = conversationItem.unReadCount + 1;
            }
            conversationItem.lastMessage = { ...lastMessage };
            foundChannel = true;
            return;
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
  },
  actions: {
    fetchConversationList: async ({ commit }) => {
      try {
        const result = await fetchConversationFromServer();
        console.log('>>>>>>>result', result);
        commit('SET_CONVERSATION_LIST', result.data.conversations);
      } catch (error) {
        console.log('>>>>> 会话列表拉取失败', error);
      }
    },
    deleteConversation: async ({ commit }, params) => {
      const { conversationId, conversationType } = params;
      try {
        await removeConversationFromServer(conversationId, conversationType);
        commit('DELETE_CONVERSATION_ITEM', conversationId);
      } catch (error) {
        console.log('>>>>会话列表删除失败', error);
      }
    },
    sendConversatonReadedAck: async ({ commit }, params) => {
      const { targetId, chatType } = params;
      sendChannelAck(targetId, chatType);
      commit('clearConversationUnReadNum', { conversationId: targetId });
    },
  },
  getters: {
    //排序会话列表
    sortedConversationList(state) {
      return state.conversationList.sort((a, b) => {
        return b.lastMessage.time - a.lastMessage.time;
      });
    },
    //会话未读总数
    calcAllUnReadNumFromConversation(state) {
      return state.conversationList.reduce((a, c) => a + c.unReadCount, 0);
    },
  },
};
export default ConversationStore;
