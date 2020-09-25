<template>
  <view>
    <view
      :class="'chat_title ' + (gotop ? 'main_title_hide' : 'main_title_show')"
    >
      <text>聊天</text>
    </view>

    <!-- <view class="chat_list_wraper" > -->
    <scroll-view
      scroll-y="true"
      :class="
        'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
      "
      :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')"
    >
      <view class="search" v-if="search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>

      <view class="search_input" v-if="search_chats">
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
            :value="input_code"
          />
          <icon
            type="clear"
            size="12"
            @tap.stop="clearInput"
            v-if="show_clear"
          ></icon>
        </view>
        <text @tap="cancel">取消</text>
      </view>

      <view
        v-for="(item, index) in arr"
        :key="index"
        class="chat_list"
        :data-item="item"
        @tap.stop="del_chat"
      >
        <swipe-delete>
          <view class="tap_mask" @tap.stop="into_chatRoom" :data-item="item">
            <view class="list_box">
              <view class="list_left" :data-username="item.username">
                <view class="list_pic">
                  <view
                    class="em-msgNum"
                    v-if="item.unReadCount > 0 || item.unReadCount == '99+'"
                    >{{ item.unReadCount }}</view
                  >

                  <image
                    :src="
                      item.chatType == 'groupchat' ||
                      item.chatType == 'chatRoom'
                        ? '../../static/images/groupTheme.png'
                        : '../../static/images/theme@2x.png'
                    "
                  ></image>
                </view>
                <view class="list_text">
                  <text class="list_user">{{
                    item.chatType == "groupchat" ||
                    item.chatType == "chatRoom" ||
                    item.groupName
                      ? item.groupName
                      : item.username
                  }}</text>
                  <text class="list_word" v-if="item.msg.data[0].data">{{
                    item.msg.data[0].data
                  }}</text>
                  <text class="list_word" v-if="item.msg.type == 'img'"
                    >[图片]</text
                  >
                  <text class="list_word" v-if="item.msg.type == 'audio'"
                    >[语音]</text
                  >
                  <!-- <text class="list_word" v-if="item.msg.type == 'video'"
                    >[视频]</text
                  > -->
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{ item.time }}</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>

      <view v-if=" arr.length == 0" class="chat_noChat"
        >当前没有历史聊天，添加一个好友开始聊天吧</view
      >
      <!-- </view> -->
    </scroll-view>
    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <view class="mask" @tap="close_mask" v-if="show_mask"></view>

    <view :class="isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar">
        <view
          v-if="unReadSpotNum > 0 || unReadSpotNum == '99+'"
          :class="
            'em-unread-spot ' +
            (unReadSpotNum == '99+' ? 'em-unread-spot-litleFont' : '')
          "
          >{{ unReadSpotNum }}</view
        >
        <image
          :class="unReadSpotNum > 0 || unReadSpotNum == '99+' ? 'haveSpot' : ''"
          src="/static/images/sessionhighlight@2x.png"
        ></image>
        <text class="activeText">聊天</text>
      </view>

      <view class="tableBar" @tap="tab_contacts">
        <image src="/static/images/comtacts@2x.png"></image>
        <text>联系人</text>
      </view>

      <view class="tableBar" @tap="tab_notification">
        <view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{
          unReadTotalNotNum
        }}</view>
        <image
          :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''"
          src="/static/images/notice.png"
        ></image>
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

  onLoad () {
    let me = this; 
    
    //监听加好友申请
    disp.on("em.subscribe", function () {
      me.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
      });
    }); 

    //监听解散群
    disp.on("em.invite.deleteGroup", function () {
      me.listGroups();
      me.getRoster();
      me.getChatList()
      me.setData({
        // arr: me.getChatList(),
        messageNum: getApp().globalData.saveFriendList.length
      });
    }); 
    
    //监听未读消息数
    disp.on("em.unreadspot", function (message) {
      me.getChatList()
      me.setData({
        // arr: me.getChatList(),
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
    this.getChatList()
    this.setData({
      // arr: this.getChatList(),
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
      return WebIM.conn.getGroup({
        limit: 50,
        success: function (res) {
          uni.setStorage({
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

          uni.setStorage({
            key: "member",
            data: member
          });
          me.setData({
            member: member
          });
          me.listGroups(); //if(!systemReady){

          disp.fire("em.main.ready"); //systemReady = true;
          //}
          me.getChatList()
          me.setData({
            // arr: me.getChatList(),
            unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
          });
        },

        error(err) {
          console.log(err);
        }

      };
      WebIM.conn.getRoster(rosters);
    },

    // // 不包含陌生人版本
    // getChatList() {
    //   var array = [];
    //   var member = uni.getStorageSync("member");
    //   var myName = uni.getStorageSync("myUsername");
    //   var listGroups = uni.getStorageSync('listGroup') || [];

    //   for (let i = 0; i < member.length; i++) {
    //     let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
    //     let historyChatMsgs = uni.getStorageSync("rendered_" + member[i].name + myName) || [];
    //     let curChatMsgs = historyChatMsgs.concat(newChatMsgs);

    //     if (curChatMsgs.length) {
    //       let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
    //       lastChatMsg.unReadCount = newChatMsgs.length;

    //       if (lastChatMsg.unReadCount > 99) {
    //         lastChatMsg.unReadCount = "99+";
    //       }

    //       let dateArr = lastChatMsg.time.split(' ')[0].split('-');
    //       let timeArr = lastChatMsg.time.split(' ')[1].split(':');
    //       let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
    //       lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
    //       lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
    //       array.push(lastChatMsg);
    //     }
    //   }

    //   for(let i = 0; i < listGroups.length; i++){
		// 	let newChatMsgs = uni.getStorageSync(listGroups[i].groupid + myName) || [];
		// 	let historyChatMsgs = uni.getStorageSync("rendered_" + listGroups[i].groupid + myName) || [];
		// 	let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
		// 	if(curChatMsgs.length){
		// 		let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
		// 		lastChatMsg.unReadCount = newChatMsgs.length;
		// 		if(lastChatMsg.unReadCount > 99) {
		// 			lastChatMsg.unReadCount = "99+";
		// 		}
		// 		let dateArr = lastChatMsg.time.split(' ')[0].split('-')
		// 		let timeArr = lastChatMsg.time.split(' ')[1].split(':')
		// 		let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
		// 		lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
		// 		lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
		// 		lastChatMsg.groupName = listGroups[i].groupname
		// 		array.push(lastChatMsg);
		// 	}
		// } 

    //   array.sort((a, b) => {
    //     return b.dateTimeNum - a.dateTimeNum;
    //   });
    //   console.log('array', array);
    //   return array;
    // },
    

    // 包含陌生人版本
  getChatList(){
		var myName = uni.getStorageSync("myUsername");
		var array = [];
		const me = this
		uni.getStorageInfo({
			success: function(res){
        let storageKeys = res.keys
				let newChatMsgKeys = [];
				let historyChatMsgKeys = [];
				storageKeys.forEach((item) => {
					if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
						newChatMsgKeys.push(item)
					}else if(item.indexOf(myName) > -1 && item.indexOf('rendered_') > -1){
						historyChatMsgKeys.push(item)
					}
				})

			  cul.call(me, newChatMsgKeys, historyChatMsgKeys)
			}
		})

		function cul(newChatMsgKeys, historyChatMsgKeys){
			let array = []
			let lastChatMsg;
			for(let i = 0; i < historyChatMsgKeys.length; i++){
				let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9))
				if ( index > -1 ) {
          let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
					if(newChatMsgs.length){
						lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if(lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = "99+";
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						newChatMsgKeys.splice(index, 1)
					}else{
						let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
						if (historyChatMsgs.length) {
							lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
							let dateArr = lastChatMsg.time.split(' ')[0].split('-')
							let timeArr = lastChatMsg.time.split(' ')[1].split(':')
							let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
							lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
							lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						}
					}
				}else{
					let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
					if (historyChatMsgs.length) {
						lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
					}
					
				}
				lastChatMsg && array.push(lastChatMsg)
			}

			for(let i = 0; i < newChatMsgKeys.length; i++){
				let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
				if(newChatMsgs.length){
					lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
					lastChatMsg.unReadCount = newChatMsgs.length;
					if(lastChatMsg.unReadCount > 99) {
						lastChatMsg.unReadCount = "99+";
					}
					let dateArr = lastChatMsg.time.split(' ')[0].split('-')
					let timeArr = lastChatMsg.time.split(' ')[1].split(':')
					let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
					lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
					lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
					array.push(lastChatMsg)
				}
			}

			array.sort((a, b) => {
				return b.dateTimeNum - a.dateTimeNum
			})
			this.setData({
				arr: array
			})
		}
  },
  

    openSearch: function () {
      this.setData({
        search_btn: false,
        search_chats: true,
        gotop: true
      });
    },
    onSearch: function (val) {
      this.getChatList()
      let searchValue = val.detail.value;
      // let chartList = this.getChatList();
      let serchList = [];
      chartList.forEach((item, index) => {
        if (String(item.username).indexOf(searchValue) != -1) {
          serchList.push(item);
        }
      });
      // this.setData({
      //   arr: serchList
      // });
    },
    cancel: function () {
      this.getChatList()
      this.setData({
        search_btn: true,
        search_chats: false,
        // arr: this.getChatList(),
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
      uni.redirectTo({
        url: "../main/main?myName=" + uni.getStorageSync("myUsername")
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
      uni.redirectTo({
        url: "../setting/setting"
      });
    },
    tab_notification: function () {
      uni.redirectTo({
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
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.username
      };
      uni.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
      });
    },
    //	群聊 和 聊天室 （两个概念）
    into_groupChatRoom: function (detail) {
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.groupName,
        groupId: detail.info.to
      };
      uni.navigateTo({
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

      var myName = uni.getStorageSync("myUsername");
      var currentPage = getCurrentPages();
      uni.showModal({
        title: "删除该聊天记录",
        confirmText: "删除",
        success: function (res) {
          if (res.confirm) {
            uni.setStorageSync(nameList.your + myName, "");
            uni.setStorageSync("rendered_" + nameList.your + myName, "");
            
            if (currentPage[0]) {
              console.log('currentPage[0]>>',currentPage[0]);
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