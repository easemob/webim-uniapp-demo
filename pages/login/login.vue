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
      <!-- 用户名或手机号输入框 -->
      <view :class="'login_user ' + loginState.nameFocus">
        <input
          type="text"
          v-model.trim="loginState.name"
          :placeholder="
            loginState.usePwdLogin ? '请输入用户名' : '请输入手机号'
          "
          placeholder-style="color:rgb(173,185,193)"
          @focus="onFocusName"
          @blur="onBlurName"
        />
      </view>
      <!-- 用户密码输入框 -->
      <view
        :class="'login_pwd ' + loginState.psdFocus"
        v-if="loginState.usePwdLogin"
      >
        <input
          type="text"
          v-model.trim="loginState.psd"
          :password="!loginState.showPassword"
          placeholder="请输入密码"
          placeholder-style="color:rgb(173,185,193)"
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
      <!-- 验证码输入框 -->
      <view class="login_pwd" v-else>
        <input
          type="text"
          v-model.trim="loginState.psd"
          placeholder="请输入验证码"
          hover-class="input-hover"
          placeholder-style="color:rgb(173,185,193)"
          @focus="onFocusPsd"
          @blur="onBlurPsd"
        />
        <view class="login_sms" @tap="getSmsCode">{{
          loginState.btnText
        }}</view>
      </view>
      <view class="login_btn">
        <button hover-class="btn_hover" @click="loginEaseIM">登录</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { emConnect } from '@/EaseIM/imApis';
import { useLoginStore } from '@/stores/login';
let times = 60;
let timer;
const loginState = reactive({
  usePwdLogin: true, //是否用户名+密码方式登录
  name: '',
  psd: '',
  grant_type: 'password',
  psdFocus: '',
  nameFocus: '',
  showPassword: false,
  type: 'text',
  btnText: '获取验证码',
});

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
const loginStore = useLoginStore();
const { loginWithPassword, loginWithAccessToken } = emConnect();
const loginEaseIM = async () => {
  if (loginState.usePwdLogin) {
    if (!loginState.name) {
      uni.showToast({
        title: '请输入用户ID！',
        icon: 'none',
      });
      return;
    } else if (!loginState.psd) {
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
    loginWithUserId();
  } else {
    if (!loginState.name) {
      uni.showToast({
        title: '请输入手机号！',
        icon: 'none',
      });
      return;
    } else if (!loginState.psd) {
      uni.showToast({
        title: '请输入验证码！',
        icon: 'none',
      });
      return;
    }
    loginWithPhoneNumber();
  }
};
const loginWithPhoneNumber = async () => {
  try {
    let res = await uni.request({
      url: 'https://a1.easemob.com/inside/app/user/login/V2',
      header: {
        'content-type': 'application/json',
      },
      method: 'POST',
      data: {
        phoneNumber: loginState.name,
        smsCode: loginState.psd,
      },
    });
    if (res.statusCode == 200) {
      const { phoneNumber, token, chatUserName } = res.data;
      await loginWithAccessToken(chatUserName, token);
      loginStore.setLoginUserBaseInfos({
        loginUserId: chatUserName,
        phoneNumber: phoneNumber,
      });
      uni.setStorage({
        key: 'myUsername',
        data: chatUserName,
      });
      setUserTokenToStorage(chatUserName, token);
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
    }
  } catch (error) {
    uni.showToast({
      title: '登录失败！',
      icon: 'none',
    });
  }
};
const loginWithUserId = async () => {
  try {
    const res = await loginWithPassword(loginState.name, loginState.psd);
    uni.setStorage({
      key: 'myUsername',
      data: loginState.name.toLowerCase(),
    });

    loginStore.setLoginUserBaseInfos({ loginUserId: loginState.name });
    setUserTokenToStorage(loginState.name.toLowerCase(), res.accessToken);
  } catch (error) {
    console.log('>>>>>>', error);
    uni.showToast({
      title: '登录失败',
      icon: 'none',
    });
  } finally {
    loginState.name = '';
    loginState.psd = '';
  }
};
const setUserTokenToStorage = (userId, token) => {
  const params = {
    key: `EM_${userId}_TOKEN`,
    data: { token: token },
  };
  uni.setStorage({ ...params });
};
</script>
<style>
@import './login.css';
</style>
