<template>
  <view>
    <!-- 搜索会话列表相关 -->
    <view>
      <view class="search" v-if="search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
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
          @confirm="actionSearch"
          @input="onInput"
          v-model.trim="searchInputKeywords"
        />
        <icon
          type="clear"
          size="12"
          @tap.stop="clearInput"
          v-if="show_clear"
        ></icon>
      </view>
      <text @tap="cancelSearch">取消</text>
    </view>
    <!-- 会话列表展示相关 -->
    <scroll-view
      scroll-y="true"
      :class="
        'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
      "
      :style="'padding-bottom: 270rpx'"
    >
      <!-- 系统通知 -->
      <view class="tap_mask" v-if="lastInformData">
        <view class="list_box" @click="entryInform">
          <view class="list_left">
            <view class="list_pic">
              <view v-if="unReadNoticeNum > 0" class="em-msgNum">{{
                unReadNoticeNum
              }}</view>
              <image
                :class="unReadNoticeNum > 0 ? 'haveSpot' : ''"
                src="../../static/images/inform.png"
              ></image>
            </view>
            <view class="list_text">
              <text class="list_user"> 系统通知 </text>
              <text class="list_word">来自：{{ lastInformData.from }}</text>
            </view>
          </view>
          <view class="list_right">
            <text>{{ handleTime(lastInformData) }}</text>
          </view>
        </view>
      </view>
      <!-- 普通会话 -->
      <view
        v-for="(conversationItem, index) in search_chats
          ? searchResConversationList
          : conversationList"
        :key="conversationItem.conversationId + index"
        class="chat_list"
        @tap.stop="deleteConversationItem(conversationItem)"
      >
        <swipe-delete>
          <!-- 通知模块 -->
          <view
            class="tap_mask"
            @tap.stop="entryTabNotificationPage"
            :data-item="conversationItem"
            v-if="false"
          >
            <view class="list_box">
              <view class="list_left">
                <view class="list_pic">
                  <view v-if="unReadTotalNotNum > 0" class="em-unread-spot2">{{
                    unReadTotalNotNum
                  }}</view>
                  <image
                    :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''"
                    src="../../static/images/inform.png"
                  ></image>
                </view>
                <view class="list_text">
                  <text class="list_user"> 系统通知 </text>
                  <text class="list_word" v-if="item.chatType == 'INFORM'"
                    >申请通知来自：{{ item.info.from }}</text
                  >
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{
                  handleTime(item)
                }}</text>
              </view>
            </view>
          </view>

          <view
            class="tap_mask"
            @tap.stop="into_chatRoom"
            :data-item="JSON.stringify(conversationItem)"
            v-else
          >
            <!-- 消息列表 -->
            <view class="list_box">
              <view
                class="list_left"
                :data-username="conversationItem.conversationId"
              >
                <view class="list_pic">
                  <view
                    class="em-msgNum"
                    v-if="conversationItem.unReadCount > 0"
                  >
                    {{
                      conversationItem.unReadCount > 99
                        ? '99+'
                        : conversationItem.unReadCount
                    }}</view
                  >

                  <image
                    :src="showConversationAvatar(conversationItem)"
                  ></image>
                </view>
                <view class="list_text">
                  <text class="list_user">{{
                    showConversationName(conversationItem)
                  }}</text>
                  <text class="list_word" v-if="conversationItem.lastMessage">{{
                    handleLastMsgContent(conversationItem.lastMessage)
                  }}</text>
                </view>
              </view>
              <view class="list_right">
                <text :data-username="conversationItem.conversationId">{{
                  handleTime(conversationItem)
                }}</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>
      <view
        v-if="conversationList && conversationList.length == 0"
        class="chat_noChat"
      >
        <image class="ctbg" src="/static/images/ctbg.png"></image>
        暂无聊天消息
      </view>
      <!-- </view> -->
    </scroll-view>
    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <view class="mask" @tap="close_mask" v-if="show_mask"></view>
  </view>
</template>

