<template>
  <view>
      <view class="search" v-if="searchBtn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
      <view class="search_input" v-if="searchChats">
        <view>
          <icon type="search" size="12"></icon>
          <input placeholder="搜索" placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;" auto-focus
            confirm-type="search" type="text" @confirm="onSearch" @input="onInput" v-model="inputCode"/>
          <icon type="clear" size="12" @tap.stop="clearInput" v-if="showClear"></icon>
        </view>
        <text @tap="cancel">取消</text>
      </view>
    <scroll-view scroll-y="true" :class="'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')" :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')">
    <!-- render message -->
    <view class="message" v-for="item in searchValue ? searchMsgList : messageList" :key="item.mid" :id="item.mid">
      <!-- <view class="time">
				<text class="time-text">{{ item.time }}</text>
      </view>-->
      <view class="main" :class="item.style">
        <view class="user">
          <!-- yourname：就是消息的 from -->
          <text class="user-text">{{ item.from}}</text>
        </view>
        <image class="avatar" src="/static/images/theme2x.png" />
        <view class="msg">
          <view v-if="item.type == 'img' || item.type == 'video'">
            <image
              v-if="item.type == 'img'"
              class="avatar"
              :src="item.url"
              style="width:90px; height:120px; margin:2px auto;"
              mode="aspectFit"
              @tap="previewImage"
              :data-url="item.url"
            />
            <!-- <video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/> -->
          </view>
          <view v-if="item.type == 'audio'">[语音]</view>
          <view v-else-if="item.type == 'txt' || item.type == 'emoji'">
            <text class="msg-text"
              >{{ item.msg }}</text>
          </view>
        </view>
      </view>
    </view>
    </scroll-view>

  </view>
</template>
<script>
let WebIM = require("../../utils/WebIM")["default"];
let msgType = require("../../components/chat/msgtype");

import swipeDelete from "../../components/swipedelete/swipedelete";
import longPressModal from "../../components/longPressModal/index";

export default {
  data() {
    return {
      currentUser: "",
      type:"",
      messageList: [],
      searchBtn: true,
      searchChats: false,
      inputCode: "",
      showClear: false,
      isIPX: false,
      gotop: false,
      pushConfigData: [],
      searchValue: "",
      searchMsgList: []
    };
  },

  components: {
    swipeDelete,
    longPressModal,
  },
  props: {
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT,
    },
  }, 
  onShow: function () {
    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
  },
  onLoad(options) {
    this.setData({
      currentUser: options.username,
      type: options.type
    });
  },
  beforeMount() {

    // 拉取当前会话 历史记录
    WebIM.conn.mr_cache = []
    let options = {
      queue: this.currentUser, //需特别注意：如果 queue 属性值为大小写字母混合输入或全部大写会导致拉取漫游为空数组，因此需将属性值转换为全部小写。
      isGroup: this.type === 'singleChat' ? false : true,
      format: true,
      count: 200,
    };
    WebIM.conn
      .fetchHistoryMessages(options)
      .then((res) => {
        // 成功获取的历史消息。
        console.log('res>>>',res);
        this.setData({
          messageList:res.reverse()
        })
      })
      .catch((e) => {
        // 拉取失败。
      });
  },
  methods: { 
    openSearch: function () {
      this.setData({
        searchBtn: false,
        searchChats: true,
        gotop: true,
      });
    },

    onSearch: function (e) {
      const { value } = e.detail;
      if (value) {
        let newMsgList = this.messageList.filter(item => item.type=== 'txt' && item.msg.includes(value))
        this.setData({
          searchValue: value,
          searchMsgList: newMsgList
        })
      }
    },


    previewImage(event) {
      var url = event.target.dataset.url;
      uni.previewImage({
        urls: [url] // 需要预览的图片 http 链接列表

      });
    },

    cancel: function () {
       this.setData({
        searchBtn: true,
        searchChats: false,
        searchValue: ""
      });
    },
    clearInput: function () {
      this.setData({
        inputCode: "",
        showClear: false,
        searchValue:""
      });
    },
    onInput: function (e) {
      let inputValue = e.detail.value;
      if (inputValue) {
        this.setData({
          showClear: true,
        });
      } else {
        this.setData({
          showClear: false,
          searchValue:""
        });
      }
    },
    tab_contacts: function () {
      uni.redirectTo({
        url: "../main/main?myName=" + uni.getStorageSync("myUsername"),
      });
    },
    close_mask: function () {
      this.setData({
        searchBtn: true,
        searchChats: false,
      });
    },
    tab_setting: function () {
      uni.redirectTo({
        url: "../setting/setting",
      });
    },
    tab_notification: function () {
      uni.redirectTo({
        url: "../notification/notification",
      });
    },
    into_chatRoom: function (event) {
      let detail = event.currentTarget.dataset.item;
      if (
        detail.chatType == "groupchat" ||
        detail.chatType == "chatRoom" ||
        detail.groupName
      ) {
        this.into_groupChatRoom(detail);
      } else {
        this.into_singleChatRoom(detail);
      }
    },
  },
};
</script>
<style scoped>
@import "./searchMsg.css";
</style>
