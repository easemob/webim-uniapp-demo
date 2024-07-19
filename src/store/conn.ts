import { defineStore } from "pinia";
import type {
  EasemobChat,
  EasemobChatStatic
} from "easemob-websdk/Easemob-chat";
//@ts-ignore
import websdk from "easemob-websdk/uniApp/Easemob-chat";

websdk.logger.onLog = (log: any) => {
  console.log(log.time, ...log.logs);
};

// 关闭控制台日志
websdk.logger.setConsoleLogVisibility(false);

export const useConnStore = defineStore("conn", () => {
  /** IM连接实例 */
  let conn = null as unknown as EasemobChat.Connection;

  let sdk = websdk as EasemobChatStatic;

  /** 初始化webIM */
  const initChatSDK = (config: EasemobChat.ConnectionParameters) => {
    setChatConn(new sdk.connection(config));
    return conn;
  };

  /** 设置conn实例 */
  const setChatConn = (connection: EasemobChat.Connection) => {
    conn = connection;
    //@ts-ignore
    uni.conn = connection;
  };

  /** 获取conn实例 */
  const getChatConn = (): EasemobChat.Connection => {
    if (conn) {
      return conn;
    }
    throw "conn is not initialized";
  };

  /** 获取 websdk */
  const getChatSDK = (): EasemobChatStatic => {
    if (sdk) {
      return sdk;
    }
    throw "SDK is not found";
  };

  return {
    conn,
    getChatConn,
    initChatSDK,
    getChatSDK
  };
});
