<template>
  <view class="contacts_detail_container">
    <!-- #ifdef H5 || APP-PLUS -->
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :autoBack="true"
    >
      <u-icon
        v-show="isFriend"
        slot="right"
        size="36"
        name="/static/images/new_ui/more_icon.png"
        @click="isShowMoreActionSheet = true"
      ></u-icon>
    </u-navbar>
    <!-- #endif -->
    <!-- #ifndef H5 || APP-PLUS-->

    <u-navbar :safeAreaInsetTop="true" :placeholder="true" :fixed="true">
      <view class="u-nav-slot" slot="left">
        <u-icon
          name="arrow-left"
          size="20"
          @click="onArrowLeftBackClick"
        ></u-icon>
        <u-line
          direction="column"
          :hairline="false"
          length="16"
          margin="0 5px"
        ></u-line>
        <u-icon
          v-show="isFriend"
          size="36"
          name="/static/images/new_ui/more_icon.png"
          @click="isShowMoreActionSheet = true"
        ></u-icon>
      </view>
    </u-navbar>

    <!-- #endif -->
    <!-- header -->
    <view class="contacts_detail_container_header">
      <!-- 联系人头像 -->
      <view class="contacts_detail_container_header_avatar">
        <u-avatar size="100" shape="square" :src="showFriendAvatar"></u-avatar>
      </view>
      <!-- 联系人昵称 -->
      <view class="contacts_detail_container_header_nickname">
        <u--text
          color="#171A1C"
          lineHeigth="28"
          :bold="true"
          size="20"
          :text="(friendDetail && friendDetail.nickname) || '暂无昵称'"
        ></u--text>
      </view>
      <!-- 联系人个性签名 -->
      <view class="contacts_detail_container_header_description">
        <u--text
          :lines="3"
          color="#464E53"
          size="14"
          align="center"
          lineHeight="18"
          :text="(friendDetail && friendDetail.sign) || '暂无个性签名'"
        ></u--text>
      </view>
      <!-- 联系人id -->
      <view>
        <u--text
          @click="copyContactsUserId"
          class="contacts_detail_container_header_groupid"
          :text="`环信ID：${contactsUserId}`"
          size="12"
          color="#ACB4B9"
          suffixIcon="/static/images/new_ui/mine/copy_icon.png"
        ></u--text>
      </view>
      <!-- 功能面板 -->
      <view class="contacts_detail_container_header_function_panel">
        <template v-if="isFriend">
          <view
            class="contacts_detail_container_header_function_panel_item"
            @click="entryChatPage"
          >
            <u-icon
              size="32"
              name="/static/images/new_ui/group_detail/chat_Icon.png"
            ></u-icon>
            <text class="function_pannel_item_text">发消息</text>
          </view>
        </template>
        <template v-else>
          <u-button
            class="add_new_contacts_btn"
            text="添加联系人"
            @click="addNewContact"
            color="#009EFF"
            :customStyle="{
              marginTop: '10px',
              width: '180px',
              height: '50px',
            }"
          ></u-button>
        </template>
      </view>
    </view>
    <template v-if="isFriend">
      <u-cell-group :border="false">
        <u-cell title="消息免打扰">
          <u-switch
            slot="value"
            v-model="contactsSilentStatus"
            @input="changeContactsSilentStatus"
          ></u-switch>
        </u-cell>
        <u-cell title="拉黑">
          <u-switch
            slot="value"
            v-model="isInBlockList"
            @input="changeContactsBlockStatus"
          ></u-switch>
        </u-cell>
        <u-cell
          @click="entryEditContactsRemarkPage"
          title="好友备注"
          isLink
          :value="showContactsRemark"
        ></u-cell>
        <!-- <u-cell title="清空聊天记录"></u-cell> -->
      </u-cell-group>
      <!-- more -->
      <u-action-sheet
        :actions="actions"
        :show="isShowMoreActionSheet"
        :closeOnClickAction="true"
        :safeAreaInsetBottom="true"
        @select="onSelectClick"
        @close="isShowMoreActionSheet = false"
        cancelText="取消"
        round="16px"
      ></u-action-sheet>
      <u-modal
        :show="isShowCofirmModal"
        @confirm="onConfirmModal"
        @cancel="isShowCofirmModal = false"
        ref="uModal"
        showCancelButton
        :asyncClose="true"
        :title="modalShowContent.title"
        :content="modalShowContent.content"
      >
      </u-modal>
    </template>
  </view>
