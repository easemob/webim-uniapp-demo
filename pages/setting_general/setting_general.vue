<template>
  <view>
    <view class="setting_list">
      <view class="setting_listContent">
        <text>当前版本</text>
        <text>{{ settingGeneralState.sdkVersion }}</text>
      </view>
    </view>

    <view class="setting_list">
      <view class="setting_listContent">
        <text>开启deBug</text>
        <switch
          :checked="settingGeneralState.switchStatus ? true : false"
          color="#0873DE"
          @change="openDebug"
        ></switch>
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

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
const WebIM = uni.WebIM;
const settingGeneralState = reactive({
  username: '',
  switchStatus: '',
  sdkVersion: '',
});
onLoad(() => {
  let myUsername = uni.getStorageSync('myUsername');
  settingGeneralState.username = myUsername;
  settingGeneralState.switchStatus = WebIM.config.isDebug;
  settingGeneralState.sdkVersion = WebIM.conn.version;
});
onShow(() => {
  settingGeneralState.switchStatus = WebIM.config.isDebug;
});
const openDebug = (event) => {
  WebIM.isDebug({
    isDebug: event.detail.value,
  });
};
</script>
<style>
@import './setting_general.css';
</style>
