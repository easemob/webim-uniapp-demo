import { defineStore } from 'pinia';
import { EMClient } from '@/EaseIM';
import { CHAT_TYPE } from '@/EaseIM/constant';
import { getEMKey } from '@/EaseIM/utils';

export const useConversationStore = defineStore('conversation', {
  state: () => {
    return {
      chattingId: '', //进入聊天页面聊天中的目标聊天用户信息
      conversationList: [],
    };
  },
  getters: {
    //排序会话列表
    sortedConversationList() {
      return this.conversationList.sort((a, b) => {
        return b.time - a.time;
      });
    },
    //会话未读总数
    calcAllUnReadNumFromConversation() {
      return this.conversationList.reduce((a, c) => a + c.unReadCount, 0);
    },
  },
  actions: {
    setChattingUserId(conversationId) {
      this.chattingId = conversationId;
    },
    setConversationList(conversationList) {
      this.conversationList = [...conversationList];
    },
    async deleteConversation(conversationId) {
      console.log('deleteConversation', conversationId);
      this.conversationList.length &&
        this.conversationList.forEach((conversationItem, index) => {
          if (conversationItem.conversationId === conversationId) {
            this.conversationList.splice(index, 1);
          }
        });
    },
    updateConversationLastMessage(conversationId, message) {
      const { time, from, to } = message;
      let foundChannel = false;
      this.conversationList.forEach((conversationItem, index) => {
        //找到对应会话更新回话数据并将该item移动至数组最新位置
        if (conversationItem.conversationId === conversationId) {
          if (from !== EMClient.user && this.chattingId !== conversationId) {
            conversationItem.unReadCount = conversationItem.unReadCount + 1;
          }
          conversationItem.time = time;
          conversationItem.lastMessage = message;
          foundChannel = true;
          this.conversationList.splice(index, 1);
          this.conversationList.unshift(conversationItem);
          return;
        }
      });
      // 如果没有找到要更新的会话，则新增一个会话对象
      if (!foundChannel) {
        const conversationBody = {
          conversationId: conversationId,
          conversationType: message.chatType,
          lastMessage: { ...message },
          unReadCount: message.from !== EMClient.user ? 1 : 0,
          time: time,
        };
        this.conversationList.unshift(conversationBody);
      }
    },
    clearConversationUnReadNum(conversationId) {
      this.conversationList.forEach((conversationItem) => {
        if (conversationItem.conversationId === conversationId) {
          conversationItem.unReadCount = 0;
        }
      });
    },
  },
});
