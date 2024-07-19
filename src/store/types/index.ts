import type { EasemobChat } from "easemob-websdk/Easemob-chat";

export type ConversationBaseInfo = Pick<
  EasemobChat.ConversationItem,
  "conversationId" | "conversationType"
>;
