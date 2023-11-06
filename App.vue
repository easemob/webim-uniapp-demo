<script>
import { EMClient } from '@/EaseIM';
import { emConnectListener, emMountGlobalListener } from '@/EaseIM/emListener';
import { emConnect } from '@/EaseIM/emApis';
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from '@/EaseIM/constant';
console.log('EMClient', EMClient);
export default {
  globalData: {
    phoneNumber: '',
    unReadMessageNum: 0,
    userInfo: null,
    userInfoFromServer: null, //用户属性从环信服务器获取
    friendUserInfoMap: new Map(), //好友属性
    saveFriendList: [],
    saveGroupInvitedList: [],
    isIPX: false, //是否为iphone X
    conn: {
      closed: false,
      curOpenOpt: {},

      open(opt) {
        uni.showLoading({
          title: '正在初始化客户端..',
          mask: true,
        });
        this.curOpenOpt = opt;
        WebIM.conn
          .open(opt)
          .then(() => {
            //token获取成功，即可开始请求用户属性。
            disp.fire('em.mian.profile.update');
            disp.fire('em.mian.friendProfile.update');
          })
          .catch((err) => {
            console.log('>>>>>token获取失败', err);
          });
        this.closed = false;
      },

      reopen() {
        if (this.closed) {
          //this.open(this.curOpenOpt);
          WebIM.conn.open(this.curOpenOpt);
          this.closed = false;
        }
      },
    },
    onLoginSuccess: function (myName) {
      uni.hideLoading();
      uni.redirectTo({
        url: '../conversation/conversation?myName=' + myName,
      });
    },

    getUserInfo(cb) {
      var me = this;

      if (this.userInfo) {
        typeof cb == 'function' && cb(this.userInfo);
      } else {
        // 调用登录接口
        uni.login({
          success() {
            uni.getUserInfo({
              success(res) {
                me.userInfo = res.userInfo;
                typeof cb == 'function' && cb(me.userInfo);
              },
            });
          },
        });
      }
    },
    checkIsIPhoneX: function () {
      const me = this;
      uni.getSystemInfo({
        success: function (res) {
          // 根据 model 进行判断
          if (res.model && res.model.search('iPhone X') != -1) {
            me.isIPX = true;
          }
        },
      });
    },
  },
  onLaunch() {
    //传给监听callback回调
    const connectedCallback = (type) => {
      console.log('>>>>>连接成功回调', type);
      if (type === CONNECT_CALLBACK_TYPE.CONNECT_CALLBACK) {
        this.onConnectedSuccess();
      }
      if (type === CONNECT_CALLBACK_TYPE.DISCONNECT_CALLBACK) {
        this.onDisconnect();
      }
      if (type === CONNECT_CALLBACK_TYPE.RECONNECTING_CALLBACK) {
        this.onReconnecting();
      }
    };
    /* 链接所需监听回调 */
    emConnectListener(connectedCallback);
    /* 全局类型监听集合、消息、联系人、群组等... */
    emMountGlobalListener();
  },
  computed: {
    loginStoreStatus() {
      return this.$store.state.LoginStore.loginStatus;
    },
    loginStoreUserBaseInfos() {
      return this.$store.state.LoginStore.loginUserBaseInfos;
    },
  },
  methods: {
    onConnectedSuccess() {
      const { loginUserId } = this.loginStoreUserBaseInfos || {};
      const finalLoginUserId = loginUserId || EMClient.user;
      if (!this.loginStoreStatus) {
        this.fetchLoginUserNeedData();
      }
      this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
        loginUserId: finalLoginUserId,
      });
      this.$store.commit('SET_LOGIN_STATUS', true);
      uni.hideLoading();
      console.log('>>>>>>开始跳转至会话列表页面');
      uni.redirectTo({
        url: '../home/home?myName=' + finalLoginUserId,
      });
    },
    onDisconnect() {
      const { closeEaseIM } = emConnect();
      //断开回调触发后，如果业务登录状态为true则说明异常断开需要重新登录
      if (!this.loginStatus) {
        uni.showToast({
          title: '退出登录',
          icon: 'none',
          duration: 2000,
        });
        uni.redirectTo({
          url: '../login/login',
        });
        closeEaseIM();
      } else {
        //执行通过token进行重新登录
        // actionEMReconnect();
      }
    },
    onReconnecting() {
      uni.showToast({
        title: 'IM 重连中...',
        icon: 'none',
      });
    },
    //获取登录所需基础参数
    async fetchLoginUserNeedData() {
      await this.$store.dispatch('fetchFriendList');
      //获取好友用户属性
      await this.$store.dispatch('setFriendUserInfotoMap');
      //获取当前登录用户好友信息
      await this.$store.dispatch('fetchLoginUserProfile');
      this.fetchJoinedGroupList();
    },
    //获取加入的群组列表
    async fetchJoinedGroupList() {
      //获取群组列表
      await this.$store.dispatch('fetchJoinedGroupList');
    },
  },
};
</script>
<style lang="scss">
@import './app.css';
@import '@/uni_modules/uview-ui/index.scss';
</style>
