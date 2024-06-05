<template>
  <view class="conversation_container">
    <u-navbar :placeholder="true">
      <u-avatar
        size="32"
        slot="left"
        shape="square"
        :src="loginUserAvatar"
      ></u-avatar>
      <view slot="center">
        <image
          class="conversation_navbar_center"
          src="/static/images/new_ui/chat_logo.png"
        />
      </view>
    </u-navbar>
    <template v-if="pinConversationList.length || conversationList.length">
      <!-- 搜索会话列表相关 -->
      <view>
        <view class="search_container" v-if="isShowDefaultSearch">
          <view class="search_icon_box" @tap="openSearch">
            <u-icon
              size="22"
              name="/static/images/new_ui/search_icon.png"
            ></u-icon>
            <text class="search_text">搜索</text>
          </view>
        </view>
      </view>
      <view class="searching_container" v-if="!isShowDefaultSearch">
        <u-search
          class="searching_input"
          height="36"
          v-model.trim="searchInputKeywords"
          shape="square"
          placeholder="搜索"
          :actionText="'取消'"
          :actionStyle="{
            color: '#0873de',
          }"
          :clearabled="true"
          :focus="true"
          @search="actionSearch"
          @input="actionSearch"
          @custom="cancelSearch"
        ></u-search>
      </view>
      <!-- 展示搜索会话结果List -->
      <template v-if="!isShowDefaultSearch">
        <u-list
          v-if="searchResConversationList.length > 0"
          :height="conversationListHeight"
        >
          <u-list-item
            v-for="conversationItem in searchResConversationList"
            :key="conversationItem.conversationId"
          >
            <u-cell @click="entryChatPage(conversationItem)">
              <!-- 头像 -->
              <u-avatar
                slot="icon"
                shape="square"
                size="50"
                :src="showConversationAvatar(conversationItem)"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <!-- name -->
              <view class="conversation_item_title" slot="title">
                <u--text
                  class="conversation_item_title_text"
                  :lines="1"
                  :text="showConversationName(conversationItem)"
                  :suffixIcon="
                    conversationItemSilentStatus(
                      conversationItem.conversationId
                    )
                      ? '/static/images/new_ui/no_disturbing.png'
                      : ''
                  "
                  iconStyle="margin-left: 2px;"
                >
                </u--text>
              </view>
              <!-- lastmsg -->
              <u--text
                slot="label"
                :lines="1"
                :text="handleLastMsgContent(conversationItem.lastMessage)"
              ></u--text>
              <!-- time&unReadNum -->
              <view slot="value" class="conversation_item_right">
                <view>
                  <view class="conversation_item_time">{{
                    handleTime(conversationItem)
                  }}</view>
                  <view class="conversation_item_unread">
                    <u-badge
                      class="conversation_item_badge"
                      type="primary"
                      max="99"
                      :isDot="
                        (conversationItemSilentStatus(
                          conversationItem.conversationId
                        ) &&
                          conversationItem.unReadCount > 0) ||
                        conversationItem.isRead === false
                      "
                      :offset="[15, 0]"
                      :absolute="true"
                      :value="conversationItem.unReadCount"
                    ></u-badge>
                  </view>
                </view>
              </view>
            </u-cell>
          </u-list-item>
        </u-list>
        <u-empty v-if="searchResConversationList.length === 0" mode="search">
        </u-empty>
      </template>
      <!-- 会话列表展示相关 -->
      <template v-else>
        <u-list @scrolltolower="scrolltolower" :height="conversationListHeight">
          <!-- 系统通知 -->
          <!-- <u-list-item v-if="lastInformData">
            <u-cell title="系统通知" value="系统通知哈哈哈哈">
              <u-avatar
                slot="icon"
                shape="square"
                size="35"
                src="../../static/images/inform.png"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <text slot="value" class="u-slot-value">{{
                handleTime(lastInformData)
              }}</text>
            </u-cell>
          </u-list-item> -->
          <!-- 置顶会话列表 -->
          <template v-if="pinConversationList.length">
            <u-list-item
              v-for="(conversationItem, index) in pinConversationList"
              :key="conversationItem.conversationId"
            >
              <view
                class="pinconversation_item"
                @longpress="onConversationMoreFunction(conversationItem)"
                @click="entryChatPage(conversationItem)"
              >
                <u-cell>
                  <!-- 头像 -->
                  <u-avatar
                    slot="icon"
                    shape="square"
                    size="50"
                    :src="showConversationAvatar(conversationItem)"
                    customStyle="margin: -3px 5px -3px 0"
                  ></u-avatar>
                  <!-- name -->
                  <view class="conversation_item_title" slot="title">
                    <u--text
                      class="conversation_item_title_text"
                      :lines="1"
                      :text="showConversationName(conversationItem)"
                      :suffixIcon="
                        conversationItemSilentStatus(
                          conversationItem.conversationId
                        )
                          ? '/static/images/new_ui/no_disturbing.png'
                          : ''
                      "
                      iconStyle="margin-left: 2px;"
                    >
                    </u--text>
                  </view>
                  <!-- lastmsg -->
                  <u--text
                    slot="label"
                    :lines="1"
                    :text="handleLastMsgContent(conversationItem.lastMessage)"
                  ></u--text>
                  <!-- time&unReadNum -->
                  <view slot="value" class="conversation_item_right">
                    <view>
                      <view class="conversation_item_time">{{
                        handleTime(conversationItem)
                      }}</view>
                      <view class="conversation_item_unread">
                        <u-badge
                          class="conversation_item_badge"
                          type="primary"
                          max="99"
                          :isDot="
                            (conversationItemSilentStatus(
                              conversationItem.conversationId
                            ) &&
                              conversationItem.unReadCount > 0) ||
                            conversationItem.isRead === false
                          "
                          :offset="[15, 0]"
                          :absolute="true"
                          :value="conversationItem.unReadCount"
                        ></u-badge>
                      </view>
                    </view>
                  </view>
                </u-cell>
              </view>
            </u-list-item>
          </template>

          <!-- 普通会话列表 -->
          <u-list-item
            class="conversation_item"
            v-for="(conversationItem, index) in conversationList"
            :key="conversationItem.conversationId"
          >
            <template>
              <swipe-delete @deleteChatItem="handleDelete(conversationItem)">
                <view
                  @longpress="onConversationMoreFunction(conversationItem)"
                  @click="entryChatPage(conversationItem)"
                >
                  <u-cell>
                    <!-- 头像 -->
                    <u-avatar
                      slot="icon"
                      shape="square"
                      size="50"
                      :src="showConversationAvatar(conversationItem)"
                      customStyle="margin: -3px 5px -3px 0"
                    ></u-avatar>
                    <!-- name -->
                    <view class="conversation_item_title" slot="title">
                      <u--text
                        class="conversation_item_title_text"
                        :lines="1"
                        :text="showConversationName(conversationItem)"
                        :suffixIcon="
                          conversationItemSilentStatus(
                            conversationItem.conversationId
                          )
                            ? '/static/images/new_ui/no_disturbing.png'
                            : ''
                        "
                        iconStyle="margin-left: 2px;"
                      >
                      </u--text>
                    </view>
                    <!-- lastmsg -->
                    <u--text
                      slot="label"
                      :lines="1"
                      :text="handleLastMsgContent(conversationItem.lastMessage)"
                    ></u--text>
                    <!-- time&unReadNum -->
                    <view slot="value" class="conversation_item_right">
                      <view>
                        <view class="conversation_item_time">{{
                          handleTime(conversationItem)
                        }}</view>
                        <view class="conversation_item_unread">
                          <u-badge
                            class="conversation_item_badge"
                            type="primary"
                            max="99"
                            :isDot="
                              (conversationItemSilentStatus(
                                conversationItem.conversationId
                              ) &&
                                conversationItem.unReadCount > 0) ||
                              conversationItem.isRead === false
                            "
                            :offset="[15, 0]"
                            :absolute="true"
                            :value="conversationItem.unReadCount"
                          ></u-badge>
                        </view>
                      </view>
                    </view>
                  </u-cell>
                </view>
              </swipe-delete>
            </template>
          </u-list-item>
        </u-list>
        <u-action-sheet
          :actions="moreFunctionList"
          :closeOnClickOverlay="true"
          :closeOnClickAction="true"
          :safeAreaInsetBottom="true"
          :show="isShowMoreFunction"
          round="5"
          @select="onSelectClick"
          @close="onConversationMoreFunction"
        ></u-action-sheet>
      </template>
    </template>
    <u-empty v-else mode="history"> </u-empty>
  </view>
