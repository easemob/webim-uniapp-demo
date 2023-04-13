/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */
// for react native
let location = {
  protocol: "https"
};
let config = {
  /*
   * XMPP server
   */

  // xmppURL: "wss://im-api-new-hsb.easemob.com/websocket",// websdk 3.0 server 沙箱（测试用）
  
  // xmppURL: "wss://im-api.easemob.com/ws",  //小程序sdk 2.0 server

  xmppURL: 'wss://im-api-wechat.easemob.com/websocket', //小程序3.0 server 线上 小程序和原生客户端使用这个
  
  // xmppURL: 'wss://im-api-v2-hsb-alipay.easemob.com/websocket', // 支付宝沙箱 （测试用）
  
    // xmppURL: 'wss://im-api-alipay.easemob.com/websocket', // 支付宝线上 支付宝小程序请使用这个地址
  
  /*
   * Backend REST API URL
   */
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // ios must be https!!! by lwz
  apiURL: "https://a1.easemob.com",
  
  // apiURL: 'https://192.168.43.137:8080', // 支付宝测试
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',

  /*
   * Application AppKey
   */
  appkey: "easemob#easeim",

  /*
   * Whether to use HTTPS      '1177161227178308#xcx'
   * @parameter {Boolean} true or false
   */
  https: false,

  /*
   * isMultiLoginSessions
   * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
   * false: A visitor can sign in to only one webpage and receive messages at the webpage.
   */
  isMultiLoginSessions: false,

  /**
   * Whether to use window.doQuery()
   * @parameter {Boolean} true or false
   */
  isWindowSDK: false,

  /**
   * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
   * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
   * @parameter {Boolean} true or false
   */
  isSandBox: false,

  /**
   * Whether to console.log in strophe.log()
   * @parameter {Boolean} true or false
   */
  isDebug: false,

  /**
   * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
   * won't auto connect if autoReconnectNumMax=0.
   */
  autoReconnectNumMax: 15,

  /**
   * the interval secons between each atuo reconnectting.
   * works only if autoReconnectMaxNum >= 2.
   */
  autoReconnectInterval: 2,

  /**
   * webrtc supports WebKit and https only
   */
  isWebRTC: false,

  /*
   * Set to auto sign-in
   */
  isAutoLogin: true
};
export default config;