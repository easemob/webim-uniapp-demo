<template>
  <view>
    <!-- 好友列表cell -->
    <u-cell-group>
      <u-cell-item
        v-for="(item, index) in friendList"
        :key="item + index"
        icon="account-fill"
        :title="showConversationName(item)"
        @click="openWaitSendModal(item)"
      ></u-cell-item>
    </u-cell-group>
    <!-- 待发送框 -->
    <u-modal
      v-model="isShowWaitSendModal"
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
          <image
            class="send_target_avatar"
            :src="showConversationAvatar(targetId)"
          ></image>
          <text class="send_target_nickname">{{
            showConversationName(targetId)
          }}</text>
        </view>
        <text class="wait_send_user_nickname"
          >[个人名片] {{ waitSendUserNickname || waitSendUserId || '' }}</text
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
import { emMessages } from '@/EaseIM/emApis';
import { MESSAGE_TYPE } from '@/EaseIM/constant';
const { sendDisplayMessages } = emMessages();
export default {
  data() {
    return {
      targetId: '',
      chatType: '',
      isShowWaitSendModal: false,
      waitSendUserId: '',
      waitSendUserNickname: '',
      leaveMessageInput: '',
      defaultAvatar: '/static/images/theme2x.png',
    };
  },
  onLoad(option) {
    this.targetId = option.targetId;
    this.chatType = option.chatType;
  },
  computed: {
    friendList() {
      return this.$store.getters.friendList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
    //会话name展示
    showConversationName() {
      return (userId) => {
        if (
          this.friendUserInfoMap.has(userId) &&
          this.friendUserInfoMap.get(userId)?.nickname
        ) {
          return this.friendUserInfoMap.get(userId).nickname;
        } else {
          return userId;
        }
      };
    },
    showConversationAvatar() {
      return (userId) => {
        if (
          this.friendUserInfoMap.has(userId) &&
          this.friendUserInfoMap.get(userId)?.avatarurl
        ) {
          return this.friendUserInfoMap.get(userId).avatarurl;
        } else {
          return this.defaultAvatar;
        }
      };
    },
  },
  methods: {
    loginUserAvactar() {
      return (
        this.$store.state.LoginStore.loginUserProfiles?.avatarurl ||
        this.defaultAvatar
      );
    },
    openWaitSendModal(userId) {
      this.isShowWaitSendModal = true;
      this.$nextTick(() => {
        this.waitSendUserId = userId;
        this.getWaitSendUserInfo(userId);
      });
    },
    getWaitSendUserInfo(userId) {
      if (this.friendUserInfoMap.has(userId)) {
        this.waitSendUserNickname = this.friendUserInfoMap.get(userId).nickname;
        return this.friendUserInfoMap.get(userId);
      }
    },
    closeWaitSendModal() {
      this.waitSendUserId = '';
      this.waitSendUserNickname = '';
    },
    async sendUserCardMessage() {
      const customEvent = 'userCard';
      if (!this.targetId) return;
      const friendInfo = this.getWaitSendUserInfo(this.waitSendUserId);
      const customExtParams = {
        uid: this.targetId,
        ...friendInfo,
      };
      const params = {
        type: MESSAGE_TYPE.CUSTOM,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.targetId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chatType,
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
          title: '消息发送失败',
          icon: 'none',
        });
      } finally {
        this.isShowWaitSendModal = false;
        uni.navigateBack();
      }
    },
    async sendLeaveTextMessage() {
      const params = {
        // 消息类型。
        type: 'txt',
        // 消息内容。
        msg: this.leaveMessageInput,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.targetId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chatType,
      };
      try {
        const res = await sendDisplayMessages({ ...params });
        console.log('>>>>>留言消息发送成功', res);
      } catch (error) {
        console.log('>>>>>留言消息发送失败', error);
        uni.showToast({
          title: '消息发送失败',
          icon: 'none',
        });
      } finally {
        this.leaveMessageInput = '';
        uni.hideKeyboard && uni.hideKeyboard();
      }
    },
  },
};
</script>

<style scoped>
.content_box {
  padding: 20rpx;
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
