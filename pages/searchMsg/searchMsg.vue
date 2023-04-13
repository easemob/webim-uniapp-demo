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
          : searchMsgState.messageList"
        :key="item.mid"
        :id="item.mid"
      >
        <!-- <view class="time">
				<text class="time-text">{{ item.time }}</text>
      </view>-->
        <view class="main" :class="item.style">
          <view class="user">
            <!-- yourname：就是消息的 from -->
            <text class="user-text">{{ item.from }}</text>
          </view>
          <image class="avatar" src="/static/images/theme2x.png" />
          <view class="msg">
            <view v-if="item.type == 'img' || item.type == 'video'">
              <image
                v-if="item.type == 'img'"
                class="avatar"
                :src="item.url"
                style="width: 90px; height: 120px; margin: 2px auto"
                mode="aspectFit"
                @tap="previewImage"
                :data-url="item.url"
              />
              <!-- <video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/> -->
            </view>
            <view v-if="item.type == 'audio'">[语音]</view>
            <view v-else-if="item.type == 'txt' || item.type == 'emoji'">
              <text class="msg-text">{{ item.msg }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import msgType from '@/components/chat/msgtype';
import swipeDelete from '@/components/swipedelete/swipedelete';
const WebIM = uni.WebIM;
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
});
onLoad((options) => {
  console.log('options', options);
  searchMsgState.currentUser = options.username;
  searchMsgState.type = options.type;
});
onShow(() => {
  if (getApp().globalData.isIPX) {
    searchMsgState.isIPX = true;
  }
});
const fetchHistoryMessageFromServer = () => {
  console.log('>>>>>拉取历史消息');
  // 拉取当前会话 历史记录
  WebIM.conn.mr_cache = [];
  let options = {
    queue: searchMsgState.currentUser, //需特别注意：如果 queue 属性值为大小写字母混合输入或全部大写会导致拉取漫游为空数组，因此需将属性值转换为全部小写。
    isGroup: searchMsgState.type === 'singleChat' ? false : true,
    format: true,
    count: 200,
  };
  WebIM.conn
    .fetchHistoryMessages(options)
    .then((res) => {
      // 成功获取的历史消息。
      console.log('res>>>', res);
      searchMsgState.messageList = res.reverse();
    })
    .catch((e) => {
      console.log('>>>>>>拉取失败', e);
      // 拉取失败。
    });
};
onMounted(() => {
  fetchHistoryMessageFromServer();
});
const openSearch = () => {
  searchMsgState.searchBtn = false;
  searchMsgState.searchChats = true;
  searchMsgState.gotop = true;
};
const onSearch = (e) => {
  const { value } = e.detail;
  if (value) {
    let newMsgList = searchMsgState.messageList.filter(
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

const tab_contacts = () => {
  uni.redirectTo({
    url: '../main/main?myName=' + uni.getStorageSync('myUsername'),
  });
};
const close_mask = () => {
  searchMsgState.searchBtn = true;
  searchMsgState.searchChats = false;
};
const tab_setting = () => {
  uni.redirectTo({
    url: '../setting/setting',
  });
};
const tab_notification = () => {
  uni.redirectTo({
    url: '../notification/notification',
  });
};
const into_chatRoom = (event) => {
  let detail = event.currentTarget.dataset.item;
  if (
    detail.chatType == 'groupchat' ||
    detail.chatType == 'chatRoom' ||
    detail.groupName
  ) {
    into_groupChatRoom(detail);
  } else {
    into_singleChatRoom(detail);
  }
};
</script>
<style scoped>
@import './searchMsg.css';
</style>
