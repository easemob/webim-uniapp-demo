<template>
<view>
<view :class="'chat_title ' + (gotop? 'main_title_hide':'main_title_show')">
	<text>聊天</text>
</view>

<!-- <view class="chat_list_wraper" > -->
<scroll-view scroll-y="true" :class="'chat_list_wraper ' + (gotop? (isIPX? 'goTopX': 'goTop'): 'goback')" :style="'padding-bottom: ' + (isIPX?'270rpx':'226rpx')">

	<view class="search" v-if="search_btn">
		<view @tap="openSearch">
			<icon type="search" size="12"></icon>
			<text>搜索</text>
		</view>
	</view>

	<view class="search_input" v-if="search_chats">
		<view>
			<icon type="search" size="12"></icon>
			<input placeholder="搜索" placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;" auto-focus confirm-type="search" type="text" @confirm="onSearch" @input="onInput" :value="input_code" />
				<icon type="clear" size="12" @tap.stop="clearInput" v-if="show_clear"></icon>

		</view>
		<text @tap="cancel">取消</text>
	</view>

<view v-for="(item, index) in arr" :key="index" class="chat_list" :data-item="item" @tap.stop="del_chat">
	<swipe-delete>
		<view class="tap_mask" @tap.stop="into_chatRoom" :data-item="item">
			<view class="list_box">
				<view class="list_left" :data-username="item.username">
					<view class="list_pic">
						<view class="em-msgNum" v-if="item.unReadCount > 0 || item.unReadCount == '99+'">{{ item.unReadCount }}</view>
						
						<image :src="(item.chatType == 'groupchat' || item.chatType == 'chatRoom')? '../../static/images/groupTheme.png':'../../static/images/theme@2x.png'"></image>
					</view>
					<view class="list_text">
						<text class="list_user">{{(item.chatType == 'groupchat' || item.chatType == 'chatRoom' || item.groupName)?item.groupName : item.username}}</text>
						<text class="list_word" v-if="item.msg.data && item.msg.type != 'img' && item.msg.type != 'audio'">{{item.msg.data}}</text>
						<text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>
						<text class="list_word" v-if="item.msg.type == 'audio'">[语音]</text>
					</view>
				</view>
				<view class="list_right">
					<text :data-username="item.username">{{item.time}}</text>
				</view>
			</view>
		</view>
	</swipe-delete>
</view>

<view v-if="arr.length == 0" class="chat_noChat">当前没有历史聊天，添加一个好友开始聊天吧</view>
<!-- </view> -->
</scroll-view>
<!-- bug: margin-bottom 不生效 需要加一个空标签-->
<view style="height: 1px;"></view>


<view class="mask" @tap="close_mask" v-if="show_mask"></view>

<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'">
	<view class="tableBar">
		<view v-if="unReadSpotNum > 0 || unReadSpotNum == '99+'" :class="'em-unread-spot ' + (unReadSpotNum == '99+'?'em-unread-spot-litleFont':'')">{{ unReadSpotNum }}</view>
		<image :class="unReadSpotNum > 0 || unReadSpotNum == '99+'? 'haveSpot': ''" src="/static/images/sessionhighlight@2x.png"></image>
		<text class="activeText">聊天</text>
	</view>

	<view class="tableBar" @tap="tab_contacts">
		<image src="/static/images/comtacts@2x.png"></image>
		<text>联系人</text>
	</view>

	<view class="tableBar" @tap="tab_notification">
		<view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{unReadTotalNotNum}}</view>
		<image :class="unReadTotalNotNum > 0 ? 'haveSpot': ''" src="/static/images/notice.png"></image>
		<text>通知</text>
	</view>
	
	<view class="tableBar" @tap="tab_setting">
		<image src="/static/images/setting@2x.png"></image>
		<text>设置</text>
	</view>
</view>
</view>
</template>

<script>
let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let isfirstTime = true;
import swipeDelete from "../../comps/swipedelete/swipedelete";

