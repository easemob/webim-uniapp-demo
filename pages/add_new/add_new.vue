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

<view class="search" v-if="search_btn">
	<view @tap="openSearch">
		<icon type="search" size="13"></icon>
		<text>请输入好友用户名</text>
	</view>
</view>

<view class="search_input" v-if="search_chats">
	<view>
		<icon type="search" size="13"></icon>
		<input placeholder="请输入好友用户名" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" auto-focus confirm-type="Search" type="text" @confirm="onSearch" @input="onInput" v-model="input_code">
			<icon type="clear" size="13" @tap.stop="clearInput" v-if="show_clear"></icon>
	</view>
	<text @tap="cancel">取消</text>
</view>

<view class="address_bottom" v-if="show_clear">
	<image src="/static/images/theme2x.png" data-username="1"></image>
	<text>{{friend_name}}</text>
	<button @tap="add_friend" :disabled="isdisable">发送申请</button>
</view> 
<view class="add_nobody" v-if="!show_clear">请输入好友的username,申请成为好友吧</view>
</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];

export default {
  data() {
    return {
      friend_name: "",
      search_btn: true,
      search_chats: false,
      show_clear: false,
      isdisable: false,
      input_code: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let app = getApp().globalData;
  },
  methods: {
    openSearch: function () {
      this.setData({
        search_btn: false,
        search_chats: true
      });
    },
    onInput: function (e) {
      let inputValue = e.detail.value;

      if (inputValue) {
        this.setData({
          show_clear: true,
          friend_name: inputValue,
          isdisable: false
        });
      } else {
        this.setData({
          show_clear: false
        });
      }
    },
    clearInput: function () {
      this.setData({
        input_code: '',
        show_clear: false
      });
    },
    cancel: function () {
      this.setData({
        search_btn: true,
        search_chats: false,
        show_clear: false
      });
    },
    add_friend: function () {
      let me = this;
      let myName = uni.getStorageSync("myUsername");
      if (me.friend_name == "" || me.friend_name.toLowerCase() == myName.toLowerCase()) {
        uni.showToast({title: "添加失败"});
        return;
      }

      WebIM.conn.addContact(
        me.friend_name,
        myName + '请求添加好友'
      );

      let rosters = {
        success: function (roster) {
          console.log('success');
          var member = [];

          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }

          if (me.isExistFriend(me.friend_name, member)) {
            uni.showToast({
                	title: "已经是你的好友",
                });
          } else {
             uni.showToast({
                	title: "已发出好友申请",
                });
          }

          me.setData({
            isdisable: true
          });
        }
      };
      WebIM.conn.getContacts(rosters);
    },
    isExistFriend: function (name, list) {
      for (let index = 0; index < list.length; index++) {
        if (name == list[index].name) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>
<style>
@import "./add_new.css";
</style>