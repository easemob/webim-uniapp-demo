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
          text="法外狂徒"
        ></u--text>
      </view>
      <!-- 群描述 -->
      <view class="group_detail_container_header_description">
        <u--text
          :lines="3"
          color="#464E53"
          size="14"
          lineHeight="18"
          text="关于uView的取名来由，首字母u来自于uni-app首字母，uni-app是基Vuejs。"
        ></u--text>
      </view>
      <!-- 群id -->
      <view>
        <u--text
          class="group_detail_container_header_groupid"
          text="环信ID：hfp"
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
    <u-cell :border="false" title="群成员" isLink value="88人"> </u-cell>
    <u-gap height="10" bgColor="#F1F2F3"></u-gap>
    <u-cell-group :border="false">
      <u-cell title="我在本群的昵称" isLink></u-cell>
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
    };
  },
  onLoad(option) {
    if (option?.groupId) {
      this.groupId = option.groupId;
    }
  },
  methods: {},
};
</script>

<style scoped>
@import './index.css';
</style>
