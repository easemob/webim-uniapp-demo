import { EMClient } from "../index";
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from "../constant";
import store from "@/store";
export const emPresenceListener = (callback, listenerEventName) => {
  console.log(">>>>在线状态订阅监听已挂载");
  const handlePresence = (message) => {
    store.dispatch("handlePresenceChanges", message);
  };
  const presenceListenFunc = {
    onPresenceStatusChange: function (message) {
      console.log(">>>>状态变化了", message);

      handlePresence(...message);
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.PRESENCE_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.PRESENCE_EVENT,
    presenceListenFunc
  );
};