<script>
import {
  MESSAGE_TYPE,
  SESSION_MESSAGE_TYPE,
  CUSTOM_TYPE,
  CHAT_TYPE,
} from '@/EaseIM/constant';
import swipeDelete from '../../components/swipedelete/swipedelete';
import longPressModal from '../../components/longPressModal/index';
import { emConversation } from '@/EaseIM/emApis';
const { sendChannelAck } = emConversation();
export default {
  data() {
    return {
      MESSAGE_TYPE,
      search_btn: true,
      search_chats: false,
      show_mask: false,
      searchResConversationList: [], //开启搜索时的会话列表
      show_clear: false,
      member: '',
      isIPX: false,
      gotop: false,
      searchInputKeywords: '',
      winSize: {},
      popButton: ['删除该聊天'],
      showPop: false,
      popStyle: '',
      currentVal: '',
      pushConfigData: [],
      defaultAvatar: '/static/images/theme2x.png',
      defaultGroupAvatar: '/static/images/groupTheme.png',
    };
  },

  components: {
    swipeDelete,
    longPressModal,
  },
  props: {},
  computed: {
    conversationList() {
      console.log('>>>>>>computed conversationlist');
      return this.$store.getters.sortedConversationList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
    //会话头像展示
    showConversationAvatar() {
      return (item) => {
        if (item.conversationType === CHAT_TYPE.SINGLE_CHAT) {
          if (
            this.friendUserInfoMap.has(item.conversationId) &&
            this.friendUserInfoMap.get(item.conversationId)?.avatarurl
          ) {
            return this.friendUserInfoMap.get(item.conversationId).avatarurl;
          } else {
            return this.defaultAvatar;
          }
        } else if (item.conversationType === CHAT_TYPE.GROUP_CHAT) {
          return this.defaultGroupAvatar;
        }
      };
    },
    //会话name展示
    showConversationName() {
      return (item) => {
        if (item.conversationType === CHAT_TYPE.SINGLE_CHAT) {
          if (
            this.friendUserInfoMap.has(item.conversationId) &&
            this.friendUserInfoMap.get(item.conversationId)?.nickname
          ) {
            return this.friendUserInfoMap.get(item.conversationId).nickname;
          } else {
            return item.conversationId;
          }
        } else if (item.conversationType === CHAT_TYPE.GROUP_CHAT) {
          return this.getGroupName(item.conversationId);
        }
      };
    },
    //处理时间显示
    handleTime() {
      return (item) => {
        return this.$u.timeFormat(item.time, 'mm/dd/hh:MM');
      };
    },
    //处理预览消息内容
    handleLastMsgContent() {
      return (msgBody) => {
        const { type, msg } = msgBody;
        let resultContent = '';
        //如果消息类型，在预设非展示文本类型中，就返回预设值
        if (SESSION_MESSAGE_TYPE[type]) {
          resultContent = SESSION_MESSAGE_TYPE[type];
        } else if (type === MESSAGE_TYPE.CUSTOM) {
          //如果为自定义类型消息就匹配自定义消息对应的lastmsg文本
          if (msgBody.customEvent) {
            (CUSTOM_TYPE[msgBody.customEvent] &&
              (resultContent = CUSTOM_TYPE[msgBody.customEvent])) ||
              '';
          }
        } else {
          resultContent = msg;
        }
        return resultContent;
      };
    },
    //系统通知
    lastInformData() {
      return this.$store.getters.getAllInformsList[
        this.$store.getters.getAllInformsList.length - 1
      ];
    },
    unReadNoticeNum() {
      return this.$store.getters.getAllInformsList.filter(
        (inform) => !inform.isHandled
      ).length;
    },
    //会话未读数
    allConversationUnReadNum() {
      return (
        this.unReadNoticeNum +
        this.$store.getters.calcAllUnReadNumFromConversation
      );
    },
  },
  created() {
    console.log('converstaion created');
    if (!this.conversationList.length) {
      this.$store.dispatch('fetchConversationList');
    }
    uni.hideHomeButton && uni.hideHomeButton();
  },
  methods: {
    //群组名称
    getGroupName(groupid) {
      const joinedGroupList = this.$store.state.GroupStore.joinedGroupList;
      let groupName = '';
      if (joinedGroupList.length) {
        joinedGroupList.forEach((item) => {
          if (item.groupid === groupid) {
            console.log(item.groupname);
            return (groupName = item.groupname);
          }
        });
        return groupName;
      } else {
        return groupid;
      }
    },
    //开启搜索模式
    openSearch: function () {
      this.search_btn = false;
      this.search_chats = true;
      this.gotop = true;
    },
    //取消搜索模式
    cancelSearch: function () {
      this.search_btn = true;
      this.search_chats = false;
      this.gotop = false;
    },
    //执行搜索并返回搜索结果
    actionSearch: function (val) {
      let keyWord = this.searchInputKeywords;
      let resConversationList = [];
      if (keyWord) {
        resConversationList = this.conversationList.filter(
          (conversatonItem) => {
            const { conversationId, conversationType, lastMessage } =
              conversatonItem;
            if (conversationType === CHAT_TYPE.SINGLE_CHAT) {
              if (
                this.friendUserInfoMap.has(conversatonItem.conversationId) &&
                this.friendUserInfoMap.get(conversationId)?.nickname
              ) {
                return (
                  lastMessage.msg?.indexOf(keyWord) > -1 ||
                  conversationId?.indexOf(keyWord) > -1 ||
                  this.friendUserInfoMap
                    .get(conversationId)
                    .nickname?.indexOf(keyWord) > -1
                );
              } else {
                return (
                  lastMessage?.msg?.indexOf(keyWord) > -1 ||
                  conversationId.indexOf(keyWord) > -1
                );
              }
            }
            if (conversationType === CHAT_TYPE.GROUP_CHAT) {
              return (
                conversationId.indexOf(keyWord) > -1 ||
                this.getGroupName(conversationId).indexOf(keyWord) > -1 ||
                lastMessage?.msg.indexOf(keyWord) > -1
              );
            }
          }
        );
      }
      console.log('>>>>>执行搜索', resConversationList);
      this.searchResConversationList = [...resConversationList];
    },

    clearInput: function () {
      this.searchInputKeywords = '';
      this.show_clear = false;
    },
    onInput: function () {
      if (this.searchInputKeywords) {
        this.show_clear = true;
      } else {
        this.show_clear = false;
      }
    },

    close_mask: function () {
      this.search_btn = true;
      this.search_chats = false;
      this.show_mask = false;
    },
    //进入系统通知页面
    entryInform() {
      uni.navigateTo({
        url: '../notification/notification',
      });
    },
    //进入聊天页面
    entryChatPage: async function (conversationItem) {
      const { conversationId, conversationType } = conversationItem;
      try {
        if (conversationItem.unReadCount > 0) {
          await sendChannelAck(conversationId, conversationType);
        }
      } catch (error) {}
    },
    //删除会话
    deleteConversationItem: function (conversationItem) {
      uni.showModal({
        title: '确认删除？',
        confirmText: '删除',
        success: async (res) => {
          if (res.confirm) {
            this.$store.dispatch('deleteConversation', { ...conversationItem });
          }
        },
        fail: function (err) {
          uni.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000,
          });
          console.log('删除失败', err);
        },
      });
    },
  },
};
</script>
<style>
@import './conversation.css';
</style>
