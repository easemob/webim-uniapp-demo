import EaseSDK from 'easemob-websdk/uniApp/Easemob-chat';
import { EM_APP_KEY, EM_API_URL, EM_WEB_SOCKET_URL } from './config';
let EMClient = (uni.EMClient = {});
EMClient = new EaseSDK.connection({
  appKey: EM_APP_KEY,
  apiUrl: EM_API_URL,
  url: EM_WEB_SOCKET_URL,
  enableReportLogs: true, // 开启日志上报，但需联系商务开通Web端日志上报能力此配置方可奏效。
});
uni.EMClient = EMClient;
export { EaseSDK, EMClient };
