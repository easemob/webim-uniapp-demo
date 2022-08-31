<template>
  <view>
    <view class="reset">
      <image src="/static/images/loginBg.jpg" class="bg-img"></image>
      <view class="reset_title">
        <text style="color: #fff">找回密码</text>
      </view>
      <view v-if="!isNext">
        <view :class="'reset_user ' + nameFocus">
          <input
            type="text"
            placeholder="用户ID（字母或数字)"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindUsername"
            @focus="onFocusName"
            @blur="onBlurName"
          />
        </view>
        <view class="reset_pwd">
          <input
            type="text"
            placeholder="手机号"
            hover-class="input-hover"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindPhone"
          />
        </view>

        <view class="reset_pwd">
          <input
            type="text"
            placeholder="图片验证码"
            hover-class="input-hover"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindImageCode"
          />
          <view class="reset-image" @tap="getImageCode">
            <image :src="imageUrl"></image>
          </view>
        </view>

        <view class="reset_pwd">
          <input
            type="text"
            placeholder="短信验证码"
            hover-class="input-hover"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindSmsCode"
          />
          <button class="reset-image" @tap="getSmsCode">{{ btnText }}</button>
        </view>

        <view class="reset_btn">
          <button hover-class="btn_hover" @tap="checkUserInfo">下一步</button>
        </view>
      </view>
      <view v-else>
        <view :class="'reset_pwd ' + psdFocus" key="pwd">
          <input
            :type="type == 'password' ? 'text' : type"
            :password="!showPassword"
            placeholder="请输入新密码"
            hover-class="input-hover"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindConfirmPassword"
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
        <view :class="'reset_pwd ' + psdFocus" key="confirmPwd">
          <input
            :type="type == 'password' ? 'text' : type"
            :password="!showConfirmPassword"
            placeholder="请再次输入密码"
            hover-class="input-hover"
            placeholder-style="color:rgb(173,185,193)"
            @input="bindPassword"
            @focus="onFocusPsd"
            @blur="onBlurPsd"
          />
          <image
            class="psdIcon"
            :src="
              showConfirmPassword
                ? '/static/images/eye.png'
                : '/static/images/eye-fill.png'
            "
            @tap="showConfirmPassword = !showConfirmPassword"
          ></image>
        </view>
        <view class="reset_btn">
          <button hover-class="btn_hover" @tap="resetPassword">完成</button>
        </view>
      </view>
      <view class="reset_back">
        <navigator url="../login/login" open-type="redirect"
          >账号登录</navigator
        >
      </view>
    </view>
  </view>
</template>

