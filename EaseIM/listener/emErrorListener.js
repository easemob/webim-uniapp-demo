import { EMClient } from '../index';
import { HANDLER_EVENT_NAME } from '../constant';
export const emErrorListener = (callback, listenerEventName) => {
  console.log('>>>>error监听已挂载');
  const errorListenFunc = {
    onError: (e) => {
      console.log('>>>>>onError', e);
      callback && callback(HANDLER_EVENT_NAME.ERROR_EVENT, e);
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.ERROR_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.ERROR_EVENT,
    errorListenFunc
  );
};