export default {
  data() {
    return {
      search_btn: true,
      search_chats: false,
      show_mask: false,
      yourname: "",
      unReadSpotNum: 0,
      unReadNoticeNum: 0,
      messageNum: 0,
      unReadTotalNotNum: 0,
      arr: [],
      show_clear: false,
      member: "",
      isIPX: false,
      gotop: false,
      input_code: ""
    };
  },

  components: {
    swipeDelete
  },
  props: {},

  onLoad() {
    let me = this; //监听加好友申请

    disp.on("em.subscribe", function () {
      me.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    }); //监听解散群

    disp.on("em.invite.deleteGroup", function () {
      me.listGroups();
      me.getRoster();
      me.setData({
        arr: me.getChatList(),
        messageNum: getApp().globalData.saveFriendList.length
      });
    }); //监听未读消息数

    disp.on("em.unreadspot", function (message) {
      me.setData({
        arr: me.getChatList(),
        unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
      });
    }); //监听未读加群“通知”

    disp.on("em.invite.joingroup", function () {
      me.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    });
    disp.on("em.contacts.remove", function () {
      me.getRoster(); // me.setData({
      // 	arr: me.getChatList(),
      // 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      // });
    });
    this.getRoster();
  },

  onShow: function () {
    this.setData({
      arr: this.getChatList(),
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      messageNum: getApp().globalData.saveFriendList.length,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
  },
  methods: {
    listGroups() {
      var me = this;
      return WebIM.conn.listGroups({
        limit: 100,
        success: function (res) {
          wx.setStorage({
            key: "listGroup",
            data: res.data
          });
          me.getChatList();
        },
        error: function (err) {
          console.log(err);
        }
      });
    },

    getRoster() {
      let me = this;
      let rosters = {
        success(roster) {
          var member = [];

          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }

          wx.setStorage({
            key: "member",
            data: member
          });
          me.setData({
            member: member
          });
          me.listGroups(); //if(!systemReady){

          disp.fire("em.main.ready"); //systemReady = true;
          //}

          me.setData({
            arr: me.getChatList(),
            unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
          });
        },

        error(err) {
          console.log(err);
        }

      };
      WebIM.conn.getRoster(rosters);
    },

    getChatList() {
      var array = [];
      var member = wx.getStorageSync("member");
      var myName = wx.getStorageSync("myUsername");
      var listGroups = wx.getStorageSync('listGroup') || [];

      for (let i = 0; i < member.length; i++) {
        let newChatMsgs = wx.getStorageSync(member[i].name + myName) || [];
        let historyChatMsgs = wx.getStorageSync("rendered_" + member[i].name + myName) || [];
        let curChatMsgs = historyChatMsgs.concat(newChatMsgs);

        if (curChatMsgs.length) {
          let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
          lastChatMsg.unReadCount = newChatMsgs.length;

          if (lastChatMsg.unReadCount > 99) {
            lastChatMsg.unReadCount = "99+";
          }

          let dateArr = lastChatMsg.time.split(' ')[0].split('-');
          let timeArr = lastChatMsg.time.split(' ')[1].split(':');
          let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
          lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
          lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
          array.push(lastChatMsg);
        }
      }

      for (let i = 0; i < listGroups.length; i++) {
        let newChatMsgs = wx.getStorageSync(listGroups[i].groupid + myName) || [];
        let historyChatMsgs = wx.getStorageSync("rendered_" + listGroups[i].groupid + myName) || [];
        let curChatMsgs = historyChatMsgs.concat(newChatMsgs);

        if (curChatMsgs.length) {
          let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
          lastChatMsg.unReadCount = newChatMsgs.length;

          if (lastChatMsg.unReadCount > 99) {
            lastChatMsg.unReadCount = "99+";
          }

          let dateArr = lastChatMsg.time.split(' ')[0].split('-');
          let timeArr = lastChatMsg.time.split(' ')[1].split(':');
          let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
          lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
          lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
          lastChatMsg.groupName = listGroups[i].groupname;
          array.push(lastChatMsg);
        }
      } //	测试列表
      // for (let i = 0; i < 12; i++) {
      // 	let newSESSION = {
      // 		info: {from: "zdtest", to: "zdtest2"},
      // 		mid: "txtWEBIM_427ab8b10c",
      // 		msg: {type: "txt", data: [{data: "丢晚高峰阿精高峰阿精神焕高峰阿精神焕高峰阿精神焕神焕发丢完", type: "txt"}]},
      // 		style: "self",
      // 		time: "2019-2-18 16:59:25",
      // 		username: "zdtest" + i,
      // 		yourname: "zdtest"
      // 	}
      // 	let dateArr = newSESSION.time.split(' ')[0].split('-')
      // 	let timeArr = newSESSION.time.split(' ')[1].split(':')
      // 	newSESSION.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
      // 	array.push(newSESSION)
      // }


      array.sort((a, b) => {
        return b.dateTimeNum - a.dateTimeNum;
      });
      console.log('array', array);
      return array;
    },

    openSearch: function () {
      this.setData({
        search_btn: false,
        search_chats: true,
        gotop: true
      });
    },
    onSearch: function (val) {
      let searchValue = val.detail.value;
      let chartList = this.getChatList();
      let serchList = [];
      chartList.forEach((item, index) => {
        if (String(item.username).indexOf(searchValue) != -1) {
          serchList.push(item);
        }
      });
      this.setData({
        arr: serchList
      });
    },
    cancel: function () {
      this.setData({
        search_btn: true,
        search_chats: false,
        arr: this.getChatList(),
        unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
        gotop: false
      });
    },
    clearInput: function () {
      this.setData({
        input_code: '',
        show_clear: false
      });
    },
    onInput: function (e) {
      let inputValue = e.detail.value;

      if (inputValue) {
        this.setData({
          show_clear: true
        });
      } else {
        this.setData({
          show_clear: false
        });
      }
    },
    tab_contacts: function () {
      wx.redirectTo({
        url: "../main/main?myName=" + wx.getStorageSync("myUsername")
      });
    },
    close_mask: function () {
      this.setData({
        search_btn: true,
        search_chats: false,
        show_mask: false
      });
    },
    tab_setting: function () {
      wx.redirectTo({
        url: "../setting/setting"
      });
    },
    tab_notification: function () {
      wx.redirectTo({
        url: "../notification/notification"
      });
    },
    into_chatRoom: function (event) {
      let detail = event.currentTarget.dataset.item; //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段

      if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
        this.into_groupChatRoom(detail);
      } else {
        this.into_singleChatRoom(detail);
      }
    },
    //	单聊
    into_singleChatRoom: function (detail) {
      var my = wx.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.username
      };
      wx.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
      });
    },
    //	群聊 和 聊天室 （两个概念）
    into_groupChatRoom: function (detail) {
      var my = wx.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.groupName,
        groupId: detail.info.to
      };
      wx.navigateTo({
        url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
      });
    },
    del_chat: function (event) {
      let detail = event.currentTarget.dataset.item;
      let nameList;

      if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
        nameList = {
          your: detail.info.to
        };
      } else {
        nameList = {
          your: detail.username
        };
      }

      var myName = wx.getStorageSync("myUsername");
      var currentPage = getCurrentPages();
      wx.showModal({
        title: "删除该聊天记录",
        confirmText: "删除",
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync(nameList.your + myName, "");
            wx.setStorageSync("rendered_" + nameList.your + myName, "");

            if (currentPage[0]) {
              currentPage[0].onShow();
            }

            disp.fire("em.chat.session.remove");
          }
        },
        fail: function (err) {}
      });
    }
  }
};
</script>
<style>
@import "./chat.css";
</style>