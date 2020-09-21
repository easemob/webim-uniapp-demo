<template>
<view>
<view class="register">
	<view class="register_title">
		<text>注册</text>
	</view>
	<view :class="'register_user ' + nameFocus">
		<input type="text" placeholder="用户ID（字母或数字)" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName">
	</view>
	<view :class="'register_pwd ' + psdFocus">
		<input type="text" password placeholder="用户密码" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd">
	</view>
	<view class="register_btn">
		<button hover-class="btn_hover" @tap="register">注册</button>
	</view>
	<view class="register_back">
		<navigator url="../login/login" open-type="redirect" hover-class="navigator-hover">返回登录</navigator>
	</view>
	<!-- <block data-type="template" data-is="toast" data-attr="..._toast_">
	<view class="toast_content_box">
		<view class="toast_content" v-if="isHidefil">
			<view class="toast_content_border"></view>
			<view class="toast_content_icon">
				<image class="toast_icon_img" src="/static/images/filled@2x.png"></image>
			</view>
			<view class="toast_content_text">{{content}}</view>
		</view>

		<view class="toast_content_box">
			<view class="toast_content" v-if="isHidescss">
				<view class="toast_content_border toast_success"></view>
				<view class="toast_content_icon">
					<image class="toast_icon_img" src="/static/images/success@2x.png"></image>
				</view>
				<view class="toast_content_text">{{content}}</view>
			</view>
		</view>
	</view>
</block> -->
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
      nameFocus: ""
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
            console.log('res', res);
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
            console.log('res', res);

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