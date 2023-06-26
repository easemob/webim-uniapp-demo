<template>
  <view>
    <view class="search" v-if="addNewState.search_btn">
      <view @tap="openSearch">
        <text>请输入好友用户名</text>
      </view>
    </view>

    <view class="search_input" v-if="addNewState.search_chats">
      <view>
        <input
          placeholder="请输入好友用户名"
          placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
          auto-focus
          confirm-type="Search"
          type="text"
          @confirm="onSearch"
          @input="onInput"
          v-model.trim="addNewState.input_code"
        />
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
import { reactive, computed } from 'vue';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useContactsStore } from '@/stores/contacts';
/* im apis */
import { emContacts } from '@/EaseIM/imApis';
const addNewState = reactive({
  friend_name: '',
  search_btn: true,
  search_chats: false,
  show_clear: false,
  isdisable: false,
  input_code: '',
});
const contactsStore = useContactsStore();
const friendList = computed(() => {
  return contactsStore.friendList;
});
/* 搜索逻辑【实际并未搜索id是否存在】 */
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
/* 添加好友逻辑 */
const loginStore = useLoginStore();

const { addContact } = emContacts();
const add_friend = () => {
  if (addNewState.friend_name === '') {
    return uni.showToast({ title: '请输入要添加的用户！' });
  } else if (
    addNewState.friend_name.toLowerCase() ===
    loginStore.loginUserBaseInfos.loginUserId
  ) {
    return uni.showToast({ title: '不可添加自己为好友！' });
  } else if (friendList.value.includes(addNewState.friend_name)) {
    uni.showToast({
      title: '已经是你的好友',
    });
    return;
  } else {
    addContact(addNewState.friend_name, '加个好友吧！');
    uni.showToast({
      title: '已发出好友申请',
    });
    addNewState.isdisable = true;
    cancel();
  }
};
</script>
<style>
@import './addNewFriend.css';
</style>
