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
		<image class="psdIcon" :src="showPassword ? '/static/images/eye.png' : '/static/images/eye-fill.png'" @tap="showPassword = !showPassword"></image>
	</view>
	
	<view class="register_pwd">
		<input type="text" placeholder="手机号" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindPhone" />
	</view>

	<view class="register_pwd">
		<input type="text" placeholder="图片验证码" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindImageCode" />
		<view class="register-image" @tap="getImageCode">
			<image :src="imageUrl"></image>
		</view>
	</view>

	<view class="register_pwd">
		<input type="text" placeholder="短信验证码" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindSmsCode"/>
		<button class="register-image" @tap="getSmsCode">{{btnText}}</button>
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

let times = 50;
let timer
export default {
  data() {
    return {
      username: "",
      password: "",
      psdFocus: "",
      nameFocus: "",
      showPassword:false,
      type:'text',
	  phoneNumber: '',
	  imageId: '',
	  imageCode: '',
	  imageUrl: '',
	  smsCode: '',
	  btnText: '获取验证码'
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let app = getApp().globalData;
	this.getImageCode()
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
	bindPhone: function(e){
		this.setData({
		  phoneNumber: e.detail.value
		});
	},
	bindImageCode: function(e){
		this.setData({
		  imageCode: e.detail.value
		});
	},
	bindSmsCode: function(e){
		this.setData({
		  smsCode: e.detail.value
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
	
	getImageCode: function(){
		const self = this;
		// 获取图片验证码
		uni.request({
		  url: 'https://a1.easemob.com/inside/app/image',
		  header: {
			'content-type': 'application/json'
		  },
		  success (res) {
			console.log('res', res)
			const url = 'https://a1.easemob.com/inside/app/image/' + res.data.data.image_id
			self.setData({
				imageUrl: url,
				imageId: res.data.data.image_id
			})
		  },
		  fail(){
			console.log('获取验证码失败')
		  }
		})
	},
	getSmsCode: function(){
		if(this.btnText != '获取验证码') return
		if (this.phoneNumber == "") {
		  return uni.showToast({title: "请输入手机号！",icon:'none'});
		} else if(this.imageCode == "") {
			return uni.showToast({title: "请输入图片验证码！",icon:'none'});
		} 
		const self = this
		// 发送短信验证码
		uni.request({
			url: 'https://a1.easemob.com/inside/app/sms/send',
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			data: {
				phoneNumber: this.phoneNumber,
				imageId: this.imageId,
				imageCode: this.imageCode
			},
			success (res) {
				console.log('res', res)
				if(res.statusCode == 200){
					uni.showToast({title: "短信发送成功！",icon:'none'})
					self.countDown()
				}else if(res.statusCode == 400){
					if(res.data.errorInfo == 'phone number illegal'){
						uni.showToast({title: "请输入正确的手机号！",icon:'none'})
					}else if(res.data.errorInfo == 'Please wait a moment while trying to send.'){
						uni.showToast({title: "你的操作过于频繁，请稍后再试！",icon:'none'})
					}else if(res.data.errorInfo == 'Image verification code error.'){
						uni.showToast({title: "图片验证码错误！",icon:'none'})
						self.getImageCode()
					}else{
						uni.showToast({title: res.data.errorInfo,icon:'none'})
					}
				}
			},
			fail(error){
				uni.showToast({title: "短信发送失败！",icon:'none'})
			}
		})
		
	},
    countDown: function(){
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			times--
			this.setData({
				btnText: times
			})
			if (times === 0) {
				times = 50
				this.setData({
					btnText: '获取验证码'
				})
				return clearTimeout(timer)
			}
			this.countDown()
		}, 1000)
	},
	register: function () {
      const that = this;

      if (that.username == "") {
        return uni.showToast({title: "请输入用户名！",icon:'none'});
      } else if (that.password == "") {
        return uni.showToast({title: "请输入密码！",icon:'none'});
      } else if (that.phoneNumber == ''){
		  return uni.showToast({title: "请输入手机号！",icon:'none'});
	  } else if(that.imageCode == ''){
		  return uni.showToast({title: "请输入图片验证码！",icon:'none'});
	  } else if(that.smsCode == ''){
		  return uni.showToast({title: "请输入短信验证码！",icon:'none'});
	  } else {
		  
		// 在 appserver 注册用户
		uni.request({
			url: 'https://a1.easemob.com/inside/app/user/register',
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			data: {
				userId: that.username,
				userPassword: that.password,
				phoneNumber: that.phoneNumber,
				smsCode: that.smsCode,
				imageId: that.imageId,
				imageCode: that.imageCode
			},
			success (res) {
				if(res.statusCode == 200){
					uni.showToast({title: "注册成功！",icon:'none'});
										
					var data = {
						apiUrl: WebIM.config.apiURL,
						user: that.username.toLowerCase(),
						pwd: that.password,
						grant_type: "password",
						appKey: WebIM.config.appkey
					};
					wx.setStorage({
						key: "myUsername",
						data: that.username
					});
					// wx.redirectTo({
					// 	url: "../login/login?username="+that.data.username+"&password="+that.data.password
					// });
				}else if(res.statusCode == 400){
					if(res.data.errorInfo){
						uni.showToast({title: res.data.errorInfo,icon:'none'});
					}
				}else{
					uni.showToast({title: '注册失败！',icon:'none'});
				}
			},
			fail(error){
				uni.showToast({title: '注册失败！',icon:'none'});
			}
		})
		
      }
    }
  }
};
</script>
<style>
@import "./register.css";
</style>