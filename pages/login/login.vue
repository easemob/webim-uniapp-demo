<template>
  <view>
    <view class="login">
      <image src="/static/images/loginBg.jpg" class="bg-img"></image>
      <view class="login_title">
        <image
          src="/static/images/loginIcon.png"
          style="width: 100px; height: 100px"
        ></image>
      </view>
      <view :class="'login_user ' + nameFocus">
        <input
          v-model="name"
          type="text"
          :placeholder="usePwdLogin ? '请输入用户名' : '请输入手机号'"
          placeholder-style="color:rgb(173,185,193)"
          @input="bindUsername"
          @focus="onFocusName"
          @blur="onBlurName"
        />
      </view>

      <view :class="'login_pwd ' + psdFocus" v-if="usePwdLogin">
        <input
          v-model="psd"
          type="text"
          :password="!showPassword"
          placeholder="请输入密码"
          placeholder-style="color:rgb(173,185,193)"
          @input="bindPassword"
          @focus="onFocusPsd"
          @blur="onBlurPsd"
        />
        <image
          class="psdIcon"
          :src="
            showPassword
              ? '/static/images/eye.png'
              : '/static/images/eye-fill.png'
          "
          @tap="showPassword = !showPassword"
        ></image>
      </view>

      <view class="login_pwd" v-else>
        <input
          type="text"
          placeholder="请输入验证码"
          hover-class="input-hover"
          placeholder-style="color:rgb(173,185,193)"
          @input="bindPassword"
        />
        <view class="login_sms" @click="getSmsCode">{{ btnText }}</view>
      </view>

      <view class="login_btn">
        <button hover-class="btn_hover" @click="loginEaseIM">登录</button>
      </view>

      <!-- <view class="login_text">
		<navigator url="../register/register" open-type="redirect">账号注册</navigator>
		<navigator url="../resetpassword/resetpassword" open-type="redirect">找回密码</navigator>
		<navigator url="../login_token/login_token" open-type="redirect" hover-class="navigator-hover">使用Token登录</navigator>
	</view> -->
    </view>
  </view>
</template>

