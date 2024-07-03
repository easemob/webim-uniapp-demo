<template>
  <view>
    <u-navbar
      title="选择朋友"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      leftIcon="close"
      :autoBack="true"
    >
    </u-navbar>
    <!-- 好友列表 -->
    <view>
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(friendItem, index) in friendList" :key="index">
          <!-- 展示的cell不能为当前聊天中的好友 -->
          <u-cell
            v-if="chattingId !== friendItem.userId"
            @click="openWaitSendModal(friendItem.userId)"
          >
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="showFriendAvatar(friendItem)"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view slot="title">
              <u--text
                :lines="1"
                :text="showFriendNickname(friendItem)"
                iconStyle="margin-left: 2px;"
              ></u--text>
            </view>
          </u-cell>
        </u-list-item>
      </u-list>
    </view>
    <!-- 待发送modal -->
    <u-modal
      :show="isShowWaitSendModal"
      :zoom="true"
      title="发送名片"
      async-close
      show-cancel-button
      confirm-text="发送"
      cancel-text="取消"
      @confirm="sendUserCardMessage"
      @cancel="closeWaitSendModal"
    >
      <view class="content_box">
        <text class="send_target_title">发送给：</text>
        <view class="send_target_user_info">
          <text class="send_target_nickname">{{ sendTargetName }}</text>
        </view>
        <text class="wait_send_user_nickname"
          >[个人名片] {{ waitSendUserNickname || waitSendUserId || "" }}</text
        >
        <u-input
          class="leave_message_input"
          v-model="leaveMessageInput"
          placeholder="给朋友留言"
          type="text"
          maxlength="100"
        />
      </view>
    </u-modal>
  </view>
</template>

<script>
import { emMessages } from "@/EaseIM/emApis";
import { MESSAGE_TYPE, CHAT_TYPE } from "@/EaseIM/constant";
const { sendDisplayMessages } = emMessages();
export default {
  data() {
    return {
      sendTargetInfo: {
        userId: "",
        chatType: "",
      },
      isShowWaitSendModal: false,
      waitSendUserId: "",
      waitSendUserNickname: "",
      leaveMessageInput: "",
      defaultAvatar: "/static/images/new_ui/defaultAvatar.png",
    };
  },

  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
    //好友列表
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    sendTargetName() {
      const targetId = this.chattingId;
      const targetChatType = this.chattingChatType;
      if (targetChatType === CHAT_TYPE.SINGLE_CHAT) {
        if (this.friendList.some((f) => f.userId === targetId)?.remark) {
          return this.friendList.some((f) => f.userId === targetId).remark;
        } else if (
          this.friendUserInfoCollection[targetId] &&
          this.friendUserInfoCollection[targetId]?.nickname
        ) {
          return this.friendUserInfoCollection[targetId].nickname;
        } else {
          return targetId;
        }
      }
      if (targetChatType === CHAT_TYPE.GROUP_CHAT) {
        return this.getGroupName(targetId);
      }
    },
    //好友头像展示
    showFriendAvatar() {
      return (hxId) => {
        if (
          this.friendUserInfoCollection[hxId] &&
          this.friendUserInfoCollection[hxId]?.avatarurl
        ) {
          return this.friendUserInfoCollection[hxId].avatarurl;
        } else {
          return this.defaultAvatar;
        }
      };
    },
    //好友昵称展示
    showFriendNickname() {
      return (userItem) => {
        const { userId, remark } = userItem;
        if (remark) {
          return remark;
        }
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.nickname
        ) {
          return this.friendUserInfoCollection[userId].nickname;
        } else {
          return userId;
        }
      };
    },
    //群组名称
  },
  methods: {
    scrolltolower() {},
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
    loginUserAvactar() {
      return (
        this.$store.state.LoginStore.loginUserProfiles?.avatarurl ||
        this.defaultAvatar
      );
    },
    openWaitSendModal(userId) {
      console.log(">>>>>>>111", userId);
      this.isShowWaitSendModal = true;
      this.$nextTick(() => {
        this.waitSendUserId = userId;
        this.getWaitSendUserInfo(userId);
      });
    },
    getWaitSendUserInfo(userId) {
      if (this.friendUserInfoCollection[userId]) {
        this.waitSendUserNickname =
          this.friendUserInfoCollection[userId].nickname;
        return this.friendUserInfoCollection[userId];
      }
    },
    closeWaitSendModal() {
      this.isShowWaitSendModal = false;
      this.waitSendUserId = "";
      this.waitSendUserNickname = "";
    },
    async sendUserCardMessage() {
      const customEvent = "userCard";
      if (!this.chattingId) return;
      const friendInfo = this.getWaitSendUserInfo(this.waitSendUserId);
      const customExtParams = {
        uid: this.waitSendUserId,
        ...friendInfo,
      };
      const params = {
        type: MESSAGE_TYPE.CUSTOM,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
        customEvent,
        customExts: { ...customExtParams },
      };
      try {
        await sendDisplayMessages({ ...params });
        if (this.leaveMessageInput) {
          this.sendLeaveTextMessage();
        }
      } catch (error) {
        uni.showToast({
          title: `消息发送失败${error.type}`,
          icon: "none",
        });
      } finally {
        this.isShowWaitSendModal = false;
        uni.navigateBack();
      }
    },
    async sendLeaveTextMessage() {
      const params = {
        // 消息类型。
        type: "txt",
        // 消息内容。
        msg: this.leaveMessageInput,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
      };
      try {
        const res = await sendDisplayMessages({ ...params });
        console.log(">>>>>留言消息发送成功", res);
      } catch (error) {
        console.log(">>>>>留言消息发送失败", error);
        if (error.type === 508) {
          uni.showToast({
            title: "发送内容不合规",
            icon: "none",
          });
        } else {
          uni.showToast({
            title: `消息发送失败${error.type}`,
            icon: "none",
          });
        }
      } finally {
        this.leaveMessageInput = "";
        uni.hideKeyboard && uni.hideKeyboard();
      }
    },
  },
};
</script>

<style scoped>
.content_box {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.send_target_user_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}
.send_target_title {
  font-size: 33rpx;
  color: #333;
  font-weight: 600;
}
.send_target_avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.send_target_nickname {
  font-size: 35rpx;
  color: #333;
  font-weight: 500;
}
.wait_send_user_nickname {
  font-size: 22rpx;
  color: rgba(51, 51, 51, 0.6);
  font-weight: 500;
  overflow: hidden;
  margin-top: 20rpx;
}
.leave_message_input {
  margin-top: 10rpx;
  background-color: #f7f7f7;
  border-radius: 5rpx;
}
</style>
