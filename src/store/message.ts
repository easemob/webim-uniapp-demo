import { defineStore } from "pinia";
import { useConnStore } from "./conn";
import { ref } from "vue";
import { useConversationStore } from "./conversation";
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import type { MixedMessageBody } from "@/types/index";
interface ConversationMessagesInfo {
  messages: MixedMessageBody[];
  cursor: string;
  isLast: boolean;
}

export const useMessageStore = defineStore("message", () => {
  const { getChatConn } = useConnStore();
  const {
    getConversationById,
    createConversation,
    updateConversationLastMessage,
    moveConversationTop,
    getCvsIdFromMessage,
    markConversationRead
  } = useConversationStore();
  // 消息ID和消息体的映射
  const messageMap = ref<Map<string, MixedMessageBody>>(new Map());

  // 会话ID和会话消息的映射
  const conversationMessagesMap = ref<Map<string, ConversationMessagesInfo>>(
    new Map()
  );

  const conn = getChatConn();

  const playingAudioMsgId = ref<string>("");

  const setPlayingAudioMessageId = (msgId: string) => {
    playingAudioMsgId.value = msgId;
  };

  /** 获取历史消息 */
  const getHistoryMessages = async (
    conversation: EasemobChat.ConversationItem,
    cursor?: string
  ) => {
    const dt = await getChatConn().getHistoryMessages({
      targetId: conversation.conversationId,
      chatType: conversation.conversationType,
      pageSize: 50,
      cursor: cursor || ""
    });
    // 更新本地消息映射
    dt.messages.forEach((msg) => {
      //@ts-ignore
      messageMap.value.set(msg.id, msg);
    });

    if (conversationMessagesMap.value.has(conversation.conversationId)) {
      const info = conversationMessagesMap.value.get(
        conversation.conversationId
      );
      if (info) {
        //@ts-ignore
        info.messages.unshift(...dt.messages.reverse());
        info.cursor = dt.cursor || "";
        info.isLast = dt.isLast;
      }
      return;
    }

    conversationMessagesMap.value.set(conversation.conversationId, {
      //@ts-ignore
      messages: dt.messages.reverse(),
      cursor: dt.cursor || "",
      isLast: dt.isLast
    });
  };

  /** 插入新消息 */
  const insertMessage = (msg: MixedMessageBody) => {
    let convId = getCvsIdFromMessage(msg as MixedMessageBody);
    // 如果已经存在会话消息映射，则直接插入, 否则通过历史消息获取
    if (conversationMessagesMap.value.has(convId)) {
      const info = conversationMessagesMap.value.get(convId);
      if (info) {
        //@ts-ignore
        info.messages.push(msg);
      }
      return;
    }
  };

  /** 发送消息 */
  const sendMessage = (msg: EasemobChat.MessageBody) => {
    return getChatConn()
      .send(msg)
      .then((res) => {
        if (
          msg.type !== "delivery" &&
          msg.type !== "read" &&
          msg.type !== "channel"
        ) {
          res.message && messageMap.value.set(res.serverMsgId, res.message);
          insertMessage(res.message as MixedMessageBody);
          if (msg.chatType === "chatRoom") {
            return res;
          }
          const convId = getCvsIdFromMessage(msg);
          const conv = getConversationById(convId);
          if (conv) {
            // 如果会话存在，则更新会话最后一条消息和未读消息数
            updateConversationLastMessage(
              {
                conversationId: convId,
                conversationType: msg.chatType
              },
              msg,
              conv.unReadCount
            );
            // 移动会话到顶部
            moveConversationTop(conv);
          } else {
            //如果会话不存在,创建新会话
            const newConv = createConversation(
              {
                conversationId: convId,
                conversationType: msg.chatType
              },
              msg,
              0
            );
            moveConversationTop(newConv);
          }
        }
        return res;
      });
  };

  /** 收到消息回调处理 */
  const onMessage = (msg: MixedMessageBody) => {
    const { currConversation } = useConversationStore();
    messageMap.value.set(msg.id, msg);
    insertMessage(msg);
    // 不处理聊天室会话
    if (msg.chatType === "chatRoom") {
      return;
    }
    const convId = getCvsIdFromMessage(msg);
    const conv = getConversationById(convId);
    if (conv) {
      // 如果会话存在，则更新会话最后一条消息和未读消息数
      updateConversationLastMessage(
        {
          conversationId: convId,
          conversationType: msg.chatType
        },
        msg,
        msg.from !== getChatConn().user
          ? conv.unReadCount + 1
          : conv.unReadCount
      );
      // 移动会话到顶部
      moveConversationTop(conv);
      // 如果当前会话是当前会话，则标记为已读
      if (currConversation?.conversationId === convId) {
        markConversationRead({
          conversationId: convId,
          conversationType: msg.chatType
        });
      }
      return;
    }
    //如果会话不存在,创建新会话
    const newConv = createConversation(
      {
        conversationId: convId,
        conversationType: msg.chatType
      },
      msg,
      msg.from !== getChatConn().user ? 1 : 0
    );
    // 移动会话到顶部
    moveConversationTop(newConv);
  };

  type RecallMessageParams = Parameters<typeof conn.recallMessage>[0];
  const recallMessage = (msg: RecallMessageParams) => {
    return getChatConn()
      .recallMessage(msg)
      .then((res) => {
        onRecallMessage(msg.mid, conn.user);
        return res;
      });
  };

  const onRecallMessage = (mid: string, from: string) => {
    const recalledMessage = messageMap.value.get(mid);
    if (recalledMessage) {
      const cvsId = getCvsIdFromMessage(recalledMessage);
      const idx =
        conversationMessagesMap.value
          .get(cvsId)
          ?.messages.findIndex((m) => m.id === mid) || -1;
      if (idx > -1) {
        conversationMessagesMap.value.get(cvsId)?.messages.splice(idx, 1, {
          ...recalledMessage,
          noticeInfo: {
            type: "notice",
            noticeType: "recall",
            ext: {
              isRecalled: true,
              from: from
            }
          }
        });
      }
      if (recalledMessage.chatType === "chatRoom") {
        return;
      }
      // 撤回更新会话未读数
      const conv = getConversationById(cvsId);
      if (conv) {
        updateConversationLastMessage(
          {
            conversationId: cvsId,
            conversationType: recalledMessage.chatType
          },
          null as any,
          conv.unReadCount - 1
        );
      }
    }
  };
  // 插入消息通知到消息列表
  const insertNoticeMessage = (msg: MixedMessageBody) => {
    const cvsId = getCvsIdFromMessage(msg);
    if (conversationMessagesMap.value.has(cvsId)) {
      conversationMessagesMap.value.get(cvsId)?.messages.push(msg);
    } else {
      // 不存在的会话不插入消息通知
    }
  };

  /** 清空store数据*/
  const clear = () => {
    messageMap.value.clear();
    conversationMessagesMap.value.clear();
  };

  return {
    messageMap,
    conversationMessagesMap,
    playingAudioMsgId,
    getHistoryMessages,
    insertMessage,
    sendMessage,
    onMessage,
    onRecallMessage,
    recallMessage,
    insertNoticeMessage,
    setPlayingAudioMessageId,
    clear
  };
});