<script>
import { emConnect } from '@/EaseIM/emApis';
const { loginWithPassword, loginWithAccessToken } = emConnect();
let runAnimation = true;
let times = 60;
let timer;
export default {
  data() {
    return {
      usePwdLogin: true, //是否用户名+手机号方式登录
      name: 'hfp',
      psd: '1',
      grant_type: 'password',
      psdFocus: '',
      nameFocus: '',
      showPassword: false,
      type: 'text',
      btnText: '获取验证码',
    };
  },

  methods: {
    bindUsername: function (e) {
      this.name = e.detail.value;
    },
    bindPassword: function (e) {
      this.psd = e.detail.value;
    },
    onFocusPsd: function () {
      this.psdFocus = 'psdFocus';
    },
    onBlurPsd: function () {
      this.psdFocus = '';
    },
    onFocusName: function () {
      this.nameFocus = 'nameFocus';
    },
    onBlurName: function () {
      this.nameFocus = '';
    },
    //获取短信验证码
    getSmsCode: function () {
      if (this.btnText != '获取验证码') return;
      if (this.name == '') {
        return uni.showToast({ title: '请输入手机号！', icon: 'none' });
      }
      const self = this;
      // 发送短信验证码
      uni.request({
        url: `https://a1.easemob.com/inside/app/sms/send/${this.name}`,
        header: {
          'content-type': 'application/json',
        },
        method: 'POST',
        data: {
          phoneNumber: this.name,
        },
        success(res) {
          console.log('res', res);
          if (res.statusCode == 200) {
            uni.showToast({ title: '短信发送成功！', icon: 'none' });
            self.countDown();
          } else if (res.statusCode == 400) {
            if (res.data.errorInfo == 'phone number illegal') {
              uni.showToast({ title: '请输入正确的手机号！', icon: 'none' });
            } else if (
              res.data.errorInfo == 'Please wait a moment while trying to send.'
            ) {
              uni.showToast({
                title: '你的操作过于频繁，请稍后再试！',
                icon: 'none',
              });
            } else if (res.data.errorInfo.includes('exceed the limit')) {
              uni.showToast({ title: '获取已达上限！', icon: 'none' });
            } else {
              uni.showToast({ title: res.data.errorInfo, icon: 'none' });
            }
          }
        },
        fail(error) {
          uni.showToast({ title: '短信发送失败！', icon: 'none' });
        },
      });
    },
    //验证码倒计时
    countDown: function () {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        times--;
        this.setData({
          btnText: times,
        });
        if (times === 0) {
          times = 60;
          this.setData({
            btnText: '获取验证码',
          });
          return clearTimeout(timer);
        }
        this.countDown();
      }, 1000);
    },
    async loginEaseIM() {
      if (this.usePwdLogin) {
        if (!this.name) {
          uni.showToast({
            title: '请输入用户ID！',
            icon: 'none',
          });
          return;
        } else if (!this.psd) {
          uni.showToast({
            title: '请输入验证码！',
            icon: 'none',
          });
          return;
        }
        uni.showLoading({
          title: '正在初始化客户端..',
          mask: true,
        });
        this.loginWithUserId();
      } else {
        if (!this.name) {
          uni.showToast({
            title: '请输入手机号！',
            icon: 'none',
          });
          return;
        } else if (!this.psd) {
          uni.showToast({
            title: '请输入验证码！',
            icon: 'none',
          });
          return;
        }
        this.loginWithPhoneNumber();
      }
    },
    async loginWithPhoneNumber() {
      try {
        let res = await uni.request({
          url: 'https://a1.easemob.com/inside/app/user/login/V2',
          header: {
            'content-type': 'application/json',
          },
          method: 'POST',
          data: {
            phoneNumber: this.name,
            smsCode: this.psd,
          },
        });
        console.log('>>>>>>>接口请求成功', res);
        if (res[1].statusCode == 200) {
          const { phoneNumber, token, chatUserName } = res[1].data;
          await loginWithAccessToken(chatUserName, token);
          console.log('this.$store', this.$store);
          this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
            loginUserId: chatUserName,
            phoneNumber: phoneNumber,
          });
          uni.setStorage({
            key: 'myUsername',
            data: chatUserName,
          });
          this.setUserTokenToStorage(chatUserName, token);
        } else if (res[1].statusCode == 400) {
          if (res.data.errorInfo) {
            switch (res.data.errorInfo) {
              case 'UserId password error.':
                uni.showToast({
                  title: '用户名或密码错误！',
                  icon: 'none',
                });
                break;
              case 'phone number illegal':
                uni.showToast({
                  title: '请输入正确的手机号',
                  icon: 'none',
                });
                break;
              case 'SMS verification code error.':
                uni.showToast({
                  title: '验证码错误',
                  icon: 'none',
                });
                break;
              case 'Sms code cannot be empty':
                uni.showToast({
                  title: '验证码不能为空',
                  icon: 'none',
                });
                break;
              case 'Please send SMS to get mobile phone verification code.':
                uni.showToast({
                  title: '请使用短信验证码登录',
                  icon: 'none',
                });
                break;
              default:
                uni.showToast({
                  title: res.data.errorInfo,
                  icon: 'none',
                });
                break;
            }
          }
        }
      } catch (error) {
        console.log('>>>>>登录失败', error);
        uni.showToast({
          title: '登录失败！',
          icon: 'none',
        });
      }
    },
    async loginWithUserId() {
      try {
        const res = await loginWithPassword(this.name, this.psd);
        uni.setStorage({
          key: 'myUsername',
          data: this.name.toLowerCase(),
        });

        this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
          loginUserId: this.name,
        });
        this.setUserTokenToStorage(this.name.toLowerCase(), res.accessToken);
      } catch (error) {
        console.log('>>>>>>', error);
        uni.showToast({
          title: '登录失败',
          icon: 'none',
        });
      } finally {
        this.name = '';
        this.psd = '';
      }
    },
    setUserTokenToStorage(userId, token) {
      const params = {
        key: `EM_${userId}_TOKEN`,
        data: { token: token },
      };
      uni.setStorage({ ...params });
    },
  },
};
</script>
<style>
@import './login.css';
</style>
