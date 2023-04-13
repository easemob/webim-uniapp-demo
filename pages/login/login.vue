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
      <view :class="'login_user ' + loginState.nameFocus">
        <input
          type="text"
          v-model="loginState.name"
          :placeholder="
            loginState.usePwdLogin ? '请输入用户名' : '请输入手机号'
          "
          placeholder-style="color:rgb(173,185,193)"
          @focus="onFocusName"
          @blur="onBlurName"
        />
      </view>

      <view
        :class="'login_pwd ' + loginState.psdFocus"
        v-if="loginState.usePwdLogin"
      >
        <input
          type="text"
          :password="!loginState.showPassword"
          placeholder="请输入密码"
          placeholder-style="color:rgb(173,185,193)"
          @input="bindPassword"
          @focus="onFocusPsd"
          @blur="onBlurPsd"
        />
        <image
          class="psdIcon"
          :src="
            loginState.showPassword
              ? '/static/images/eye.png'
              : '/static/images/eye-fill.png'
          "
          @tap="loginState.showPassword = !loginState.showPassword"
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
        <view class="login_sms" @tap="getSmsCode">{{
          loginState.btnText
        }}</view>
      </view>

      <view class="login_btn">
        <button hover-class="btn_hover" @click="loginIM">登录</button>
      </view>
      <!-- <view class="login_text">
		<navigator url="../register/register" open-type="redirect">账号注册</navigator>
		<navigator url="../resetpassword/resetpassword" open-type="redirect">找回密码</navigator>
		<navigator url="../login_token/login_token" open-type="redirect" hover-class="navigator-hover">使用Token登录</navigator>
	</view> -->
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import disp from '@/utils/broadcast.js';
// let WebIM = require("../../utils/WebIM")["default"];
let __test_account__, __test_psword__;
// let disp = require("../../utils/broadcast");
let runAnimation = true;
let times = 60;
let timer;
const WebIM = uni.WebIM;
const loginState = reactive({
  usePwdLogin: true, //是否用户名+手机号方式登录
  name: '',
  psd: '',
  grant_type: 'password',
  psdFocus: '',
  nameFocus: '',
  showPassword: false,
  type: 'text',
  btnText: '获取验证码',
});
const app = getApp().globalData;

disp.on('em.error.passwordErr', function () {
  uni.showToast({
    title: '用户名或密码错误',
    icon: 'none',
  });
});

const bindUsername = (e) => {
  loginState.name = e.detail.value;
};
const bindPassword = (e) => {
  loginState.psd = e.detail.value;
};
const onFocusPsd = () => {
  loginState.psdFocus = 'psdFocus';
};
const onBlurPsd = () => {
  loginState.psdFocus = '';
};
const onFocusName = () => {
  loginState.nameFocus = 'nameFocus';
};
const onBlurName = () => {
  loginState.nameFocus = '';
};
//验证码倒计时
const countDown = () => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    times--;
    loginState.btnText = times;
    if (times === 0) {
      times = 60;
      loginState.btnText = '获取验证码';
      return clearTimeout(timer);
    }
    countDown();
  }, 1000);
};
//获取短信验证码
const getSmsCode = () => {
  if (loginState.btnText != '获取验证码') return;
  if (loginState.name == '') {
    return uni.showToast({
      title: '请输入手机号！',
      icon: 'none',
    });
  }
  // 发送短信验证码
  uni.request({
    url: `https://a1.easemob.com/inside/app/sms/send/${loginState.name}`,
    header: {
      'content-type': 'application/json',
    },
    method: 'POST',
    data: {
      phoneNumber: loginState.name,
    },
    success(res) {
      console.log('res', res);
      if (res.statusCode == 200) {
        uni.showToast({
          title: '短信发送成功！',
          icon: 'none',
        });
        countDown();
      } else if (res.statusCode == 400) {
        if (res.data.errorInfo == 'phone number illegal') {
          uni.showToast({
            title: '请输入正确的手机号！',
            icon: 'none',
          });
        } else if (
          res.data.errorInfo == 'Please wait a moment while trying to send.'
        ) {
          uni.showToast({
            title: '你的操作过于频繁，请稍后再试！',
            icon: 'none',
          });
        } else if (res.data.errorInfo.includes('exceed the limit')) {
          uni.showToast({
            title: '获取已达上限！',
            icon: 'none',
          });
        } else {
          uni.showToast({
            title: res.data.errorInfo,
            icon: 'none',
          });
        }
      }
    },
    fail(error) {
      uni.showToast({
        title: '短信发送失败！',
        icon: 'none',
      });
    },
  });
};
//登录IM
const loginIM = () => {
  runAnimation = !runAnimation;
  if (!loginState.usePwdLogin) {
    if (!__test_account__ && loginState.name == '') {
      uni.showToast({
        title: '请输入手机号！',
        icon: 'none',
      });
      return;
    } else if (!__test_account__ && loginState.psd == '') {
      uni.showToast({
        title: '请输入验证码！',
        icon: 'none',
      });
      return;
    }
    const that = loginState;
    uni.request({
      url: 'https://a1.easemob.com/inside/app/user/login/V2',
      header: {
        'content-type': 'application/json',
      },
      method: 'POST',
      data: {
        phoneNumber: that.name,
        smsCode: that.psd,
      },
      success(res) {
        if (res.statusCode == 200) {
          const { phoneNumber, token, chatUserName } = res.data;
          getApp().globalData.conn.open({
            user: chatUserName,
            accessToken: token,
          });
          getApp().globalData.phoneNumber = phoneNumber;
          uni.setStorage({
            key: 'myUsername',
            data: chatUserName,
          });
        } else if (res.statusCode == 400) {
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
        } else {
          uni.showToast({
            title: '登录失败！',
            icon: 'none',
          });
        }
      },
      fail(error) {
        uni.showToast({
          title: '登录失败！',
          icon: 'none',
        });
      },
    });
  } else {
    if (!__test_account__ && loginState.name == '') {
      uni.showToast({
        title: '请输入用户名！',
        icon: 'none',
      });
      return;
    } else if (!__test_account__ && loginState.psd == '') {
      uni.showToast({
        title: '请输入密码！',
        icon: 'none',
      });
      return;
    }
    uni.setStorage({
      key: 'myUsername',
      data: __test_account__ || loginState.name.toLowerCase(),
    });
    console.log(111, {
      apiUrl: WebIM.config.apiURL,
      user: __test_account__ || loginState.name.toLowerCase(),
      pwd: __test_psword__ || loginState.psd,
      grant_type: loginState.grant_type,
      appKey: WebIM.config.appkey,
    });
    getApp().globalData.conn.open({
      apiUrl: WebIM.config.apiURL,
      user: __test_account__ || loginState.name.toLowerCase(),
      pwd: __test_psword__ || loginState.psd,
      grant_type: loginState.grant_type,
      appKey: WebIM.config.appkey,
    });
  }
};
</script>
<style>
@import './login.css';
</style>
