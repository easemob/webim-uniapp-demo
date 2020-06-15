<template>
<view>
<view class="setting_list">
	<view class="setting_listContent">
		<text>当前版本</text>
		<text>1.2.0</text>
	</view>
</view>

<view class="setting_list">
	<view class="setting_listContent">
		<text>开启deBug</text>
		<switch :checked="switchStatus? true: false" color="#0873DE" @change="openDebug"></switch>
	</view>
</view>


<!--  <view class="person" bindtap="person">
	<view class="setting_list">
		<text>个人信息</text>
		<text class="list_right">></text>
	</view>
</view>
<view class="setting_list">
	<text>消息推送设置</text>
	<text class="list_right">></text>
</view>
<view class="setting_list">
	<text>自动登录</text>
	<switch checked/>
</view>
<view class="setting_list">
	<text>消息推送设置</text>
	<text class="list_right">></text>
</view>
<view class="setting_list">
	<text>消息推送设置</text>
	<text class="list_right">></text>
</view>
<view class="setting_list">
	<text>自动登录</text>
	<switch checked/>
</view>
<view class="setting_list">
	<text>消息推送设置</text>
	<text class="list_right">></text>
</view>
<view class="setting_list list_end">
	<text>自动登录</text>
	<switch checked/>
</view>
<button type="warn" bindtap="logout">退出登录({{ username }})</button> -->
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");

export default {
  data() {
    return {
      username: "",
      switchStatus: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let myUsername = uni.getStorageSync("myUsername");
    let me = this;
    this.setData({
      username: myUsername
    });
    this.setData({
      switchStatus: WebIM.config.isDebug
    });
  },

  onShow() {
    this.setData({
      switchStatus: WebIM.config.isDebug
    });
  },

  methods: {
    openDebug(event) {
      WebIM.isDebug({
        isDebug: event.detail.value
      });
    }

  }
};
</script>
<style>
@import "./setting_general.css";
</style>