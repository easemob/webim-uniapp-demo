<template>
  <view>
    <view>
      <view class="search" v-if="search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>

    <!-- <view class="chat_list_wraper" > -->
    <scroll-view scroll-y="true" :class="
      'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
    " :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')">
      <view class="search_input" v-if="search_chats">
        <view>
          <icon type="search" size="12"></icon>
          <input placeholder="搜索" placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;" auto-focus
            confirm-type="search" type="text" @confirm="onSearch" @input="onInput" v-model="input_code" />
          <icon type="clear" size="12" @tap.stop="clearInput" v-if="show_clear"></icon>
        </view>
        <text @tap="cancel">取消</text>
      </view>
      <view v-for="(item, index) in conversationList" :key="index" class="chat_list" :data-item="item" @tap.stop="del_chat"
        @longpress="longpress">
        <swipe-delete>
          <!-- 通知模块 -->
          <view class="tap_mask" @tap.stop="into_inform" :data-item="item" v-if="item.chatType == 'INFORM'">
            <view class="list_box">
              <view class="list_left">
                <view class="list_pic">
                  <view v-if="unReadTotalNotNum > 0" class="em-unread-spot2">{{
                      unReadTotalNotNum
                  }}</view>
                  <image :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''" src="../../static/images/inform.png"></image>
                </view>
                <view class="list_text">
                  <text class="list_user"> 系统通知 </text>
                  <text class="list_word" v-if="item.chatType == 'INFORM'">申请通知来自：{{ item.info.from }}</text>
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{ handleTime(item) }}</text>
              </view>
            </view>
          </view>

          <view class="tap_mask" @tap.stop="into_chatRoom" :data-item="JSON.stringify(item)" v-else>
            <!-- 消息列表 -->
            <view class="list_box">
              <view class="list_left" :data-username="item.username">
                <view class="list_pic">
                  <view class="em-msgNum" v-if="item.unReadCount > 0  && !pushConfigData.includes(item.chatType === 'chat' ? item.username : item.info.to)">
                  {{ item.unReadCount > 99 ? '99+':item.unReadCount}}</view>

                  <image :src="showConversationAvatar(item)"></image>
                  <!-- <image :src="
                    item.chatType == 'groupchat' ||
                      item.chatType == 'chatRoom'
                      ? '../../static/images/groupTheme.png'
                      : '../../static/images/theme2x.png'
                  "></image> -->
                </view>
                <view class="list_text">
                  <text class="list_user">{{ showConversationName(item) }}</text>
                  <text class="list_word" v-if="item.msg.data[0].data">{{
                      item.msg.data[0].data
                  }}</text>
                  <text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>
                  <text class="list_word" v-if="item.msg.type == 'audio'">[语音]</text>
                  <text class="list_word" v-if="item.msg.type == 'file'">[附件]</text>
                  <text class="list_word" v-if="item.msg.type == 'video'"
                    >[视频]</text
                  >
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{ handleTime(item) }}</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>

      <long-press-modal :winSize="winSize" :popButton="popButton" @change="pickerMenuChange" :showPop="showPop"
        @hidePop="hidePop" :popStyle="popStyle" />
      <view v-if="conversationList && conversationList.length == 0" class="chat_noChat">
        <image class="ctbg" src="/static/images/ctbg.png"></image>
        暂无聊天消息
      </view>
      <!-- </view> -->
    </scroll-view>
    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <view class="mask" @tap="close_mask" v-if="show_mask"></view>

    <view :class="isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar">
        <view v-if="unReadSpotNum > 0 || unReadSpotNum == '99+'" :class="
          'em-unread-spot ' +
          (unReadSpotNum == '99+' ? 'em-unread-spot-litleFont' : '')
        ">{{ unReadSpotNum == '99+' ? unReadSpotNum : unReadSpotNum + unReadTotalNotNum }}</view>
        <image :class="unReadSpotNum > 0 || unReadSpotNum == '99+' ? 'haveSpot' : ''"
          src="/static/images/sessionhighlight2x.png"></image>
        <text class="activeText">消息</text>
      </view>

      <view class="tableBar" @tap="tab_contacts">
        <image src="/static/images/comtacts2x.png"></image>
        <text>联系人</text>
      </view>

      <!-- <view class="tableBar" @tap="tab_notification">
        <view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{
          unReadTotalNotNum
        }}</view>
        <image
          :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''"
          src="/static/images/notice.png"
        ></image>
        <text>通知</text>
      </view> -->

      <view class="tableBar" @tap="tab_setting">
        <image src="/static/images/setting2x.png"></image>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script>
