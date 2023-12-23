import { EMClient } from '../index';
import emConnect from '../emApis/emConnect';
const { loginWithAccessToken, closeEaseIM } = emConnect();
const emHandleReconnect = () => {
  const getEMClientSocketState = () => {
    //三种状态 undefined false 为SDK 断开连接，true 正在连接中。
    return EMClient.isOpened();
  };
  const actionEMReconnect = () => {
    closeEaseIM();
    setTimeout(() => {
      const loginInfos = uni.getStorageSync(`EM_LOGIN_INFOS`);
      loginWithAccessToken(loginInfos.userId, loginInfos.token);
    }, 300);
  };
  return {
    getEMClientSocketState,
    actionEMReconnect,
  };
};
export default emHandleReconnect;
