<template>
  <view class="group_detail_container">
    <!-- #ifdef H5 || APP-PLUS -->
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :autoBack="true"
    >
      <u-icon
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
          size="36"
          name="/static/images/new_ui/more_icon.png"
          @click="isShowMoreActionSheet = true"
        ></u-icon>
      </view>
    </u-navbar>
    <!-- #endif -->
    <!-- header -->
    <view class="group_detail_container_header">
      <!-- 群头像 -->
      <view class="group_detail_container_header_avatar">
        <u-avatar
          size="100"
          shape="square"
          src="/static/images/new_ui/defaultGroupAvatar.png"
        ></u-avatar>
      </view>
      <!-- 群名称 -->
      <view class="group_detail_container_header_groupname">
        <u--text
          color="#171A1C"
          lineHeigth="28"
          :bold="true"
          size="20"
          :text="(groupDetail && groupDetail.groupName) || '暂无群组名称'"
        ></u--text>
      </view>
      <!-- 群描述 -->
      <view class="group_detail_container_header_description">
        <u--text
          :lines="3"
          color="#464E53"
          size="14"
          align="center"
          lineHeight="18"
          :text="(groupDetail && groupDetail.description) || '暂无群组名称'"
        ></u--text>
      </view>
      <!-- 群id -->
      <view>
        <u--text
          @click="copyGroupId"
          class="group_detail_container_header_groupid"
          :text="`群组ID：${groupDetail && groupDetail.groupId}`"
          size="12"
          color="#ACB4B9"
          suffixIcon="/static/images/new_ui/mine/copy_icon.png"
        ></u--text>
      </view>

      <!-- 功能面板 -->
      <view class="group_detail_container_header_function_panel">
        <view
          class="group_detail_container_header_function_panel_item"
          @click="entryChatPage"
        >
          <u-icon
            size="32"
            name="/static/images/new_ui/group_detail/chat_Icon.png"
          ></u-icon>
          <text class="function_pannel_item_text">发消息</text>
        </view>
      </view>
    </view>
    <!-- 群人数 -->
    <u-cell
      @click="entryGroupMembers"
      :border="false"
      title="群成员"
      isLink
      :value="groupDetail && groupDetail.affiliationsCount"
    >
    </u-cell>
    <u-cell-group :border="false">
      <u-gap height="10" bgColor="#F1F2F3"></u-gap>
      <u-cell
        @click="entryEditInGroupNickname"
        title="我在本群的昵称"
        isLink
        :value="inGroupNickname || '暂未设置'"
      ></u-cell>
      <u-cell title="消息免打扰">
        <u-switch
          slot="value"
          v-model="groupSilentStatus"
          @input="changeGroupSilentStatus"
        ></u-switch>
      </u-cell>
      <!-- <u-cell title="清空聊天记录" @click="clearLocalHistroyMessages"></u-cell> -->
    </u-cell-group>
    <u-cell-group :border="false">
      <u-gap height="10" bgColor="#F1F2F3"></u-gap>
      <u-cell
        v-if="groupRole === GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.OWNER]"
        @click="entryEditInGroupName"
        title="群名称"
        isLink
        :value="(groupDetail && groupDetail.groupName) || '暂无群组名称'"
      ></u-cell>
      <u-cell
        v-if="
          groupRole === GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.ADMIN] ||
          groupRole === GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.OWNER]
        "
        @click="entryEditInGroupDescription"
        title="群描述"
        isLink
      ></u-cell>
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
      :title="modalShowContent[groupRole].title"
      :content="modalShowContent[groupRole].content"
    >
    </u-modal>
  </view>
</template>

