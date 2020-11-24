<template>
<view>
<view class="login">
	<view class="login_title">
		<text>使用token登录</text>
	</view>
	<view :class="'login_user ' + nameFocus">
		<input type="text" placeholder="用户ID" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName">
	</view>
	<view :class="'login_pwd ' + psdFocus">
		<input type="text" placeholder="token" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd">
	</view>
	<view class="login_btn">
		<button hover-class="btn_hover" @tap="login">登录</button>
	</view>
	<view class="login_text">
		<navigator url="../register/register" open-type="redirect" hover-class="navigator-hover">新用户注册</navigator>
		<navigator url="../login/login" open-type="redirect" hover-class="navigator-hover">使用密码登录</navigator>
	</view>
	<!-- <block data-type="template" data-is="toast" data-attr="..._toast_">
	<view class="toast_content_box">
		<view class="toast_content" v-if="isHidefil">
			<view class="toast_content_border"></view>
			<view class="toast_content_icon">
				<image class="toast_icon_img" src="/static/images/filled2x.png"></image>
			</view>
			<view class="toast_content_text">{{content}}</view>
		</view>

		<view class="toast_content_box">
			<view class="toast_content" v-if="isHidescss">
				<view class="toast_content_border toast_success"></view>
				<view class="toast_content_icon">
					<image class="toast_icon_img" src="/static/images/success2x.png"></image>
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
let __test_account__, __test_psword__;
let disp = require("../../utils/broadcast"); // __test_account__ = "easezy";
// __test_psword__ = "111111";

export default {
  data() {
    return {
      name: "",
      psd: "",
      grant_type: "password",
      psdFocus: "",
      nameFocus: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    const me = this;
    let app = getApp().globalData;
    disp.on("em.error.tokenErr", function () {
      uni.showToast({title: "token错误、token过期或者未授权",icon:'none'});
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
      if (!__test_account__ && this.name == "") {
        uni.showToast({title: "请输入用户名！",icon:'none'});
        return;
      } else if (!__test_account__ && this.psd == "") {
        uni.showToast({title: "请输入token！",icon:'none'});
        return;
      }

      uni.setStorage({
        key: "myUsername",
        data: __test_account__ || this.name.toLowerCase()
      });
      getApp().globalData.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: __test_account__ || this.name.toLowerCase(),
        pwd: __test_psword__ || this.psd,
        accessToken: __test_psword__ || this.psd,
        //grant_type: this.data.grant_type,
        appKey: WebIM.config.appkey
      });
    }
  }
};
</script>
<style>
@import "./login_token.css";
</style>