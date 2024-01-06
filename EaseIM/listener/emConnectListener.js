import { EMClient } from '../index';
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from '../constant';
import dateFormater from '@/utils/dateFormater';
export const emConnectListener = (callback, listenerEventName) => {
  console.log('>>>>连接监听已挂载');
  const connectListenFunc = {
    onConnected: () => {
      console.log('connected...', dateFormater('MM/DD/HH:mm:ss', Date.now()));
      callback && callback(CONNECT_CALLBACK_TYPE.CONNECT_CALLBACK);
    },
    onDisconnected: () => {
      callback && callback(CONNECT_CALLBACK_TYPE.DISCONNECT_CALLBACK);
      console.log(
        'disconnected...',
        dateFormater('MM/DD/HH:mm:ss', Date.now())
      );
    },
    onReconnecting: () => {
      console.log(
        'reconnecting...',
        dateFormater('MM/DD/HH:mm:ss', Date.now())
      );
      callback && callback(CONNECT_CALLBACK_TYPE.RECONNECTING_CALLBACK);
    },
    onOnline: () => {
      console.log('online...');
    },
    onOffline: () => {
      console.log('offline...');
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