<script>
import { EMClient } from "@/EaseIM";
import { emGroups } from "@/EaseIM/emApis";
import { GROUP_MEMEBERS_SHOW_TYPE } from "@/constant";
import {
  CHAT_TYPE,
  GROUP_ROLE_TYPE,
  GROUP_ROLE_TYPE_NAME,
} from "@/EaseIM/constant";
const {
  getGroupInfosFromServer,
  getSingleGroupAttributesFromServer,
  leaveGroupFromServer,
  destroyGroupFromServer,
} = emGroups();
const ACTIONS_TYPE = {
  EXIT_GROUP: 1,
  DESTORY_GROUP: 2,
  TRANSFER_OWNER: 3,
};
export default {
  data() {
    return {
      GROUP_ROLE_TYPE,
      GROUP_ROLE_TYPE_NAME,
      isShowMoreActionSheet: false,
      actions: [
        {
          type: ACTIONS_TYPE.EXIT_GROUP,
          name: "退出群组",
          color: "#FF002B",
          fontSize: "16",
        },
      ],
      groupId: "",
      //   groupDetail: {},
      inGroupNickname: "",
      groupSilentStatus: false,
      isShowCofirmModal: false,
      modalShowContent: {
        [GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.MEMBER]]: {
          title: "确认退出群聊？"
        },
        [GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.ADMIN]]: {
          title: "确认退出群聊？"
        },
        [GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.OWNER]]: {
          title: "确认解散群聊？"
        },
      },
    };
  },
  onLoad(option) {
    if (option?.groupId) {
      this.groupId = option.groupId;
    }
  },
  computed: {
    groupRole() {
      const group = this.$store.getters.joinedGroupList.find(
        (item) => item.groupId === this.groupId
      );
      return group?.role
        ? GROUP_ROLE_TYPE[group.role]
        : GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.MEMBER];
    },
    groupDetail() {
      const group = this.$store.getters.joinedGroupList.find(
        (item) => item.groupId === this.groupId
      );
      return group;
    },
  },

  onShow() {
    //TODO 优化减少接口的调用
    if (this.groupId) {
      this.fetchGroupDetail();
      this.fetchInGroupNickname();
      this.getGroupSilentStatus();
    }
    this.initActions();
    console.log(">>>当前role", this.groupRole);
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    initActions() {
      const _index = this.actions.findIndex(
        (item) => item.type === ACTIONS_TYPE.TRANSFER_OWNER
      );
      console.log("_index", _index);

      if (this.groupRole === GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.OWNER]) {
        this.actions[0].name = "解散群组";
        this.actions[0].type = ACTIONS_TYPE.DESTORY_GROUP;
        if (_index === -1) {
          this.actions.push({
            type: ACTIONS_TYPE.TRANSFER_OWNER,
            name: "转让群主",
            color: "#009EFF",
            fontSize: "16",
          });
        }
      } else {
        this.actions[0].name = "退出群组";
        this.actions[0].type = ACTIONS_TYPE.EXIT_GROUP;
        if (_index > -1) {
          this.actions.splice(_index, 1);
        }
      }
    },
    //复制群组ID
    copyGroupId() {
      uni.setClipboardData({
        data: this.groupId,
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
    async fetchGroupDetail() {
      const groupId = this.groupId;
      let data = {};
      try {
        const result = await getGroupInfosFromServer(groupId);
        data = {
          ...result[0],
        };
        this.$store.commit("UPDATE_JOINED_GROUP_DATA", {
          groupDetail: data,
        });
      } catch (error) {
        console.log(">>>>群详情获取失败", error);
        uni.showToast({
          title: "群详情获取失败",
          icon: "none",
          duration: 1000,
        });
      }
    },
    async fetchInGroupNickname() {
      const groupId = this.groupId;
      const userId = EMClient.user;
      try {
        const result = await getSingleGroupAttributesFromServer(
          groupId,
          userId
        );
        if (result?.data?.nickName) {
          this.inGroupNickname = result.data.nickName;
        }
      } catch (error) {
        console.log(">>>>获取群成员昵称失败", error);
      }
    },
    //进入群组成员页面
    entryGroupMembers() {
      const groupId = this.groupId;
      const groupMembersShowType = GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY;
      const groupRole = this.groupRole;
      uni.navigateTo({
        url: `../groupMembers/index?groupId=${groupId}&groupRole=${groupRole}&groupMembersShowType=${groupMembersShowType}`,
      });
    },
    //获取免打扰状态
    async getGroupSilentStatus() {
      const params = {
        conversationId: this.groupId,
        chatType: CHAT_TYPE.GROUP_CHAT,
      };
      try {
        const res = await this.$store.dispatch("fetchSilentConversation", {
          ...params,
        });
        if (Object.keys(res).length && res.type === "NONE") {
          this.groupSilentStatus = true;
        } else {
          this.groupSilentStatus = false;
        }
      } catch (error) {
        console.log(">>>>>获取免打扰状态失败", error);
      }
    },
    //修改免打扰状态
    changeGroupSilentStatus(status) {
      console.log(">>>>>>修改免打��状态", status);
      const params = {
        conversationId: this.groupId,
        type: CHAT_TYPE.GROUP_CHAT,
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
    onSelectClick(item) {
      console.log(">>>>>>>已选择", item);
      if (item.type === ACTIONS_TYPE.TRANSFER_OWNER) {
        console.log(">>>>>>跳转至转让群主");
        const groupId = this.groupId;
        const groupMembersShowType = GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER;
        const groupRole = this.groupRole;
        uni.navigateTo({
          url: `../groupMembers/index?groupId=${groupId}&groupRole=${groupRole}&groupMembersShowType=${groupMembersShowType}`,
        });
      }
      if (
        item.type === ACTIONS_TYPE.DESTORY_GROUP ||
        item.type === ACTIONS_TYPE.EXIT_GROUP
      ) {
        this.isShowCofirmModal = true;
      }
    },
    //确认模态框
    onConfirmModal() {
      console.log(">>>>>确认弹出框", this.actions[0].type);
      if (this.actions[0].type === ACTIONS_TYPE.DESTORY_GROUP) {
        this.destroyGroup();
      }
      if (this.actions[0].type === ACTIONS_TYPE.EXIT_GROUP) {
        this.exitGroup();
      }
    },
    //普通成员退出群组
    async exitGroup() {
      const groupId = this.groupId;
      if (!groupId) return;
      try {
        await leaveGroupFromServer(groupId);
        this.$store.commit("DELETE_JOINEND_GROUP", groupId);
        this.$store.commit("DELETE_CONVERSATION_ITEM", groupId);
        uni.navigateBack();
      } catch (error) {
        console.log(">>>>退出群组失败", error);
        uni.showToast({
          title: "退出群组失败",
          icon: "none",
        });
      } finally {
        this.isShowCofirmModal = false;
      }
    },
    //群主解散群组
    async destroyGroup() {
      const groupId = this.groupId;
      if (!groupId) return;
      try {
        await destroyGroupFromServer(groupId);
        this.$store.commit("DELETE_JOINEND_GROUP", groupId);
        this.$store.commit("DELETE_CONVERSATION_ITEM", groupId);
        uni.navigateBack();
      } catch (error) {
        console.log(">>>>解散群组失败", error);
        uni.showToast({
          title: "解散群组失败",
          icon: "none",
        });
      } finally {
        this.isShowCofirmModal = false;
      }
    },
    //清空本地聊天记录
    // clearLocalHistroyMessages() {
    //   this.$store.commit("DELETE_MESSAGE_FROM_COLLECTION", {
    //     key: this.groupId,
    //   });
    //   uni.showToast({
    //     title: "聊天记录已清空",
    //     icon: "none",
    //     duration: 1000,
    //   });
    // },
    //进入群内昵称编辑页面
    entryEditInGroupNickname() {
      uni.navigateTo({
        url: `../groupDetail/editGroupAttributes?groupId=${this.groupId}&inGroupNickname=${this.inGroupNickname}`,
      });
    },
    //进入群组名称修改页面
    entryEditInGroupName() {
      const groupId = this.groupId;
      const groupName = this.groupDetail?.name || "";
      console.log("this.groupDetail?", groupName);
      uni.navigateTo({
        url: `../groupDetail/editGroupName?groupId=${groupId}&groupName=${groupName}`,
      });
    },
    //进入群组详情修改页面
    entryEditInGroupDescription() {
      const groupId = this.groupId;
      const groupDescription = this.groupDetail?.description || "";
      uni.navigateTo({
        url: `../groupDetail/editGroupDescription?groupId=${groupId}&groupDescription=${groupDescription}`,
      });
    },
    //进入聊天页面
    entryChatPage() {
      if (!this.groupId) return;
      uni.navigateTo({
        url: `../emChatContainer/index?targetId=${this.groupId}&chatType=${CHAT_TYPE.GROUP_CHAT}`,
      });
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
