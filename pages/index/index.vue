<template>
<!--index.wxml-->
<view @tap="bindViewTap">
	<view class="container">
	  <view class="userinfo">
	    <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></image>
	    <text class="userinfo-nickname">{{userInfo.nickName}}</text>
	  </view>
	  <view class="usermotto">
	    <text class="user-motto">{{motto}}</text>
	  </view>
	</view>
	<view class="jump">
		<button>跳过</button>
	</view>
</view>
</template>

<script>
// 获取应用实例
var app = getApp().globalData;

export default {
  data() {
    return {
      motto: "环信即时通讯云",
      userInfo: {},
      login: false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    var me = this;
    this.timeOut = setTimeout(function () {
      uni.redirectTo({
        url: "../login/login"
      });
    }, 3000); // 调用应用实例的方法获取全局数据

    getApp().globalData.getUserInfo(function (userInfo) {
      // 更新数据
      me.setData({
        userInfo: userInfo
      });
    });
  },
  methods: {
    // 事件处理函数
    bindViewTap: function () {
      clearTimeout(this.timeOut);
      uni.redirectTo({
        url: "../login/login"
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>