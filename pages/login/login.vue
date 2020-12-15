<template>
<view>
<view class="login">
  <image src="/static/images/loginBg.jpg" class="bg-img"></image>
	<view class="login_title">
    <image src="/static/images/loginIcon.png" style="width:100px;height:100px"></image>
	</view>
	<view :class="'login_user ' + nameFocus">
		<input type="text" placeholder="用户ID" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName">
	</view>
	<view :class="'login_pwd ' + psdFocus">
		<input :type="type == 'password' ? 'text' : type" :password="!showPassword" placeholder="用户密码" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd">
    <image class="psdIcon" :src="!showPassword ? '/static/images/eye.png' : '/static/images/eye-fill.png'" @tap="showPassword = !showPassword"></image>
	</view>
	<view class="login_btn">
		<button hover-class="btn_hover" @tap="login">登录</button>
	</view>

	<view class="login_text">
		<navigator url="../register/register" open-type="redirect">账号注册</navigator>
		<!-- <navigator url="../login_token/login_token" open-type="redirect" hover-class="navigator-hover">使用Token登录</navigator> -->
	</view>
</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let __test_account__, __test_psword__;
let disp = require("../../utils/broadcast");
let runAnimation = true;

export default {
  data() {
    return {
      name: "",
      psd: "",
      grant_type: "password",
      psdFocus: "",
      nameFocus: "",
      showPassword:false,
      type:'text'
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    const me = this;
    const app = getApp().globalData;
    
    disp.on("em.error.passwordErr", function () {
      uni.showToast({title: "用户名或密码错误",icon:'none'});
    });
  },
  methods: {
    bindUsername: function (e) {
      this.setData({
        name: e.detail.value
      });
    },
    bindPassword: function (e) {
      this.setData({
        psd: e.detail.value
      });
    },
    onFocusPsd: function () {
      this.setData({
        psdFocus: 'psdFocus'
      });
    },
    onBlurPsd: function () {
      this.setData({
        psdFocus: ''
      });
    },
    onFocusName: function () {
      this.setData({
        nameFocus: 'nameFocus'
      });
    },
    onBlurName: function () {
      this.setData({
        nameFocus: ''
      });
    },
    login: function () {
      runAnimation = !runAnimation;

      if (!__test_account__ && this.name == "") {
        uni.showToast({title: "请输入用户名！",icon:'none'});
        return;
      } else if (!__test_account__ && this.psd == "") {
        uni.showToast({title: "请输入密码！",icon:'none'});
        return;
      }

      uni.setStorage({
        key: "myUsername",
        data: __test_account__ || this.name.toLowerCase()
      });
	  console.log(111, {
        apiUrl: WebIM.config.apiURL,
        user: __test_account__ || this.name.toLowerCase(),
        pwd: __test_psword__ || this.psd,
        grant_type: this.grant_type,
        appKey: WebIM.config.appkey
      })
      getApp().globalData.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: __test_account__ || this.name.toLowerCase(),
        pwd: __test_psword__ || this.psd,
        grant_type: this.grant_type,
        appKey: WebIM.config.appkey
      });
    }
  }
};
</script>
<style>
@import "./login.css";
</style>