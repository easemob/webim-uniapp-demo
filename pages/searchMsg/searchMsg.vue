<template>
  <view>
    <view class="search" v-if="searchMsgState.searchBtn">
      <view @tap="openSearch">
        <icon type="search" size="12"></icon>
        <text>搜索</text>
      </view>
    </view>
    <view class="search_input" v-if="searchMsgState.searchChats">
      <view>
        <icon type="search" size="12"></icon>
        <input
          placeholder="搜索"
          placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;"
          auto-focus
          confirm-type="search"
          type="text"
          @confirm="onSearch"
          @input="onInput"
          v-model="searchMsgState.inputCode"
        />
        <icon
          type="clear"
          size="12"
          @tap.stop="clearInput"
          v-if="searchMsgState.showClear"
        ></icon>
      </view>
      <text @tap="cancel">取消</text>
    </view>
    <scroll-view
      scroll-y="true"
      :class="
        'chat_list_wraper ' +
        (searchMsgState.gotop
          ? searchMsgState.isIPX
            ? 'goTopX'
            : 'goTop'
          : 'goback')
      "
      :style="'padding-bottom: ' + (searchMsgState.isIPX ? '270rpx' : '226rpx')"
    >
      <!-- render message -->
      <view
        class="message"
        v-for="item in searchMsgState.searchValue
          ? searchMsgState.searchMsgList
          : messageList"
        :key="item.id"
        :id="item.id"
      >
        <view class="main" :class="item.style">
          <view class="user">
            <!-- yourname：就是消息的 from -->
            <text class="user-text">{{
              showMessageListNickname(item.from)
            }}</text>
          </view>
          <image class="avatar" :src="showMessageListAvatar(item)" />
          <view class="msg">
            <view
              v-if="
                item.type == MESSAGE_TYPE.IMAGE ||
                item.type == MESSAGE_TYPE.VIDEO
              "
            >
              <image
                v-if="item.type == MESSAGE_TYPE.IMAGE"
                class="avatar"
                :src="item.url"
                style="width: 90px; height: 120px; margin: 2px auto"
                mode="aspectFit"
                @tap="previewImage"
                :data-url="item.url"
              />
              <!-- <video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/> -->
            </view>
            <view v-if="item.type == MESSAGE_TYPE.AUDIO">[语音]</view>
            <view v-if="item.type == MESSAGE_TYPE.FILE">[文件]</view>
            <view
              v-else-if="
                item.type == MESSAGE_TYPE.TEXT ||
                item.type == MESSAGE_TYPE.EMOJI
              "
            >
              <text class="msg-text">{{ item.msg }}</text>
            </view>
            <view
              v-if="
                item.type == MESSAGE_TYPE.CUSTOM &&
                item.customEvent === 'userCard'
              "
            >
              <text>[个人名片]</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
import { reactive, computed } from 'vue';
/* EaseIM */
import { MESSAGE_TYPE } from '@/EaseIM/constant';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useMessageStore } from '@/stores/message';
import { useContactsStore } from '@/stores/contacts';
import { onLoad, onShow } from '@dcloudio/uni-app';
const searchMsgState = reactive({
  currentUser: '',
  type: '',
  messageList: [],
  searchBtn: true,
  searchChats: false,
  inputCode: '',
  showClear: false,
  isIPX: false,
  gotop: false,
  pushConfigData: [],
  searchValue: '',
  searchMsgList: [],
  defaultAvatar: '/static/images/theme2x.png',
});
onLoad((options) => {
  searchMsgState.currentUser = options.username;
  searchMsgState.type = options.type;
});
onShow(() => {
  if (getApp().globalData.isIPX) {
    searchMsgState.isIPX = true;
  }
});
const messageStore = useMessageStore();
const messageList = computed(() => {
  return messageStore.messageCollection[searchMsgState.currentUser] || [];
});

//消息列表头像展示
const loginStore = useLoginStore();
const contactsStore = useContactsStore();
//登录用户属性
const myUserInfos = computed(() => {
  return loginStore.loginUserProfiles;
});
//好友属性
const friendUserInfoMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});

const showMessageListAvatar = computed(() => {
  const friendMap = friendUserInfoMap.value;
  return (item) => {
    if (item.from !== loginStore.loginUserBaseInfos.loginUserId) {
      return (
        friendMap.get(item.from)?.avatarurl || searchMsgState.defaultAvatar
      );
    } else {
      return myUserInfos.value?.avatarurl || searchMsgState.defaultAvatar;
    }
  };
});
//消息列表昵称显示
const showMessageListNickname = computed(() => {
  const friendMap = friendUserInfoMap.value;
  return (hxId) => {
    if (hxId !== loginStore.loginUserBaseInfos.loginUserId) {
      return friendMap.get(hxId)?.nickname || hxId;
    } else {
      return '我';
    }
  };
});
/* 搜索消息逻辑 */
const openSearch = () => {
  searchMsgState.searchBtn = false;
  searchMsgState.searchChats = true;
  searchMsgState.gotop = true;
};
const onSearch = (e) => {
  const { value } = e.detail;
  if (value) {
    let newMsgList = messageList.value.filter(
      (item) => item.type === 'txt' && item.msg.includes(value)
    );
    searchMsgState.searchValue = value;
    searchMsgState.searchMsgList = newMsgList;
  }
};
const previewImage = (event) => {
  const url = event.target.dataset.url;
  uni.previewImage({
    urls: [url], // 需要预览的图片 http 链接列表
  });
};

const cancel = () => {
  searchMsgState.searchBtn = true;
  searchMsgState.searchChats = false;
  searchMsgState.searchValue = '';
};
const clearInput = () => {
  searchMsgState.inputCode = '';
  searchMsgState.showClear = false;
  searchMsgState.searchValue = '';
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    searchMsgState.showClear = true;
  } else {
    searchMsgState.showClear = false;
    searchMsgState.searchValue = '';
  }
};
</script>
<style scoped>
@import './searchMsg.css';
</style>