<script>
let times = 50;
let timer;
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      psdFocus: "",
      nameFocus: "",
      type: "text",
      phoneNumber: "",
      imageId: "",
      imageCode: "",
      imageUrl: "",
      smsCode: "",
      btnText: "获取验证码",
      isNext: false // 是否是下一步
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let app = getApp().globalData;
    this.getImageCode();
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
    bindConfirmPassword: function (e) {
      this.setData({
        confirmPassword: e.detail.value
      });
    },
    bindPhone: function (e) {
      this.setData({
        phoneNumber: e.detail.value
      });
    },
    bindImageCode: function (e) {
      this.setData({
        imageCode: e.detail.value
      });
    },
    bindSmsCode: function (e) {
      this.setData({
        smsCode: e.detail.value
      });
    },
    onFocusPsd: function () {
      this.setData({
        psdFocus: "psdFocus"
      });
    },
    onBlurPsd: function () {
      this.setData({
        psdFocus: ""
      });
    },
    onFocusName: function () {
      this.setData({
        nameFocus: "nameFocus"
      });
    },
    onBlurName: function () {
      this.setData({
        nameFocus: ""
      });
    },

    getImageCode: function () {
      const self = this;
      // 获取图片验证码
      uni.request({
        url: "https://a1.easemob.com/inside/app/image",
        header: {
          "content-type": "application/json"
        },
        success(res) {
          console.log("res", res);
          const url =
            "https://a1.easemob.com/inside/app/image/" + res.data.data.image_id;
          self.setData({
            imageUrl: url,
            imageId: res.data.data.image_id
          });
        },
        fail() {
          console.log("获取验证码失败");
        }
      });
    },
    getSmsCode: function () {
      console.log(123);
      if (this.btnText != "获取验证码") return;
      if (this.phoneNumber == "") {
        return uni.showToast({ title: "请输入手机号！", icon: "none" });
      } else if (this.imageCode == "") {
        return uni.showToast({ title: "请输入图片验证码！", icon: "none" });
      }
      const self = this;
      // 发送短信验证码
      uni.request({
        url: "https://a1.easemob.com/inside/app/sms/send",
        header: {
          "content-type": "application/json"
        },
        method: "POST",
        data: {
          phoneNumber: this.phoneNumber,
          imageId: this.imageId,
          imageCode: this.imageCode
        },
        success(res) {
          console.log("res", res);
          if (res.statusCode == 200) {
            uni.showToast({ title: "短信发送成功！", icon: "none" });
            self.countDown();
          } else if (res.statusCode == 400) {
            if (res.data.errorInfo == "phone number illegal") {
              uni.showToast({ title: "请输入正确的手机号！", icon: "none" });
            } else if (
              res.data.errorInfo == "Please wait a moment while trying to send."
            ) {
              uni.showToast({
                title: "你的操作过于频繁，请稍后再试！",
                icon: "none"
              });
            } else if (res.data.errorInfo == "Image verification code error.") {
              uni.showToast({ title: "图片验证码错误！", icon: "none" });
              self.getImageCode();
            } else {
              uni.showToast({ title: res.data.errorInfo, icon: "none" });
            }
          }
        },
        fail(error) {
          uni.showToast({ title: "短信发送失败！", icon: "none" });
        }
      });
    },
    countDown: function () {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        times--;
        this.setData({
          btnText: times
        });
        if (times === 0) {
          times = 50;
          this.setData({
            btnText: "获取验证码"
          });
          return clearTimeout(timer);
        }
        this.countDown();
      }, 1000);
    },
    checkUserInfo: function () {
      console.log("检查用户信息");
      const that = this;

      if (that.username == "") {
        return uni.showToast({ title: "请输入用户名！", icon: "none" });
      } else if (that.phoneNumber == "") {
        return uni.showToast({ title: "请输入手机号！", icon: "none" });
      } else if (that.imageCode == "") {
        return uni.showToast({ title: "请输入图片验证码！", icon: "none" });
      } else if (that.smsCode == "") {
        return uni.showToast({ title: "请输入短信验证码！", icon: "none" });
      } else {
        uni.request({
          url: "https://a1.easemob.com/inside/app/user/reset/password",
          header: {
            "content-type": "application/json"
          },
          method: "POST",
          data: {
            userId: that.username,
            phoneNumber: that.phoneNumber,
            smsCode: that.smsCode
          },
          success(res) {
            if (res.data.code !== 200) {
              switch (res.data.errorInfo) {
                case "Please send SMS to get mobile phone verification code.":
                  uni.showToast({ title: "请发送短信验证码！", icon: "none" });
                  break;
                case "SMS verification code error..":
                  uni.showToast({ title: "短信验证码错误！", icon: "none" });
                  break;
                case "The phone number does not match the userId.":
                  uni.showToast({
                    title: "用户ID和手机号不匹配",
                    icon: "none"
                  });
                  break;
                default:
                  uni.showToast({
                    title: "用户信息校验失败，请重试！",
                    icon: "none"
                  });
                  break;
              }
            } else {
              that.setData({
                isNext: true
              });
            }
          },
          fail(e) {
            console.log(e);
          }
        });
      }
    },
    resetPassword: function () {
      const that = this;
      if (that.password && that.password !== that.confirmPassword) {
        return uni.showToast({
          title: "两次输入的密码不一致，请重新输入",
          icon: "none"
        });
      }
      uni.request({
        url: `https://a1.easemob.com/inside/app/user/${that.username}/password`,
        header: {
          "content-type": "application/json"
        },
        method: "PUT",
        data: {
          newPassword: that.confirmPassword
        },
        success(res) {
          if (res.data.code !== 200) {
            uni.showToast({
              title: "重置密码失败，请重试！",
              icon: "none"
            });
          } else {
            uni.showToast({
              title: "重置密码成功！",
              icon: "none"
            });

            setTimeout(() => {
              uni.redirectTo({
                url: "../login/login",
              });
            }, 1000);
          }
        },
        fail(e) {
          console.log(e);
        }
      });
    }
  }
};
</script>
<style>
@import "./resetpassword.css";
</style>
