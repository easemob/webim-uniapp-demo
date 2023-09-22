import { emConversation } from '@/EaseIM/emApis';
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
    SET_CHATING_USERID: (state, channel_id) => {
      state.chattingId = channel_id;
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
  },
  getters: {
    //排序会话列表
    sortedConversationList(state) {
      return state.conversationList.sort((a, b) => {
        return b.time - a.time;
      });
    },
    //会话未读总数
    calcAllUnReadNumFromConversation(state) {
      return state.conversationList.reduce((a, c) => a + c.unReadCount, 0);
    },
  },
};
export default ConversationStore;
