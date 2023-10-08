<template>
  <view>
    <view class="search" v-if="search_btn">
      <view @tap="openSearch">
        <icon type="search" size="13"></icon>
        <text>请输入好友用户名</text>
      </view>
    </view>

    <view class="search_input" v-if="search_chats">
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
          v-model.trim="input_code"
        />
        <icon
          type="clear"
          size="13"
          @tap.stop="clearInput"
          v-if="show_clear"
        ></icon>
      </view>
      <text @tap="cancel">取消</text>
    </view>

    <view class="address_bottom" v-if="show_clear">
      <image src="/static/images/theme2x.png" data-username="1"></image>
      <text>{{ friend_name }}</text>
      <button @tap="addNewFriend" :disabled="isdisable">发送申请</button>
    </view>
    <view class="add_nobody" v-if="!show_clear"
      >请输入好友的username,申请成为好友吧</view
    >
  </view>
</template>

<script>
import { emContacts } from '@/EaseIM/emApis';
const { addContact } = emContacts();
let WebIM = require('../../utils/WebIM')['default'];

export default {
  data() {
    return {
      friend_name: '',
      search_btn: true,
      search_chats: false,
      show_clear: false,
      isdisable: false,
      input_code: '',
    };
  },
  computed: {
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
  },
  methods: {
    openSearch: function () {
      this.search_btn = false;
      this.search_chats = true;
    },
    onInput: function (e) {
      const inputValue = e.detail.value;
      if (inputValue) {
        this.show_clear = true;
        this.friend_name = inputValue;
        this.isdisable = false;
      } else {
        this.show_clear = false;
      }
    },
    clearInput: function () {
      this.input_code = '';
      this.show_clear = false;
    },
    cancel: function () {
      this.search_btn = true;
      this.search_chats = false;
      this.show_clear = false;
    },
    addNewFriend() {
      if (this.friend_name === '') {
        return uni.showToast({ title: '请输入要添加的用户！' });
      } else if (this.friend_name.toLowerCase() === this.loginUserId) {
        return uni.showToast({ title: '不可添加自己为好友！' });
      } else if (this.friendList.includes(this.friend_name)) {
        uni.showToast({
          title: '已经是你的好友',
        });
        return;
      } else {
        try {
          addContact(this.friend_name, '加个好友吧！');
          uni.showToast({
            title: '已发出好友申请',
          });
        } catch (error) {
          uni.showToast({
            title: error.message,
            icon: 'none',
          });
        } finally {
          this.isdisable = true;
          this.cancel();
        }
      }
    },
  },
};
</script>
<style>
@import './addNewFriend.css';
</style>
