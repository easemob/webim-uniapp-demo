<template>
  <view class="group_detail_container">
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
          :text="(groupDetail && groupDetail.name) || '暂无群组名称'"
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
          class="group_detail_container_header_groupid"
          :text="`群组ID：${groupDetail && groupDetail.id}`"
          size="12"
          color="#ACB4B9"
          suffixIcon="/static/images/new_ui/mine/copy_icon.png"
        ></u--text>
      </view>
      <!-- 功能面板 -->
      <view class="group_detail_container_header_function_panel">
        <view class="group_detail_container_header_function_panel_item">
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
      :border="false"
      title="群成员"
      isLink
      :value="groupDetail && groupDetail.affiliations_count"
    >
    </u-cell>
    <u-gap height="10" bgColor="#F1F2F3"></u-gap>
    <u-cell-group :border="false">
      <u-cell
        title="我在本群的昵称"
        isLink
        :value="inGroupNickname || '暂未设置'"
      ></u-cell>
      <u-cell title="消息免打扰">
        <u-switch slot="value"></u-switch>
      </u-cell>
      <u-cell title="清空聊天记录"></u-cell>
    </u-cell-group>
    <!-- more -->
    <u-action-sheet
      :actions="actions"
      :show="isShowMoreActionSheet"
      :closeOnClickAction="true"
      :safeAreaInsetBottom="true"
      @close="isShowMoreActionSheet = false"
      cancelText="取消"
      round="16px"
    ></u-action-sheet>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { emGroups } from '@/EaseIM/emApis';
const { getGroupInfosFromServer, getSingleGroupAttributesFromServer } =
  emGroups();
export default {
  data() {
    return {
      isShowMoreActionSheet: false,
      actions: [
        {
          name: '退出群组',
          color: '#FF002B',
          fontSize: '16',
        },
      ],
      groupId: '',
      groupDetail: {},
      inGroupNickname: '',
    };
  },
  onLoad(option) {
    if (option?.groupId) {
      this.groupId = option.groupId;
      this.fetchGroupDetail();
      this.fetchInGroupNickname();
    }
  },
  methods: {
    async fetchGroupDetail() {
      const groupId = this.groupId;
      try {
        const result = await getGroupInfosFromServer(groupId);
        console.log('>>>>>获取群组详情', result);
        result.length && (this.groupDetail = { ...result[0] });
      } catch (error) {
        console.log('>>>>群详情获取失败');
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
        console.log('>>>>>获取群成员昵称', result);
        if (result?.data?.nickName) {
          this.inGroupNickname = result.data.nickName;
        }
      } catch (error) {
        console.log('>>>>获取群成员昵称失败', error);
      }
    },
    //获取免打扰状态
    async getGroupSilentStatus() {},
  },
};
</script>

<style scoped>
@import './index.css';
</style>