</template>

<script>
import {
  MESSAGE_TYPE,
  SESSION_MESSAGE_TYPE,
  CUSTOM_TYPE,
  CHAT_TYPE,
} from "@/EaseIM/constant";
import swipeDelete from "../../components/swipedelete/swipedelete";
import { emConversation } from "@/EaseIM/emApis";
const { sendChannelAck } = emConversation();
const tabBarHeight = 50;
const navBarHeight = 44;
const searchInputHeight = 45;
export default {
  data() {
    return {
      MESSAGE_TYPE,
      isShowDefaultSearch: true,
      searchResConversationList: [], //开启搜索时的会话列表
      searchInputKeywords: "",
      conversationListHeight: "100vh",
      defaultAvatar: "/static/images/new_ui/defaultAvatar.png",
      defaultGroupAvatar: "/static/images/new_ui/defaultGroupAvatar.png",
      longPressCheckedConversationItem: {},
      isShowMoreFunction: false,
      moreFunctionList: [
        {
          name: "会话置顶",
          type: 1,
          color: "#009EFF",
          fontSize: "15",
        },
        {
          name: "会话免打扰",
          type: 2,
          color: "#009EFF",
          fontSize: "15",
        },
        {
          name: "标记已读",
          type: 3,
          color: "#009EFF",
          fontSize: "15",
        },
        {
          name: "删除会话",
          type: 0,
          color: "#FF002B",
          fontSize: "15",
        },
      ],
    };
  },
  components: {
    swipeDelete,
  },
  computed: {
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
    loginUserAvatar() {
      if (this.loginUserProfiles.avatarurl) {
        return this.loginUserProfiles?.avatarurl;
      } else {
        return this.defaultAvatar;
      }
    },
    pinConversationList() {
      return this.$store.getters.sortedPinConversationList;
    },
    conversationList() {
      return this.$store.getters.sortedConversationList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    //好友列表
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    //会话头像展示
    showConversationAvatar() {
      return (conversationItem) => {
        const { conversationId, conversationType } = conversationItem;
        if (conversationType === CHAT_TYPE.SINGLE_CHAT) {
          if (
            this.friendUserInfoCollection[conversationId] &&
            this.friendUserInfoCollection[conversationId]?.avatarurl
          ) {
            return this.friendUserInfoCollection[conversationId].avatarurl;
          } else {
            return this.defaultAvatar;
          }
        } else if (conversationType === CHAT_TYPE.GROUP_CHAT) {
          return this.defaultGroupAvatar;
        }
      };
    },
    //会话name展示
    showConversationName() {
      return (conversationItem) => {
        const { conversationId, conversationType } = conversationItem;
        if (conversationType === CHAT_TYPE.SINGLE_CHAT) {
          // 使用 find() 方法代替 some() 来获取备注名
          const friend = this.friendList.find(
            (f) => f.userId === conversationId
          );
          if (friend?.remark) {
            return friend.remark;
          } else if (
            this.friendUserInfoCollection[conversationId] &&
            this.friendUserInfoCollection[conversationId]?.nickname
          ) {
            return this.friendUserInfoCollection[conversationId].nickname;
          } else {
            return conversationId;
          }
        } else if (conversationType === CHAT_TYPE.GROUP_CHAT) {
          return this.getGroupName(conversationId);
        }
      };
    },
    //处理时间显示
    handleTime() {
      return (item) => {
        // return this.$u.timeFormat(item.time, 'mm/dd/hh:MM');
        // const {
        //   lastMessage: { time },
        // } = item;
        // console.log(item.lastMessage.time);
        return this.$u.timeFrom(item?.time || item?.lastMessage?.time);
      };
    },
    getMessageStatusCollection() {
      return this.$store.getters.messageStatusCollection;
    },
    //处理预览消息内容
    handleLastMsgContent() {
      return (msgBody) => {
        const { type, msg } = msgBody;
        let resultContent = "";
        //如果消息类型，在预设非展示文本类型中，就返回预设值
        if (
          this.getMessageStatusCollection[msgBody.id] &&
          this.getMessageStatusCollection[msgBody.id] === "recalled"
        ) {
          return "该消息已被撤回";
        } else if (SESSION_MESSAGE_TYPE[type]) {
          resultContent = SESSION_MESSAGE_TYPE[type];
        } else if (type === MESSAGE_TYPE.CUSTOM) {
          //如果为自定义类型消息就匹配自定义消息对应的lastmsg文本
          if (msgBody.customEvent) {
            (CUSTOM_TYPE[msgBody.customEvent] &&
              (resultContent = CUSTOM_TYPE[msgBody.customEvent])) ||
              "";
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
    //免打扰状态
    conversationItemSilentStatus() {
      return (conversationId) => {
        const silentStatus =
          this.$store.getters.silentConversationMap[conversationId]?.type ===
          "NONE";
        return silentStatus;
      };
    },
  },
  created() {
    console.log("converstaion created");
    this.$store.dispatch("fetchPinConversationList");
    if (!this.conversationList.length) {
      this.$store.dispatch("fetchConversationList");
    }
    uni.hideHomeButton && uni.hideHomeButton();
    this.setConversationListHeigth();
  },
  methods: {
    handleDelete(conversationItem) {
      uni.showModal({
        title: "确认删除？",
        confirmText: "删除",
        success: async (res) => {
          if (res.confirm) {
            this.$store.dispatch("deleteConversation", {
              ...conversationItem,
            });
          }
        },
        fail: function (err) {
          uni.showToast({
            title: "删除失败",
            icon: "none",
            duration: 2000,
          });
          console.log("删除失败", err);
        },
      });
    },
    setConversationListHeigth() {
      uni.getSystemInfo({
        success: (res) => {
          //顶部安全区高度
          const statusBarHeight = res.statusBarHeight;
          //底部安全区高度
          const safeAreaBottom = res.safeAreaInsets.bottom;
          console.log("safeAreaBottom", safeAreaBottom);
          this.conversationListHeight =
            res.windowHeight -
            (tabBarHeight +
              navBarHeight +
              searchInputHeight +
              statusBarHeight +
              safeAreaBottom);
        },
      });
    },
    scrolltolower() {
      console.log(">>>>>>list触底");
    },
    //群组名称
    getGroupName(groupid) {
      const joinedGroupList = this.$store.state.GroupStore.joinedGroupList;
      let groupName = "";
      if (joinedGroupList.length) {
        joinedGroupList.forEach((item) => {
          if (item.groupId == groupid) {
            return (groupName = item.groupName);
          }
        });
        return groupName;
      } else {
        return groupid;
      }
    },
    //开启搜索模式
    openSearch() {
      this.isShowDefaultSearch = false;
    },
    //取消搜索模式
    cancelSearch() {
      this.searchInputKeywords = "";
      this.searchResConversationList = [];
      this.isShowDefaultSearch = true;
    },
    //执行搜索并返回搜索结果
    actionSearch(val) {
      const sourceConversationList = [
        ...this.conversationList,
        ...this.pinConversationList,
      ];
      let keyWord = this.searchInputKeywords;
      let resConversationList = [];
      if (keyWord) {
        resConversationList = sourceConversationList.filter(
          (conversatonItem) => {
            const { conversationId, conversationType, lastMessage } =
              conversatonItem;
            if (conversationType === CHAT_TYPE.SINGLE_CHAT) {
              if (
                this.friendUserInfoCollection[conversationId] &&
                this.friendUserInfoCollection[conversationId]?.nickname
              ) {
                return (
                  lastMessage?.msg?.indexOf(keyWord) > -1 ||
                  conversationId?.indexOf(keyWord) > -1 ||
                  this.friendUserInfoCollection[
                    conversationId
                  ].nickname?.indexOf(keyWord) > -1
                );
              } else {
                return (
                  lastMessage?.msg?.indexOf(keyWord) > -1 ||
                  conversationId.indexOf(keyWord) > -1
                );
              }
            }
            if (conversationType === CHAT_TYPE.GROUP_CHAT) {
              console.log(">>>>group chat lastMessage", lastMessage);
              return (
                conversationId.indexOf(keyWord) > -1 ||
                this.getGroupName(conversationId).indexOf(keyWord) > -1 ||
                lastMessage?.msg?.indexOf(keyWord) > -1
              );
            }
          }
        );
      }
      console.log(">>>>>执行搜索", resConversationList);
      this.searchResConversationList = [...resConversationList];
    },
    //长按会话事件
    onConversationMoreFunction(conversationItem) {
      if (conversationItem) {
        const silentStatus =
          this.$store.getters.silentConversationMap[
            conversationItem?.conversationId
          ]?.type === "NONE";
        this.longPressCheckedConversationItem = { ...conversationItem };
        this.isShowMoreFunction = true;
        //长按时选项文本调整
        this.moreFunctionList.map((item) => {
          switch (item.type) {
            case 1:
              {
                if (conversationItem.isPinned) {
                  item.name = "取消置顶";
                } else {
                  item.name = "置顶";
                }
              }
              break;
            case 2:
              {
                if (silentStatus) {
                  item.name = "取消免打扰";
                } else {
                  item.name = "免打扰";
                }
              }
              break;
            case 3: {
              if (
                conversationItem?.unReadCount > 0 ||
                !conversationItem.isRead
              ) {
                item.name = "标记已读";
              } else {
                item.name = "标记未读";
              }
            }
            default:
              break;
          }
        });
        this.isShowMoreFunction = true;
        return;
      }
      this.isShowMoreFunction = false;
    },
    onSelectClick(item) {
      switch (item.type) {
        case 0:
          this.deleteConversationItem();
          break;
        case 1:
          this.handlePinConversationItem();
          break;
        case 2:
          this.handleConversationSilent();
          break;
        case 3:
          this.handleConversationUnRead();

          break;
        default:
          break;
      }
    },
    //置顶操作
    handlePinConversationItem() {
      const conversationItem = { ...this.longPressCheckedConversationItem };
      conversationItem.isPinned = !conversationItem.isPinned;
      this.$store.dispatch("pinConversationItem", conversationItem);
    },
    //删除会话
    deleteConversationItem: function () {
      uni.showModal({
        title: "确认删除？",
        confirmText: "删除",
        success: async (res) => {
          if (res.confirm) {
            this.$store.dispatch("deleteConversation", {
              ...this.longPressCheckedConversationItem,
            });
          }
        },
        fail: function (err) {
          uni.showToast({
            title: "删除失败",
            icon: "none",
            duration: 2000,
          });
          console.log("删除失败", err);
        },
      });
    },
    //会话免打扰操作
    handleConversationSilent() {
      const { conversationId, conversationType } =
        this.longPressCheckedConversationItem;
      const silentStatus =
        this.$store.getters.silentConversationMap[conversationId]?.type ===
        "NONE";
      const params = {
        conversationId,
        type: conversationType,
      };
      if (silentStatus) {
        this.$store.dispatch("setConversationSilentMode", {
          ...params,
        });
      } else {
        (params.options = {
          paramType: 0,
          remindType: "NONE",
        }),
          this.$store.dispatch("setConversationSilentMode", {
            ...params,
          });
      }
    },
    /**
     * 会话已读未读状态变更
     * isRead: true表示已读，false表示未读
     * 实现原理为本地往会话数据中插入isRead字段从而标记实现手动标记会话已读状态
     * !需注意此功能为本地实现，并不记录远端会话列表接口，刷新状态重置。
     */
    handleConversationUnRead() {
      const { unReadCount } = this.longPressCheckedConversationItem;
      if (unReadCount > 0 || !this.longPressCheckedConversationItem?.isRead) {
        this.$store.dispatch("setConversationReadStatus", {
          conversationItem: this.longPressCheckedConversationItem,
          isRead: true,
        });
      } else {
        this.$store.dispatch("setConversationReadStatus", {
          conversationItem: this.longPressCheckedConversationItem,
          isRead: false,
        });
      }
    },
    //进入系统通知页面
    entryInform() {
      uni.navigateTo({
        url: "../notification/notification",
      });
    },
    //进入聊天页面
    entryChatPage: async function (conversationItem) {
      const { conversationId, conversationType } = conversationItem;
      if (conversationItem.unReadCount > 0) {
        this.$store.dispatch("sendConversatonReadedAck", {
          targetId: conversationId,
          chatType: conversationType,
        });
      }
      uni.navigateTo({
        url: `../emChatContainer/index?targetId=${conversationId}&chatType=${conversationType}`,
      });
    },
  },
};
</script>
<style>
@import "./conversation.css";
</style>
