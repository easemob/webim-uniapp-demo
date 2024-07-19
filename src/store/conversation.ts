import { defineStore } from "pinia";
import { useConnStore } from "./conn";
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import { getTimeStringAutoShort } from "@/utils/index";
import { ref, toRef, reactive } from "vue";
import type { ConversationBaseInfo } from "./types/index";
import type { MixedMessageBody } from "@/types/index";
import { useContactStore } from "./contact";

export const useConversationStore = defineStore("conversation", () => {
  const { getChatConn, getChatSDK } = useConnStore();

  const { deepGetUserInfo } = useContactStore();

  let currConversation = ref<ConversationBaseInfo | null>(null);

  const conn = getChatConn();

  const SDK = getChatSDK();

  type GetConversationsParams = Parameters<
    typeof conn.getServerConversations
  >[0];

  const conversationParams = ref<GetConversationsParams>({
    pageSize: 50,
    cursor: ""
  });

  const conversationList = ref<EasemobChat.ConversationItem[]>([]);

  /** 设置会话列表 */
  const setConversations = (conversations: EasemobChat.ConversationItem[]) => {
    if (!Array.isArray(conversations)) {
      return console.error("Invalid parameter: conversations");
    }

    let currentCvsId = conversationList.value.map(
      (item) => item.conversationId
    );
    let filteredConversations = conversations.filter(
      ({ conversationId }) => !currentCvsId.find((id) => id === conversationId)
    );

    const userIds = filteredConversations
      .filter((conversationItem) => {
        return conversationItem.conversationType === "singleChat";
      })
      .map((conversationItem) => {
        return conversationItem.conversationId;
      });

    deepGetUserInfo(userIds);

    filteredConversations.forEach((conversationItem) => {
      conversationList.value.push(conversationItem);
    });
  };

  const setConversationParams = (p: GetConversationsParams) => {
    conversationParams.value.cursor = p.cursor;
    conversationParams.value.pageSize = p.pageSize;
  };

  /** 获取会话列表 */
  const getConversationList = () => {
    return conn.getServerConversations(conversationParams.value).then((res) => {
      setConversations(res.data?.conversations || []);
      conversationParams.value.cursor = res.data?.cursor;
      if (res.data?.cursor) {
        getConversationList();
      }
      return res;
    });
  };

  /** 删除Store中的会话 */
  const deleteStoreConversation = (
    conversation: EasemobChat.ConversationItem
  ) => {
    const idx = conversationList.value.findIndex((cvs) => {
      return (
        cvs.conversationType == conversation.conversationType &&
        cvs.conversationId == conversation.conversationId
      );
    });
    if (idx > -1) {
      conversationList.value.splice(idx, 1);
    }
  };

  /** 删除会话 */
  const deleteConversation = async (
    conversation: EasemobChat.ConversationItem,
    deleteMessage?: boolean
  ) => {
    if (typeof conversation != "object") {
      return console.error("Invalid parameter: conversation");
    }
    await conn.deleteConversation({
      channel: conversation.conversationId,
      chatType: conversation.conversationType,
      deleteRoam: deleteMessage || false
    });
    deleteStoreConversation(conversation);
  };

  /** 根据会话ID获取会话 */
  const getConversationById = (
    conversationId: string
  ): EasemobChat.ConversationItem | undefined => {
    const conv = conversationList.value.find((item) => {
      return item.conversationId === conversationId;
    });
    if (conv) {
      return conv;
    }
    return undefined;
  };

  /** 获取会话时间 */
  const getConversationTime = (
    message: EasemobChat.ConversationItem["lastMessage"]
  ) => {
    if (!message) {
      return "";
    }
    //@ts-ignore
    const time = message.time;
    if (!time) return "";
    return getTimeStringAutoShort(time);
  };

  /** 标记会话已读 */
  const markConversationRead = async (conversation: ConversationBaseInfo) => {
    const msg = SDK.message.create({
      type: "channel",
      chatType: conversation.conversationType,
      to: conversation.conversationId
    });
    await conn.send(msg);
    const conv = getConversationById(conversation.conversationId);
    if (conv) {
      conv.unReadCount = 0;
    }
  };
  /** 设置当前进行的会话 */
  const setCurrentConversation = (
    conversation: ConversationBaseInfo | null
  ) => {
    if (conversation) {
      currConversation.value = reactive(conversation);
    } else {
      currConversation.value = null;
    }
  };
  /** Top会话位置 */
  const moveConversationTop = (conversation: EasemobChat.ConversationItem) => {
    const conv = getConversationById(conversation.conversationId);
    if (conv) {
      const idx = conversationList.value.findIndex((item) => {
        return item.conversationId === conversation.conversationId;
      });
      if (idx > -1) {
        conversationList.value.splice(idx, 1);
        conversationList.value.unshift(conversation);
      }
    } else {
      conversationList.value.unshift(conversation);
    }
  };
  /** 创建会话 */
  const createConversation = (
    conversation: ConversationBaseInfo,
    msg: EasemobChat.MessageBody,
    unReadCount?: number
  ) => {
    const conv = {
      conversationId: conversation.conversationId,
      conversationType: conversation.conversationType,
      lastMessage: msg,
      unReadCount: unReadCount || 0
    } as EasemobChat.ConversationItem;
    if (conversation.conversationType === "singleChat") {
      deepGetUserInfo([conversation.conversationId]);
    }
    return conv;
  };
  /** 更新会话*/
  const updateConversationLastMessage = (
    conversation: ConversationBaseInfo,
    msg: EasemobChat.MessageBody,
    unReadCount?: number
  ) => {
    const conv = getConversationById(conversation.conversationId);
    if (conv) {
      conv.lastMessage = msg;
      conv.unReadCount = unReadCount || 0;
    }
  };
  /** 根据消息获取会话Id */
  const getCvsIdFromMessage = (message: MixedMessageBody) => {
    let conversationId = "";
    if (message.chatType === "groupChat" || message.chatType === "chatRoom") {
      conversationId = message.to;
    } else if (message.from === conn.user || message.from === "") {
      // self message
      conversationId = message.to;
    } else {
      // target message
      conversationId = message.from || "";
    }
    return conversationId;
  };

  const clear = () => {
    conversationList.value = [];
    conversationParams.value = {
      pageSize: 50,
      cursor: ""
    };
    currConversation.value = null;
  };

  return {
    conversationList,
    conversationParams,
    currConversation,
    clear,
    setConversationParams,
    getConversationList,
    deleteConversation,
    getConversationById,
    getConversationTime,
    markConversationRead,
    setCurrentConversation,
    moveConversationTop,
    createConversation,
    updateConversationLastMessage,
    getCvsIdFromMessage
  };
});
