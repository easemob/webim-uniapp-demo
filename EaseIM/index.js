import EaseSDK from 'easemob-websdk/uniApp/Easemob-chat';
import { EM_APP_KEY, EM_API_URL, EM_WEB_SOCKET_URL } from './config';
let EMClient = (uni.EMClient = {});
EMClient = new EaseSDK.connection({
  appKey: EM_APP_KEY,
  apiUrl: EM_API_URL,
  url: EM_WEB_SOCKET_URL,
});
uni.EMClient = EMClient;
export { EaseSDK, EMClient };
