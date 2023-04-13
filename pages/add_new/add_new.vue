<template>
  <view>
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
    <!-- <view class="search_input">
        <view>
            <input placeholder="好友名称" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" auto-focus bindinput="bindFriendName"></input>
        </view>
    </view> -->

    <!-- <button bindtap="add_friend">发送申请</button> -->

    <view class="search" v-if="addNewState.search_btn">
      <view @tap="openSearch">
        <icon type="search" size="13"></icon>
        <text>请输入好友用户名</text>
      </view>
    </view>

    <view class="search_input" v-if="addNewState.search_chats">
      <view>
        <icon type="search" size="13"></icon>
        <input
          placeholder="请输入好友用户名"
          placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
          auto-focus
          confirm-type="Search"
          type="text"
          @confirm="onSearch"
          @input="onInput"
          v-model="addNewState.input_code"
        />
        <icon
          type="clear"
          size="13"
          @tap.stop="clearInput"
          v-if="addNewState.show_clear"
        ></icon>
      </view>
      <text @tap="cancel">取消</text>
    </view>

    <view class="address_bottom" v-if="addNewState.show_clear">
      <image src="/static/images/theme2x.png" data-username="1"></image>
      <text>{{ addNewState.friend_name }}</text>
      <button @tap="add_friend" :disabled="addNewState.isdisable">
        发送申请
      </button>
    </view>
    <view class="add_nobody" v-if="!addNewState.show_clear"
      >请输入好友的username,申请成为好友吧</view
    >
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
const WebIM = uni.WebIM;
// let WebIM = require('../../utils/WebIM')['default'];
const addNewState = reactive({
  friend_name: '',
  search_btn: true,
  search_chats: false,
  show_clear: false,
  isdisable: false,
  input_code: '',
});
onLoad(() => {
  let app = getApp().globalData;
});
const openSearch = () => {
  addNewState.search_btn = false;
  addNewState.search_chats = true;
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    addNewState.show_clear = true;
    addNewState.friend_name = inputValue;
    addNewState.isdisable = false;
  } else {
    addNewState.show_clear = false;
  }
};
const clearInput = () => {
  addNewState.input_code = '';
  addNewState.show_clear = false;
};
const cancel = () => {
  addNewState.search_btn = true;
  addNewState.search_chats = false;
  addNewState.show_clear = false;
};
const onSearch = () => {
  console.log('>>>>>开始搜索');
};
const add_friend = () => {
  let myName = uni.getStorageSync('myUsername');
  if (addNewState.friend_name == '') {
    return uni.showToast({ title: '请输入要添加的用户！' });
  } else if (addNewState.friend_name.toLowerCase() == myName.toLowerCase()) {
    return uni.showToast({ title: '不可添加自己为好友！' });
  }
  {
    WebIM.conn.addContact(addNewState.friend_name, myName + '请求添加好友');
    const friendList = uni.getStorageSync('member');
    if (friendList.includes(addNewState.friend_name)) {
      uni.showToast({
        title: '已经是你的好友',
      });
      return;
    } else {
      uni.showToast({
        title: '已发出好友申请',
      });
    }

    addNewState.isdisable = true;
  }
};
</script>
<style>
@import './add_new.css';
</style>
