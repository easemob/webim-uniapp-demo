// export default function (EaseIMConn, payload) {
//     const { username, channelName } = payload
//     const myHeaders = new Headers()
//     myHeaders.append('authorization', `Bearer ${EaseIMConn.context.accessToken}`)
//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     }
//     return new Promise(function (resolve, reject) {
//         fetch(`${EaseIMConn.apiUrl}/token/rtcToken/v1?userAccount=${username}&channelName=${channelName}&appkey=${window.encodeURIComponent(EaseIMConn.appKey)}`, requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 console.log('result', JSON.parse(result))
//                 resolve(JSON.parse(result))
//             })
//             .catch(error => {
//                 reject(error)
//                 console.log('error', error)
//             })
//     })

// }
const requestRtcChannelToken = (CallKitEMClient, payload) => {
  const { channelName } = payload;
  const requestUrl = `${CallKitEMClient.apiUrl}/token/rtcToken/v1?userAccount=${
    CallKitEMClient.user
  }&channelName=${channelName}&appkey=${encodeURIComponent(
    CallKitEMClient.appKey
  )}`;
  console.log(
    '>>>>requestUrl',
    `Bearer ${CallKitEMClient.context.accessToken}`
  );
  return new Promise((resolve, reject) => {
    uni.request({
      url: requestUrl,
      header: {
        Authorization: `Bearer ${CallKitEMClient.context.accessToken}`, //自定义请求头信息
      },
      success: (result) => {
        console.log('result', result?.data);
        resolve(result?.data);
      },
      fail: (e) => {
        console.error('>>>>rtc token 获取失败', e);
        uni.showToast({ icon: 'none', title: 'rtc token 请求失败' });
        reject(e);
      },
    });
  });
};

export { requestRtcChannelToken };