</template>

<script>
import { EMClient } from "@/EaseIM";
import { emContacts } from "@/EaseIM/emApis";
import { CHAT_TYPE } from "@/EaseIM/constant";
const {
  addContactFromServer,
  removeContactFromServer,
  addUsersToBlocklist,
  removeUsersFromBlocklist,
} = emContacts();
export default {
  data() {
    return {
      contactsSilentStatus: false,
      isInBlockList: false,
      isShowMoreActionSheet: false,
      contactsUserId: "",
      actions: [
        {
          type: "DELETE_CONTACTS",
          name: "删除联系人",
          color: "#FF002B",
          fontSize: "16",
        },
      ],
      isShowCofirmModal: false,
      modalShowContent: {
        title: "确认删除联系人？",
        content: "确认该用户，同时删除该联系人的聊天记录。",
      },
      defaultAvatar: "/static/images/new_ui/defaultAvatar.png",
    };
  },
  onLoad(option) {
    if (option?.userId) {
      this.contactsUserId = option.userId;
    }
  },
  onShow() {
    if (this.contactsUserId) {
      this.fetchContactsDetail();
      this.getContactsSilentStatus();
      this.checkTheUserInBlocklist();
    }
  },
  computed: {
    loginUserInfos() {
      return this.$store.getters.loginUserProfiles;
    },
    friendList() {
      return this.$store.getters.friendList;
    },
    //检查是否为好友
    isFriend() {
      return this.friendList.some(
        (item) => item.userId === this.contactsUserId
      );
    },
    blockUserList() {
      return this.$store.getters.blockUserList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    friendDetail() {
      return this.friendUserInfoCollection[this.contactsUserId];
    },
    //联系人头像
    showFriendAvatar() {
      const hxId = this.contactsUserId;
      if (
        this.friendUserInfoCollection[hxId] &&
        this.friendUserInfoCollection[hxId]?.avatarurl
      ) {
        return this.friendUserInfoCollection[hxId].avatarurl;
      } else {
        return this.defaultAvatar;
      }
    },
    //联系人备注
    showContactsRemark() {
      return (
        this.friendList?.filter(
          (item) => item.userId === this.contactsUserId
        )[0]?.remark || "暂无备注"
      );
    },
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    //添加联系人
    async addNewContact() {
      try {
        const applymsg = `【${
          this.loginUserInfos?.nickname || EMClient.user
        }】申请加您为好友！`;
        await addContactFromServer(this.contactsUserId, applymsg);
        uni.showToast({
          title: "好友申请已发出",
          icon: "none",
          duration: 2000,
        });
      } catch (error) {
        console.log("error", error);
        uni.showToast({
          title: "好友申请失败",
          icon: "none",
          duration: 2000,
        });
      }
    },
    //删除当前联系人
    async deleteContact() {
      try {
        await removeContactFromServer(this.contactsUserId);
        await this.$store.dispatch("deleteConversation", {
          conversationId: this.contactsUserId,
          type: CHAT_TYPE.SINGLE_CHAT,
        });
        this.clearLocalHistroyMessages();
        uni.showToast({
          title: "删除成功",
          icon: "none",
          duration: 2000,
        });
        this.$store.commit("DELETE_FRIEND_ITEM", this.contactsUserId);
      } catch (error) {
        uni.showToast({
          title: "删除失败",
          icon: "none",
          duration: 2000,
        });
      } finally {
        this.isShowCofirmModal = false;
      }
    },
    onSelectClick(item) {
      if (item.type === "DELETE_CONTACTS") {
        if (this.friendUserInfoCollection[this.contactsUserId]?.nickname) {
          const contactsNickname =
            this.friendUserInfoCollection[this.contactsUserId]?.nickname;
          console.log("contactsNickname", contactsNickname);
          this.modalShowContent.content = `确认删除【${contactsNickname}】，同时删除该联系人的聊天记录？`;
        }
        this.$nextTick(() => {
          this.isShowCofirmModal = true;
        });
      }
    },
    //确认模态框
    onConfirmModal() {
      this.deleteContact();
    },
    //复制联系人ID
    copyContactsUserId() {
      uni.setClipboardData({
        data: this.contactsUserId,
        success: (res) => {
          uni.showToast({
            title: "已复制",
            icon: "none",
            duration: 1000,
          });
        },
        fail: (e) => {
          console.log(">>>复制失败", e);
          uni.showToast({
            title: "复制失败",
            icon: "none",
            duration: 1000,
          });
        },
      });
    },
    //获取用户属性
    async fetchContactsDetail() {
      try {
        this.$store.dispatch("fetchFriendUserInfo", this.contactsUserId);
      } catch (error) {
        console.log(">>>>联系人属性获取失败", error);
        uni.showToast({
          title: "联系人属性获取失败",
          icon: "none",
          duration: 1000,
        });
      }
    },
    //获取该用户是否在黑名单内
    checkTheUserInBlocklist() {
      if (this.blockUserList.includes(this.contactsUserId)) {
        this.isInBlockList = true;
      } else {
        this.isInBlockList = false;
      }
    },
    //变更拉黑动作
    async changeContactsBlockStatus(status) {
      try {
        if (status) {
          await addUsersToBlocklist([this.contactsUserId]);
          uni.showToast({
            title: "已拉黑",
            icon: "none",
            duration: 1000,
          });
        } else {
          await removeUsersFromBlocklist([this.contactsUserId]);
          uni.showToast({
            title: "已解除拉黑",
            icon: "none",
            duration: 1000,
          });
        }
        this.$store.dispatch("fetchBlockUserList");
      } catch (error) {
        console.log(">>>>拉黑动作变更失败", error);
        uni.showToast({
          icon: "none",
          title: "黑名单操作失败",
          duration: 1000,
        });
      }
    },
    //获取联系人免打扰状态
    async getContactsSilentStatus() {
      const params = {
        conversationId: this.contactsUserId,
        chatType: CHAT_TYPE.SINGLE_CHAT,
      };
      try {
        const res = await this.$store.dispatch("fetchSilentConversation", {
          ...params,
        });
        if (Object.keys(res).length && res.type === "NONE") {
          this.contactsSilentStatus = true;
        } else {
          this.contactsSilentStatus = false;
        }
      } catch (error) {
        console.log(">>>>>获取免打扰状态失败", error);
      }
    },
    //变更免打扰状态
    changeContactsSilentStatus(status) {
      const params = {
        conversationId: this.contactsUserId,
        type: CHAT_TYPE.SINGLE_CHAT,
      };
      if (status) {
        (params.options = {
          paramType: 0,
          remindType: "NONE",
        }),
          this.$store.dispatch("setConversationSilentMode", {
            ...params,
          });
      } else {
        this.$store.dispatch("setConversationSilentMode", {
          ...params,
        });
      }
    },
    //清空本地聊天记录
    clearLocalHistroyMessages() {
      this.$store.commit("DELETE_MESSAGE_FROM_COLLECTION", {
        key: this.contactsUserId,
      });
      uni.showToast({
        title: "聊天记录已清空",
        icon: "none",
        duration: 1000,
      });
    },
    //进入修改联系人备注页面
    entryEditContactsRemarkPage() {
      if (!this.contactsUserId) return;
      uni.navigateTo({
        url: `../contactsDetail/editContactsRemark?userId=${this.contactsUserId}&contactsRemark=${this.showContactsRemark}`,
      });
    },
    //进入聊天页面
    entryChatPage() {
      if (!this.contactsUserId) return;
      uni.navigateTo({
        url: `../emChatContainer/index?targetId=${this.contactsUserId}&chatType=${CHAT_TYPE.SINGLE_CHAT}`,
      });
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
