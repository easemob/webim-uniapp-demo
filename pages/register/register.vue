<template>
<view>
<view class="register">
  <image src="/static/images/loginBg.jpg" class="bg-img"></image>
	<view class="register_title">
		<text style="color:#fff">注册账号</text>
	</view>
	<view :class="'register_user ' + nameFocus">
		<input type="text" placeholder="用户ID（字母或数字)" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName">
	</view>
	<view :class="'register_pwd ' + psdFocus">
		<input :type="type == 'password' ? 'text' : type" :password="!showPassword" placeholder="用户密码" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd">
    <image class="psdIcon" :src="!showPassword ? '/static/images/eye.png' : '/static/images/eye-fill.png'" @tap="showPassword = !showPassword"></image>
	</view>
	<view class="register_btn">
		<button hover-class="btn_hover" @tap="register">注册</button>
	</view>
	<view class="register_back">
		<navigator url="../login/login" open-type="redirect" >账号登录</navigator>
	</view>
</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];

export default {
  data() {
    return {
      username: "",
      password: "",
      psdFocus: "",
      nameFocus: "",
      showPassword:false,
      type:'text'
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let app = getApp().globalData;
  },
  methods: {
    bindUsername: function (e) {
      this.setData({
        username: e.detail.value
      });
    },
    bindPassword: function (e) {
      this.setData({
        password: e.detail.value
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
    register: function () {
      const that = this;

      if (that.username == "") {
        return uni.showToast({title: "请输入用户名！",icon:'none'});
      } else if (that.password == "") {
        return uni.showToast({title: "请输入密码！",icon:'none'});
      } else {
        var options = {
          apiUrl: WebIM.config.apiURL,
          username: that.username.toLowerCase(),
          password: that.password,
          nickname: "",
          appKey: WebIM.config.appkey,
          success: function (res) {
            uni.showToast({title: "注册成功"});
            var data = {
              apiUrl: WebIM.config.apiURL,
              user: that.username.toLowerCase(),
              pwd: that.password,
              grant_type: "password",
              appKey: WebIM.config.appkey
            };
            uni.setStorage({
              key: "myUsername",
              data: that.username
            });
          },
          error: function (res) {

            if (res.statusCode !== "200") {
              if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
                return uni.showToast({title: "用户名非法",icon:'none'});
              }

              uni.showToast({title: "用户名已被占用",icon:'none'});
            }
          }
        };
        WebIM.conn.registerUser(options);
      }
    }
  }
};
</script>
<style>
@import "./register.css";
</style>