let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let isfirstTime = true;
import swipeDelete from "../../components/swipedelete/swipedelete";
import longPressModal from "../../components/longPressModal/index";
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
      conversationList: [],
      show_clear: false,
      member: "",
      isIPX: false,
      gotop: false,
      input_code: "",
      groupName: {},
      winSize: {},
      popButton: ["删除该聊天"],
      showPop: false,
      popStyle: "",
      currentVal: '',
      pushConfigData: [],
      defaultAvatar: "/static/images/theme2x.png",
      defaultGroupAvatar: "/static/images/groupTheme.png"
    };
  },

  components: {
    swipeDelete,
    longPressModal,
  },
  props: {},

  onLoad() {
    this.getWindowSize();
    //监听加好友申请
    disp.on("em.subscribe", this.onChatPageSubscribe);
    //监听解散群
    disp.on("em.invite.deleteGroup", this.onChatPageDeleteGroup);
    //监听未读消息数
    disp.on("em.unreadspot", this.onChatPageUnreadspot);
    //监听未读加群“通知”
    disp.on("em.invite.joingroup", this.onChatPageJoingroup);
    //监听好友删除
    disp.on("em.contacts.remove", this.onChatPageRemoveContacts);
    //监听好友关系解除
    disp.on("em.unsubscribed",this.onChatPageUnsubscribed)
    if(!uni.getStorageSync('listGroup')){
        this.listGroups()
    }
    if(!uni.getStorageSync('member')){
        this.getRoster()
    }
    this.readJoinedGroupName()
  },

  onShow: function () {
    uni.hideHomeButton && uni.hideHomeButton();
    setTimeout(()=>{
		this.getLocalConversationlist();
	},100)
    this.setData({
      unReadSpotNum:
        getApp().globalData.unReadMessageNum > 99
          ? "99+"
          : getApp().globalData.unReadMessageNum,
      messageNum: getApp().globalData.saveFriendList.length,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum:
        getApp().globalData.saveFriendList.length +
        getApp().globalData.saveGroupInvitedList.length,
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
  },
  onUnload() {
    //页面卸载同步取消onload中的订阅，防止重复订阅事件。
    disp.off('em.subscribe',this.onChatPageSubscribe)
    disp.off("em.invite.deleteGroup",this.onChatPageDeleteGroup)
    disp.off("em.unreadspot",this.onChatPageUnreadspot)
    disp.off("em.invite.joingroup",this.onChatPageJoingroup)
    disp.off("em.contacts.remove",this.onChatPageRemoveContacts)
    disp.off("em.unsubscribed",this.onChatPageUnsubscribed)
  },
  computed: {
     //会话头像展示
    showConversationAvatar() {
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      return (item)=>{
        if(item.chatType === 'singleChat' || item.chatType === 'chat'){
            if(friendUserInfoMap.has(item.username) && friendUserInfoMap.get(item.username)?.avatarurl){
                return friendUserInfoMap.get(item.username).avatarurl
            }else{
                return this.defaultAvatar
            }
        }else if(item.chatType === 'groupchat' || item.chatType === 'chatRoom'){
            return this.defaultGroupAvatar
        }
      }
    },
    //会话name展示
    showConversationName() {
        const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
        return (item)=>{
            if(item.chatType ==='singleChat' || item.chatType === 'chat'){
                if(friendUserInfoMap.has(item.username) && friendUserInfoMap.get(item.username)?.nickname){
                    return friendUserInfoMap.get(item.username).nickname
                }else{
                    return item.username
                }
            }else if(item.chatType === 'groupchat' || item.chatType === 'chatRoom'){
                return item.groupName
            }
        }
    },
    //处理时间显示
    handleTime() {
        return (item) => {
            return this.$u.timeFormat(item.time, 'mm/dd/hh:MM')
        }
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
            data: res.data,
          });
          me.readJoinedGroupName()
          me.getLocalConversationlist();
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
    getRoster() {
      let me = this;
      let rosters = {
        success(roster) {
			console.log('roster', roster)
          var member = [];
          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }
          uni.setStorage({
            key: "member",
            data: member,
          });
          me.setData({ member: member });
          //if(!systemReady){
          disp.fire("em.main.ready");
          //systemReady = true;
          //}
          me.getLocalConversationlist()
          me.setData({
            unReadSpotNum:
              getApp().globalData.unReadMessageNum > 99
                ? "99+"
                : getApp().globalData.unReadMessageNum,
          });
        },
        error(err) {
          console.log(err);
        },
      };
      WebIM.conn.getContacts(rosters);
    },
    readJoinedGroupName (){
        const joinedGroupList = uni.getStorageSync('listGroup')
        const groupList = joinedGroupList?.data || joinedGroupList || []
        let groupName = {};
        groupList.forEach((item) => {
            groupName[item.groupid] = item.groupname;
        });
        this.setData({
            groupName: groupName,
        });
    },
    // 不包含陌生人版本
    // getLocalConversationlist() {
    //   var conversationList = [];
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
    //       conversationList.push(lastChatMsg);
    //     }
    //   }
    //   for(let i = 0; i < listGroups.length; i++){
    //     let newChatMsgs = uni.getStorageSync(listGroups[i].groupid + myName) || [];
    //     let historyChatMsgs = uni.getStorageSync("rendered_" + listGroups[i].groupid + myName) || [];
    //     let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
    //     if(curChatMsgs.length){
    //     let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
    //     lastChatMsg.unReadCount = newChatMsgs.length;
    //     lastChatMsg.groupName = listGroups[i].groupname
    //     conversationList.push(lastChatMsg);
    //     }
    //   }
    //   conversationList.sort((a, b) => {
    //     return b.time - a.time;
    //   });
    //   this.setData({
    //         conversationList: conversationList,
    //   });
    // },
    // 包含陌生人版本
    getLocalConversationlist() {
      const myName = uni.getStorageSync("myUsername");
      const me = this;
      uni.getStorageInfo({
        success: function (res) {
          let storageKeys = res.keys;
          let newChatMsgKeys = [];
          let historyChatMsgKeys = [];
          let len = myName.length;
          storageKeys.forEach((item) => {
            if (item.slice(-len) == myName && item.indexOf("rendered_") == -1) {
              newChatMsgKeys.push(item);
            } else if (
              item.slice(-len) == myName &&
              item.indexOf("rendered_") > -1
            ) {
              historyChatMsgKeys.push(item);
            } else if (item === "INFORM") {
              newChatMsgKeys.push(item);
            }
          });
          me.packageConversation(newChatMsgKeys, historyChatMsgKeys);
        },
      });
    },
    //组件会话列表方法
    packageConversation(newChatMsgKeys, historyChatMsgKeys) {
        const me = this;
        const myName = uni.getStorageSync("myUsername");
        let conversationList = [];
        let lastChatMsg; //最后一条消息
        for (let i = historyChatMsgKeys.length; i > 0, i--;) {
            let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9));
            if (index > -1) {
                let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
                if (newChatMsgs.length) {
                    lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
                    lastChatMsg.unReadCount = newChatMsgs.length;
                    newChatMsgKeys.splice(index, 1);
                } else {
                    let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
                    if (historyChatMsgs.length) {
                        lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
                    }
                }
            } else {
                let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
                if (historyChatMsgs.length) {
                    lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
                }
            }
            if (
                lastChatMsg &&
                (lastChatMsg.chatType == "groupchat" ||
                    lastChatMsg.chatType == "chatRoom")
            ) {
                lastChatMsg.groupName = me.groupName[lastChatMsg.info.to];
            }
            lastChatMsg && lastChatMsg.username != myName &&
                conversationList.push(lastChatMsg);
        }
        for (let i = newChatMsgKeys.length; i > 0, i--;) {
            let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
            if (newChatMsgs.length) {
                lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
                lastChatMsg.unReadCount = newChatMsgs.length;
                if (
                    lastChatMsg.chatType == "groupchat" ||
                    lastChatMsg.chatType == "chatRoom"
                ) {
                    lastChatMsg.groupName = me.groupName[lastChatMsg.info.to];
                }
                lastChatMsg.username != myName && conversationList.push(lastChatMsg);
            }
        }
        conversationList.sort((a, b) => {
            return b.time - a.time;
        });
        this.setData({
            conversationList: conversationList,
        });
    },
    openSearch: function () {
      this.setData({
        search_btn: false,
        search_chats: true,
        gotop: true,
      });
    },

    onSearch: function (val) {
      let searchValue = val.detail.value;
      var myName = uni.getStorageSync("myUsername");
      const me = this;
      let serchList = [];
      let conversationList = [];
      uni.getStorageInfo({
        success: function (res) {
          let storageKeys = res.keys;
          let chatKeys = [];
          let len = myName.length;
          storageKeys.forEach((item) => {
            if (item.slice(-len) == myName) {
              chatKeys.push(item);
            }
          });
          chatKeys.forEach((item, index) => {
            if (item.indexOf(searchValue) != -1) {
              serchList.push(item);
            }
          });
          let lastChatMsg = "";
          serchList.forEach((item, index) => {
            let chatMsgs = uni.getStorageSync(item) || [];
            if (chatMsgs.length) {
              lastChatMsg = chatMsgs[chatMsgs.length - 1];
              conversationList.push(lastChatMsg);
            }
          });
          me.setData({ conversationList:conversationList });
        },
      });
    },

    cancel: function () {
      this.getLocalConversationlist();
      this.setData({
        search_btn: true,
        search_chats: false,     
        unReadSpotNum:
          getApp().globalData.unReadMessageNum > 99
            ? "99+"
            : getApp().globalData.unReadMessageNum,
        gotop: false,
      });
    },
    clearInput: function () {
      this.setData({
        input_code: "",
        show_clear: false,
      });
    },
    onInput: function (e) {
      let inputValue = e.detail.value;
      if (inputValue) {
        this.setData({
          show_clear: true,
        });
      } else {
        this.setData({
          show_clear: false,
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
        search_btn: true,
        search_chats: false,
        show_mask: false,
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
      let detail = JSON.parse(event.currentTarget.dataset.item);
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
    // 单聊
    into_singleChatRoom: function (detail) {
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.username,
      };
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      if(friendUserInfoMap.has(nameList.your) && friendUserInfoMap.get(nameList.your)?.nickname){
        nameList.yourNickName = friendUserInfoMap.get(nameList.your).nickname;
      }
      uni.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList),
      });
    },
    // 群聊 和 聊天室 （两个概念）
    into_groupChatRoom: function (detail) {
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.groupName,
        groupId: detail.info.to,
      };
      uni.navigateTo({
        url:
          "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList),
      });
    },

    into_inform: function () {
      uni.redirectTo({
        url: "../notification/notification",
      });
    },

    removeAndRefresh: function (event) {
      let removeId = event.currentTarget.dataset.item.info.from
      let ary = getApp().globalData.saveFriendList
      let idx
      if (ary.length > 0) {
        ary.forEach((v, k) => {
          if (v.from == removeId) {
            idx = k
          }
        })
        getApp().globalData.saveFriendList.splice(idx, 1);
      }
      uni.removeStorageSync('INFORM')
    },

    del_chat: function (event) {
      let detail = event.currentTarget.dataset.item;
      let nameList = {};
      let me = this;
      // 删除当前选中群组聊天列表
      if (detail.chatType == "groupchat" || detail.chatType == "chatRoom") {
        nameList = {
          your: detail.info.to,
        };
        //删除当前选中通知列表
      } else if (detail.chatType === "INFORM") {
        nameList = {
          your: "INFORM",
        };
      }
      //删除当前选中好友聊天列表
      else {
        nameList = {
          your: detail.username,
        };
      }
      var myName = uni.getStorageSync("myUsername");
      var currentPage = getCurrentPages();

      uni.showModal({
        title: "确认删除？",
        confirmText: "删除",
        success: function (res) {
          if (res.confirm) {
            uni.removeStorageSync(nameList.your + myName);
            uni.removeStorageSync("rendered_" + nameList.your + myName);
            nameList.your === 'INFORM' && me.removeAndRefresh(event);
            // if (Object.keys(currentPage[0]).length>0) {
            //   currentPage[0].onShow();
            // }
            disp.fire("em.chat.session.remove");
            me.getLocalConversationlist();
          }
        },
        fail: function (err) {
          console.log('删除列表', err);
        },
      });
    },
    removeLocalStorage: function (yourname) {
      var myName = uni.getStorageSync("myUsername");
      uni.removeStorageSync(yourname + myName);
      uni.removeStorageSync("rendered_" + yourname + myName);
    },
    longpress: function (e) {
      //将当前选中的值存在data中方便后续操作
      this.currentVal = e
      let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index,];

      /* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
      if (touches.clientY > this.winSize.height / 2) {
        style = `bottom:${this.winSize.height - touches.clientY}px;`;
      } else {
        style = `top:${touches.clientY}px;`;
      }
      if (touches.clientX > this.winSize.witdh / 2) {
        style += `right:${this.winSize.witdh - touches.clientX}px`;
      } else {
        style += `left:${touches.clientX}px`;
      }

      this.popStyle = style;
      // this.pickerUserIndex = Number(index);
      this.showShade = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.showPop = true;
        }, 10);
      });
    },
    /* 获取窗口尺寸 */
    getWindowSize() {
      uni.getSystemInfo({
        success: (res) => {
          this.winSize = {
            witdh: res.windowWidth,
            height: res.windowHeight,
          };
        },
      });
    },
    hidePop() {
      this.showPop = false;
    },
    pickerMenuChange() {
      this.del_chat(this.currentVal)
    },
    /*  disp event callback function */
    onChatPageSubscribe() {
      this.getLocalConversationlist();
      this.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
    },
    onChatPageDeleteGroup(infos) {
      this.listGroups();
      this.getRoster();
      this.getLocalConversationlist();
      this.setData({
        messageNum: getApp().globalData.saveFriendList.length,
      });
      //如果会话存在则执行删除会话
      this.removeLocalStorage(infos.gid)
    },
    onChatPageUnreadspot(message) {
      this.getLocalConversationlist();
      let currentLoginUser = WebIM.conn.context.userId;
      let id = message && message.chatType === 'groupchat' ? message?.to : message?.from;
      let pushObj = uni.getStorageSync("pushStorageData");
      let pushAry = pushObj[currentLoginUser] || []
      this.setData({
        pushConfigData:pushAry,
        });
      // if (message && pushValue.includes(id)) return
      this.setData({
        unReadSpotNum:
          getApp().globalData.unReadMessageNum > 99
            ? "99+"
            : getApp().globalData.unReadMessageNum,
      });
    },
    onChatPageJoingroup() {
      this.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
      this.getLocalConversationlist();
    },
    onChatPageRemoveContacts() {
      this.getLocalConversationlist();
      this.getRoster();
    },
    onChatPageUnsubscribed(message){
        uni.showToast(
            {
             title: `与${message.from}好友关系解除`,
             icon: "none",
			}
        );
    }
  },
};
</script>
<style>
@import "./chat.css";
</style>
