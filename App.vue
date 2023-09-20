<script>
import _chunkArr from './utils/chunkArr';
import { EMClient } from '@/EaseIM';
import { emConnectListener } from '@/EaseIM/emListener';
import { CONNECT_CALLBACK_TYPE, HANDLER_EVENT_NAME } from '@/EaseIM/constant';

// require("sdk/libs/strophe");
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
    // emMountGlobalListener();
  },
  computed: {
    loginStoreStatus() {
      return this.$store.state.loginStore.loginStatus;
    },
    loginStoreUserBaseInfos() {
      return this.$store.state.loginStore.loginUserBaseInfos;
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
        url: '../conversation/conversation?myName=' + finalLoginUserId,
      });
    },
    //获取登录所需基础参数
    async fetchLoginUserNeedData() {
      await this.$store.dispatch('fetchFriendList');
      //获取好友用户属性
      await this.$store.dispatch('setFriendUserInfotoMap');
      //获取当前登录用户好友信息
      await this.$store.dispatch('fetchLoginUserProfile');
      //获取好友列表
      this.fetchJoinedGroupList();
    },
    //获取加入的群组列表
    async fetchJoinedGroupList() {
      //获取群组列表
      await this.$store.dispatch('fetchJoinedGroupList');
    },
    async fetchUserInfoWithLoginId() {
      const userId = await uni.WebIM.conn.user;
      if (userId) {
        try {
          const { data } = await uni.WebIM.conn.fetchUserInfoById(userId);
          this.globalData.userInfoFromServer = Object.assign({}, data[userId]);
        } catch (error) {
          console.log(error);
          uni.showToast({
            title: '用户属性获取失败',
            icon: 'none',
            duration: 2000,
          });
        }
      }
    },
    async fetchFriendInfoFromServer() {
      let friendList = [];
      try {
        const res = await uni.WebIM.conn.getContacts();
        friendList = Object.assign([], res?.data);
        if (friendList.length && friendList.length < 99) {
          const { data } = await uni.WebIM.conn.fetchUserInfoById(friendList);
          this.setFriendUserInfotoMap(data);
        } else {
          let newArr = _chunkArr(friendList, 99);
          for (let i = 0; i < newArr.length; i++) {
            const { data } = await uni.WebIM.conn.fetchUserInfoById(newArr[i]);
            this.setFriendUserInfotoMap(data);
          }
        }
      } catch (error) {
        console.log(error);
        uni.showToast({
          title: '用户属性获取失败',
          icon: 'none',
        });
      }
    },
    setFriendUserInfotoMap(data) {
      if (Object.keys(data).length) {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const values = data[key];
            Object.values(values).length &&
              this.globalData.friendUserInfoMap.set(key, values);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import './app.css';
@import 'uview-ui/index.scss';
</style>
