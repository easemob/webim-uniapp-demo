import { EMClient } from '../index';
const emConnect = () => {
  const loginWithPassword = (hxUserId, hxPassword) => {
    if (!hxUserId || !hxPassword) throw Error('empty params');
    return EMClient.open({
      user: hxUserId,
      pwd: hxPassword,
    });
  };
  const loginWithAccessToken = (hxUserId, hxAccessToken) => {
    if (!hxUserId || !hxAccessToken) throw Error('empty params');
    return EMClient.open({
      user: hxUserId,
      accessToken: hxAccessToken,
    });
  };
  const closeEaseIM = () => {
    EMClient.close();
  };
  return {
    loginWithPassword,
    loginWithAccessToken,
    closeEaseIM,
  };
};
export default emConnect;
