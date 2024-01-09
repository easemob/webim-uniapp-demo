<template>
  <view class="login_container">
    <view class="login_header">
      <image
        src="/static/images/new_ui/logo.png"
        style="width: 100px; height: 100px"
      ></image>
      <text class="login_title">环信IM Demo</text>
    </view>
    <!-- login phone number -->
    <view class="login_input_container">
      <!-- 原本是单独写输入框样式，但是小程序上不生效因此只能在customStyle中定义 -->
      <template v-if="usePhoneNumberLogin">
        <u-input
          class="login_phone_number"
          placeholder="输入手机号"
          v-model="loginPhoneNumber"
          clearable
          border="false"
          :customStyle="{
            padding: '0 15px',
            height: '48px',
            backgroundColor: '#f1f2f3',
            margin: '10px 0',
          }"
        ></u-input>
        <u-input
          class="login_auth_code"
          placeholder="输入验证码"
          v-model="loginAuthCode"
          clearable
          border="false"
          :customStyle="{
            padding: '0 5px 0 15px',
            height: '48px',
            backgroundColor: '#f1f2f3',
            margin: '10px 0',
          }"
        >
          <template slot="suffix">
            <u-code
              ref="uCode"
              @change="codeChange"
              seconds="60"
              changeText="X秒重新获取"
            ></u-code>
            <u-button
              @tap="getAuthSmsCode"
              :text="tips"
              type="primary"
            ></u-button>
          </template>
        </u-input>
      </template>
      <template v-if="!usePhoneNumberLogin">
        <u-input
          placeholder="输入环信ID"
          v-model="loginEaseIMId"
          clearable
          border="false"
          :customStyle="{
            padding: '0 15px',
            height: '48px',
            backgroundColor: '#f1f2f3',
            margin: '10px 0',
          }"
        ></u-input>
        <u-input
          password
          placeholder="输入环信密码"
          v-model="loginEaseIMPassword"
          clearable
          border="false"
          :customStyle="{
            padding: '0 15px',
            height: '48px',
            backgroundColor: '#f1f2f3',
            margin: '10px 0',
          }"
        ></u-input>
      </template>
      <u-button
        class="login_btn"
        type="primary"
        @click="loginEaseIM"
        text="登录"
      ></u-button>
      <!-- 同意隐私政策 -->
      <label class="agree_pricay_policy" key="agree">
        <view class="checkbox_icon">
          <checkbox-group @change="agreePrivacyPolicyChange">
            <checkbox
              value="agree"
              :checked="agreePrivacyPolicy"
              borderColor="#464E53"
            />
          </checkbox-group>
        </view>
        <view class="pricay_policy_container"
          >同意<text class="pricay_policy_link">《隐私政策》</text></view
        >
      </label>
    </view>
  </view>
</template>

<script>
import { emConnect } from '@/EaseIM/emApis';
const { loginWithPassword, loginWithAccessToken } = emConnect();
export default {
  data() {
    return {
      usePhoneNumberLogin: true, //是否手机号方式登录
      /* 用户名验证码方式登录 */
      loginPhoneNumber: '',
      loginAuthCode: '',
      tips: '',
      /* 环信ID环信密码登录 */
      loginEaseIMId: '',
      loginEaseIMPassword: '',
      /* 隐私政策 */
      agreePrivacyPolicy: false,
    };
  },

  methods: {
    codeChange(text) {
      this.tips = text;
    },
    agreePrivacyPolicyChange(value) {
      this.agreePrivacyPolicy = !this.agreePrivacyPolicy;
      console.log('>>>>>', value);
    },
    //获取短信验证码
    async getAuthSmsCode() {
      if (this.loginPhoneNumber == '') {
        return uni.showToast({ title: '请输入手机号！', icon: 'none' });
      }
      if (this.$refs.uCode.canGetCode) {
        console.log(this.loginPhoneNumber);
        try {
          const result = await uni.request({
            url: `https://a1.easemob.com/inside/app/sms/send/${this.loginPhoneNumber}`,
            header: {
              'content-type': 'application/json',
            },
            method: 'POST',
            data: {
              phoneNumber: this.loginPhoneNumber,
            },
          });
          const res = result[1];
          if (res.statusCode == 200) {
            uni.showToast({ title: '短信发送成功！', icon: 'none' });
            this.$refs.uCode.start();
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
        } catch (error) {
          uni.showToast({ title: '短信发送失败！', icon: 'none' });
        }
      }
    },
    async loginEaseIM() {
      if (!this.usePhoneNumberLogin) {
        if (!this.loginEaseIMId) {
          uni.showToast({
            title: '请输入用户ID！',
            icon: 'none',
          });
          return;
        } else if (!this.loginEaseIMPassword) {
          uni.showToast({
            title: '请输入用户密码！',
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
        if (!this.loginPhoneNumber) {
          uni.showToast({
            title: '请输入手机号！',
            icon: 'none',
          });
          return;
        } else if (!this.loginAuthCode) {
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
      if (!this.agreePrivacyPolicy) {
        uni.showToast({
          title: '请同意隐私政策！',
          icon: 'none',
        });
        return;
      }
      try {
        let res = await uni.request({
          url: 'https://a1.easemob.com/inside/app/user/login/V2',
          header: {
            'content-type': 'application/json',
          },
          method: 'POST',
          data: {
            phoneNumber: this.loginPhoneNumber,
            smsCode: this.loginAuthCode,
          },
        });
        console.log('>>>>>>>接口请求成功', res);
        if (res[1].statusCode == 200) {
          const { phoneNumber, token, chatUserName } = res[1].data;
          await loginWithAccessToken(chatUserName, token);
          this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
            loginUserId: chatUserName,
            phoneNumber: phoneNumber,
          });
          this.setEMUserLoginInfosToStorage(chatUserName, token);
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
      if (!this.agreePrivacyPolicy) {
        uni.showToast({
          title: '请同意隐私政策！',
          icon: 'none',
        });
        return;
      }
      try {
        const res = await loginWithPassword(
          this.loginEaseIMId,
          this.loginEaseIMPassword
        );
        this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
          loginUserId: this.loginEaseIMId,
        });
        this.setEMUserLoginInfosToStorage(
          this.loginEaseIMId.toLowerCase(),
          res.accessToken
        );
      } catch (error) {
        console.log('>>>>>>', error);
        uni.showToast({
          title: '登录失败',
          icon: 'none',
        });
      } finally {
        this.loginEaseIMId = '';
        this.loginEaseIMPassword = '';
      }
    },
    setEMUserLoginInfosToStorage(userId, token) {
      const params = {
        key: `EM_LOGIN_INFOS`,
        data: { userId: userId, token: token },
      };
      uni.setStorage({ ...params });
    },
  },
};
</script>
<style scoped>
@import './login.css';
</style>
