<template>
  <view>
    <view class="setting_list">
      <view class="setting_listContent">
        <text>当前SDK版本</text>
        <text>{{ websdkVersion }}</text>
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
import { EMClient } from '@/EaseIM';
export default {
  data() {
    return {
      websdkVersion: '',
    };
  },
  onShow() {
    this.websdkVersion = EMClient.version;
  },
};
</script>
<style>
@import './settingGeneral.css';
</style>
