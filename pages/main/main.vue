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

    <view class="main_body">
      <view>
        <!-- 左侧列表内容部分 -->
        <scroll-view
          :class="
            'content ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
          "
          enable-back-to-top
          :scroll-into-view="toView"
          scroll-y="true"
          scroll-with-animation="true"
          :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')"
        >
          <!-- search -->

          <view class="search_input" v-if="search_friend">
            <view>
              <icon type="search" size="13"></icon>
              <input
                placeholder="搜索"
                placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
                auto-focus
                confirm-type="search"
                type="text"
                @confirm="onSearch"
                @input="onInput"
                v-model="input_code"
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
          <view class="contain">
            <view class="otherItem" @tap="add_new">
              <image
                src="/static/images/invite_theme2x.png"
                data-username="name"
              ></image>
              <text>添加好友</text>
            </view>
            <view class="otherItem" @tap="into_groups">
              <image src="/static/images/groupTheme.png"></image>
              <text>群组</text>
            </view>
          </view>

          <view
            v-for="(group, id) in listMain"
            :key="id"
            :id="'inToView' + group.id"
            :data-id="group.id"
          >
            <view class="address_top">{{ group.region }}</view>
            <view
              v-for="(item, brandId) in group.brands"
              :key="brandId"
              :data-username="item.name"
              @tap.stop="delete_friend"
            >
              <swipe-delete>
                <view
                  class="tap_mask"
                  @tap.stop="into_room"
                  :data-username="item.name"
                >
                  <view
                    class="address_bottom"
                    :data-username="item.name"
                    @tap.stop="into_room"
                  >
                    <image
                      :src="showFriendAvatar(item.name) "
                      @tap.stop="into_room"
                      :data-username="item.name"
                    ></image>
                    <text @tap.stop="into_room" :data-username="item.name">{{
                        showFriendNickname(item.name)
                    }}</text>
                  </view>
                </view>
              </swipe-delete>
            </view>
          </view>
        </scroll-view>
        <!-- 右侧字母导航 -->
        <view class="orientation_region">
          <block v-for="(item, id) in listMain" :key="id">
            <view
              :class="
                'orientation_city ' + (isActive == item.id ? 'active' : '')
              "
              @tap="scrollToViewFn"
              :data-id="item.id"
              >{{ item.region }}</view
            >
          </block>
        </view>
      </view>
    </view>

    <view :class="isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar" @tap="tab_chat">
        <view
          v-if="unReadSpotNum > 0 || unReadSpotNum == '99+'"
          :class="
            'em-unread-spot ' +
            (unReadSpotNum == '99+' ? 'em-unread-spot-litleFont' : '')
          "
          >{{ unReadSpotNum == '99+'?unReadSpotNum:unReadSpotNum+ unReadTotalNotNum }}</view
        >
        <image
          :class="unReadSpotNum > 0 || unReadSpotNum == '99+' ? 'haveSpot' : ''"
          src="/static/images/session2x.png"
        ></image>
        <text>消息</text>
      </view>

      <view class="tableBar">
        <image src="/static/images/comtactshighlight2x.png"></image>
        <text class="activeText">联系人</text>
      </view>

      <!-- <view class="tableBar" @tap="tab_notification">
		<view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{ unReadTotalNotNum }}</view>
		<image :class="unReadTotalNotNum > 0 ? 'haveSpot': ''" src="/static/images/notice.png"></image>
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
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
let systemReady = false;
let canPullDownreffesh = true;
let oHeight = [];
import swipeDelete from "../../components/swipedelete/swipedelete";
export default {
  data() {
    return {
      search_btn: true,
      search_friend: false,
      show_mask: false,
      myName: "",
      member: [],
      messageNum: "",
      //加好友申请数
      unReadSpotNum: 0,
      //未读消息数
      unReadNoticeNum: 0,
      //加群通知数
      unReadTotalNotNum: 0,
      //总通知数：加好友申请数 + 加群通知数
      isActive: null,
      listMain: [],
      listTitles: [],
      toView: "inToView0",
      oHeight: [],
      scroolHeight: 0,
      show_clear: false,
      isHideLoadMore: true,
      isIPX: false,
      gotop: false,
      input_code: "",
      showFixedTitile: false,
      defaultAvatar: "/static/images/theme2x.png",
    };
  },
  components: {
    swipeDelete,
  },
  onLoad(option) {
    const app = getApp().globalData;
    //监听加好友申请
    disp.on("em.subscribe", this.onMainPageSubscribe);
    //监听联系人移除事件（主要为好友以及群组）
    disp.on("em.contacts.remove", this.onMainPageRemoveContacts); //监听未读“聊天”
    //监听未读总数更新
    disp.on("em.unreadspot", this.onMainPageUnreadspot); 
    //监听未读加群“通知”数
    disp.on("em.invite.joingroup", this.onMainPageJoingroup);
    //监听好友订阅成功
    disp.on("em.subscribed", this.onMainPagesubscribed);
    // 监听被解除好友
    disp.on("em.unsubscribed",this.onMainPageUnsubscribed );
    this.setData({
      myName: option.myName,
    });
  },
  mounted() {
    this.getRoster();
  },
  onShow() {
    uni.hideHomeButton()
    this.setData({
      messageNum: getApp().globalData.saveFriendList.length,
      unReadSpotNum:
        getApp().globalData.unReadMessageNum > 99
          ? "99+"
          : getApp().globalData.unReadMessageNum,
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
  onUnload(){
    disp.off("em.subscribe",this.onMainPageSubscribe)
    disp.off("em.contacts.remove",this.onMainPageRemoveContacts)
    disp.off("em.unreadspot",this.onMainPageUnreadspot)
    disp.off("em.invite.joingroup",this.onMainPageJoingroup)
    disp.off("em.subscribed",this.onMainPagesubscribed)
    disp.off("em.unsubscribed",this.onMainPageUnsubscribed)
  },
  computed: {
    //好友头像展示
    showFriendAvatar() {
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      return (hxId)=>{
        if(friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.avatarurl){
            return friendUserInfoMap.get(hxId).avatarurl;
        }else{
            return this.defaultAvatar;
        }
      }
    },
    //好友昵称展示
    showFriendNickname() {
        const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
        return (hxId)=>{
        if(friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.nickname){
            return friendUserInfoMap.get(hxId).nickname;
        }else{
            return hxId;
        }
      }
    }
  },
  methods: {
    getRoster() {
      let me = this;
      let rosters = {
        success(roster) {
          let member = [];

          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }

          uni.setStorage({
            key: "member",
            data: member,
          });
          me.setData({
            member: member,
          });

          if (!systemReady) {
            disp.fire("em.main.ready");
            systemReady = true;
          }

          me.getBrands(member);
        },

        error(err) {
          console.log("[main:getRoster]", err);
        },
      };

      WebIM.conn.getContacts(rosters);
    },
    moveFriend: function (message) {
      let me = this;
      let rosters = {
        success: function (roster) {
          let member = [];

          for (let i = 0; i < roster.length; i++) {
            if (roster[i].subscription == "both") {
              member.push(roster[i]);
            }
          }

          me.setData({
            member: member,
          });
        },
      };

      if (message.type == "unsubscribe" || message.type == "unsubscribed") {
        WebIM.conn.deleteContact(
          message.from,
        );
        WebIM.conn.getContacts(rosters);
      }
    },
    handleFriendMsg: function (message) {
      uni.showModal({
        title: "添加好友请求",
        content: message.from + "请求加为好友",
        success: function (res) {
          if (res.confirm == true) {
            // WebIM.conn.subscribed({
            //   to: message.from,
            //   message: "[resp:true]",
            // });
            WebIM.conn.acceptContactInvite({
              to: message.from,
              message: "[resp:true]",
            });
          } else {
            WebIM.conn.declineContactInvite({
              to: message.from,
              message: "rejectAddFriend",
            });
          }
        },
        fail: function (err) {},
      });
    },
    delete_friend: function (event) {
      const me = this;
      var delName = event.currentTarget.dataset.username;
      var myName = uni.getStorageSync("myUsername"); // 获取当前用户名

      uni.showModal({
        title: "确认删除好友" + delName,
        cancelText: "取消",
        confirmText: "删除",

        success(res) {
          if (res.confirm == true) {
            WebIM.conn.deleteContact(
              delName,
            );
            uni.showToast({
              title: "删除成功",
            });
            // 删除好友后 执行删除本地有关存储并更新好友列表
            me.removeStoreages(delName)
          }
        },
      });
    },
    removeStoreages:function(targetId){
      if(!targetId) return;
      const myName = uni.getStorageSync("myUsername");
      uni.removeStorageSync(targetId + myName);
      uni.removeStorageSync("rendered_" + targetId + myName);
      //发布删除好友事件 订阅删除事件的接口会重新拉取好友列表
      disp.fire("em.contacts.remove");
      disp.fire("em.main.deleteFriend");
    },
    openSearch: function () {
      this.setData({
        search_btn: false,
        search_friend: true,
        show_mask: true,
        gotop: true,
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
    cancel: function () {
      this.setData({
        search_btn: true,
        search_friend: false,
        gotop: false, //show_mask: false
      });
      this.getBrands(this.member);
    },
    onSearch: function (val) {
      let searchValue = val.detail.value;
      let member = this.member;
      let serchList = [];
      member.forEach((item, index) => {
        if (String(item.name).indexOf(searchValue) != -1) {
          serchList.push(item);
        }
      });
      this.getBrands(serchList);
    },
    add_new: function () {
      uni.navigateTo({
        url: "../add_new/add_new",
      });
    },
    tab_chat: function () {
      uni.redirectTo({
        url: "../conversation/conversation",
      });
    },
    close_mask: function () {
      this.setData({
        search_btn: true,
        search_friend: false, //show_mask: false
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
    into_inform: function () {
      uni.navigateTo({
        url: "../inform/inform?myName=" + this.myName, //uni.getStorageSync("myUsername")
      });
    },
    into_groups: function () {
      uni.navigateTo({
        url: "../groups/groups?myName=" + this.myName,
      });
    },
    into_room: function (event) {
      var nameList = {
        myName: this.myName,
        your: event.target.dataset.username,
      };
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      if(friendUserInfoMap.has(nameList.your) && friendUserInfoMap.get(nameList.your)?.nickname){
        nameList.yourNickName = friendUserInfoMap.get(nameList.your).nickname;
      }
      uni.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList),
      });
    },
    into_info: function (event) {
      uni.navigateTo({
        url:
          "../friend_info/friend_info?yourname=" +
          event.target.dataset.username,
      });
    },
    //点击右侧字母导航定位触发
    scrollToViewFn: function (e) {
      let that = this;
      let _id = e.target.dataset.id;

      for (let i = 0; i < that.listMain.length; ++i) {
        if (that.listMain[i].id === _id) {
          that.setData({
            isActive: _id,
            toView: "inToView" + _id,
          });
          break;
        }
      }
    },

    // 处理数据格式，及获取分组高度
    getBrands: function (member) {
      const that = this;
      const reg = /[a-z]/i;

      member.forEach((item) => {
        if (reg.test(item.name.substring(0, 1))) {
          item.initial = item.name.substring(0, 1).toUpperCase();
        } else {
          item.initial = "#";
        }
      });
      member.sort((a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0));
      var someTtitle = null;
      var someArr = [];

      for (var i = 0; i < member.length; i++) {
        var newBrands = {
          brandId: member[i].jid,
          name: member[i].name,
        };

        if (member[i].initial == "#") {
          if (!lastObj) {
            var lastObj = {
              id: i,
              region: "#",
              brands: [],
            };
          }

          lastObj.brands.push(newBrands);
        } else {
          if (member[i].initial != someTtitle) {
            someTtitle = member[i].initial;
            var newObj = {
              id: i,
              region: someTtitle,
              brands: [],
            };
            someArr.push(newObj);
          }

          newObj.brands.push(newBrands);
        }
      }

      someArr.sort((a, b) => a.region.charCodeAt(0) - b.region.charCodeAt(0));

      if (lastObj) {
        someArr.push(lastObj);
      }
      //赋值给列表值
      that.setData({
        listMain: someArr,
      }); //赋值给当前高亮的isActive

      that.setData({
        isActive: someArr.length > 0 ? someArr[0].id : "",
      }); //计算分组高度,uni.createSelectotQuery()获取节点信息

      let number = 0;

      for (let j = 0; j < someArr.length; ++j) {
        const query = uni.createSelectorQuery().in(this);
        query
          .select(`#inToView${someArr[j].id}`)
          .boundingClientRect((rect) => {
            if (rect) {
              number = rect.height + number;
              var newArry = [
                {
                  height: number,
                  key: rect.dataset.id,
                  name: someArr[j].region,
                },
              ];
              oHeight = oHeight.concat(newArry);
            } else {
              this.$nextTick(() => {
                //this.getBrands(member)
              });
            }
          })
          .exec();
      }
    },
   /*  disp event callback function */
    onMainPageSubscribe() {
        this.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
    },
    onMainPageRemoveContacts(message) {
      const pageStack = getCurrentPages();
      if (pageStack[pageStack.length - 1].route === this.__route__) {
        this.getRoster();
      }
    },
    onMainPageUnreadspot() {
      this.setData({
        unReadSpotNum:
          getApp().globalData.unReadMessageNum > 99
            ? "99+"
            : getApp().globalData.unReadMessageNum,
      });
    },
    onMainPageJoingroup() {
      this.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
    },
    onMainPagesubscribed() {
      const pageStack = getCurrentPages();
      if (pageStack[pageStack.length - 1].route === this.__route__) {
        this.getRoster();
      }
    },
    onMainPageUnsubscribed(message) {
      const pageStack = getCurrentPages();
      if (pageStack[pageStack.length - 1].route === this.__route__) {
        this.getRoster();
        uni.showToast(
            {
             title: `与${message.from}好友关系解除`,
             icon: "none",
			}
        );
      }
    }
  },
};
</script>
<style>
@import "./main.css";
</style>