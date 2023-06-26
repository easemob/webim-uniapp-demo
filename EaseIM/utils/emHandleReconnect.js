import { EMClient } from '../index';
import emConnect from '../imApis/emConnect';
const { loginWithAccessToken, closeEaseIM } = emConnect();
const emHandleReconnect = () => {
  const getEMClientSocketState = () => {
    //三种状态 undefined false 为SDK 断开连接，true 正在连接中。
    return EMClient.isOpened();
  };
  const actionEMReconnect = () => {
    closeEaseIM();
    setTimeout(() => {
      const loginUserId = uni.getStorageSync('myUsername');
      const loginUserToken =
        loginUserId && uni.getStorageSync(`EM_${loginUserId}_TOKEN`);
      loginWithAccessToken(loginUserId, loginUserToken.token);
    }, 300);
  };
  return {
    getEMClientSocketState,
    actionEMReconnect,
  };
};
export default emHandleReconnect;
