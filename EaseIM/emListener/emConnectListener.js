import { EMClient } from '../index';
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from '../constant';
export const emConnectListener = (callback, listenerEventName) => {
  console.log('>>>>连接监听已挂载');
  const connectListenFunc = {
    onConnected: () => {
      console.log('connected...');
      callback && callback(CONNECT_CALLBACK_TYPE.CONNECT_CALLBACK);
    },
    onDisconnected: () => {
      callback && callback(CONNECT_CALLBACK_TYPE.DISCONNECT_CALLBACK);
      console.log('disconnected...');
    },
    onReconnecting: () => {
      callback && callback(CONNECT_CALLBACK_TYPE.RECONNECTING_CALLBACK);
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.CONNECT_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.CONNECT_EVENT,
    connectListenFunc
  );
};
