<template>
  <view>
    <!-- 搜索框 -->
    <view>
      <view class="search" v-if="conversationState.search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="search_input" v-if="conversationState.search_chats">
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
          v-model.trim="conversationState.search_keyword"
        />
        <icon
          type="clear"
          size="12"
          @tap.stop="clearSearchInput"
          v-if="conversationState.show_clear"
        ></icon>
      </view>
      <text @tap="cancelSearch">取消</text>
    </view>
    <scroll-view
      scroll-y="true"
      :class="
        'chat_list_wraper ' +
        (conversationState.gotop
          ? conversationState.isIPX
            ? 'goTopX'
            : 'goTop'
          : 'goback')
      "
      :style="
        'padding-bottom: ' + (conversationState.isIPX ? '270rpx' : '226rpx')
      "
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
        v-for="(item, index) in conversationState.conversationList"
        :key="index"
        class="chat_list"
        :data-item="item"
      >
        <swipe-delete @deleteChatItem="deleteConversation(item)">
          <view
            class="tap_mask"
            :data-item="JSON.stringify(item)"
            @click="entryemChat(item)"
          >
            <!-- 消息列表 -->
            <view class="list_box">
              <view class="list_left" :data-username="item.channel_id">
                <view class="list_pic">
                  <view class="em-msgNum" v-if="item.unread_num">
                    {{ item.unread_num > 99 ? '99+' : item.unread_num }}</view
                  >

                  <image :src="showConversationAvatar(item)"></image>
                </view>
                <view class="list_text">
                  <text class="list_user">{{
                    showConversationName(item)
                  }}</text>
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == 'inform'"
                    >{{ item.lastMessage.msg }}</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.TEXT"
                    >{{ item.lastMessage.msg }}</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.IMAGE"
                    >[图片]</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.AUDIO"
                    >[语音]</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.FILE"
                    >[附件]</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.VIDEO"
                    >[视频]</text
                  >
                  <text
                    class="list_word"
                    v-if="item.lastMessage.type == MESSAGE_TYPE.CUSTOM"
                  >
                    <text v-if="item.lastMessage.customEvent === 'userCard'"
                      >[个人名片]</text
                    >
                  </text>
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{
                  handleTime(item)
                }}</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>
      <view v-if="!conversationList.length" class="chat_noChat">
        <image class="ctbg" src="/static/images/ctbg.png"></image>
        暂无聊天消息
      </view>
    </scroll-view>

    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <view
      class="mask"
      @tap="close_mask"
      v-if="conversationState.show_mask"
    ></view>
  </view>
</template>

<script setup>
import { reactive, computed, watch, watchEffect } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import swipeDelete from '@/components/swipedelete/swipedelete';
import { emConversation } from '@/EaseIM/imApis';
import { CHAT_TYPE, MESSAGE_TYPE } from '@/EaseIM/constant';
import { useConversationStore } from '@/stores/conversation';
import { useContactsStore } from '@/stores/contacts';
import { useGroupStore } from '@/stores/group';
import dateFormater from '@/utils/dateFormater';
/* store */
import { useInformStore } from '@/stores/inform';
const conversationState = reactive({
  //       msgtype,
  search_btn: true,
  search_chats: false,
  search_keyword: '',
  show_mask: false,
  yourname: '',
  conversationList: [], //搜索后返回的会话数据,
  show_clear: false,
  member: '',
  isIPX: false,
  gotop: false,
  groupName: {},
  winSize: {},
  popButton: ['删除该聊天'],
  showPop: false,
  currentVal: '',
  pushConfigData: [],
  defaultAvatar: '/static/images/theme2x.png',
  defaultGroupAvatar: '/static/images/groupTheme.png',
});
//群组名称
const groupStore = useGroupStore();
const getGroupName = (groupid) => {
  const joinedGroupList = groupStore.joinedGroupList;
  let groupName = '';
  if (joinedGroupList.length) {
    joinedGroupList.forEach((item) => {
      if (item.groupid === groupid) {
        return (groupName = item.groupname);
      }
    });
    return groupName;
  } else {
    return groupid;
  }
};
/* 系统通知 */
const informStore = useInformStore();
//最近一条系统通知
const lastInformData = computed(() => {
  return (
    informStore.getAllInformsList[informStore.getAllInformsList.length - 1] ||
    null
  );
});
//未处理系统通知总数
const unReadNoticeNum = computed(() => {
  return informStore.getAllInformsList.filter((inform) => !inform.isHandled)
    .length;
});
/* 会话列表 */
const conversationStore = useConversationStore();
const {
  fetchConversationFromServer,
  removeConversationFromServer,
  sendChannelAck,
} = emConversation();
const fetchConversationList = async () => {
  const res = await fetchConversationFromServer();
  if (res?.data?.channel_infos) {
    conversationStore.setConversationList(
      Object.assign([], res.data.channel_infos)
    );
  }
};
//会话列表数据
const conversationList = computed(() => {
  return conversationStore.sortedConversationList;
});
// watch(
//   conversationList,
//   () => {
//     conversationState.conversationList = Object.assign(
//       [],
//       conversationList.value
//     );
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );
watchEffect(() => {
  console.log('>>>>>执行更新会话列表数据');
  conversationState.conversationList = Object.assign(
    [],
    conversationList.value
  );
});
//会话列表name&头像展示处理
const contactsStore = useContactsStore();
//好友属性
const friendUserInfoMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
//会话列表头像
const showConversationAvatar = computed(() => {
  return (item) => {
    switch (item.chatType) {
      case CHAT_TYPE.SINGLE_CHAT:
        const friendInfo = friendUserInfoMap.value.get(item.channel_id) || {};
        return friendInfo.avatarurl ?? conversationState.defaultAvatar;
      case CHAT_TYPE.GROUP_CHAT:
        return conversationState.defaultGroupAvatar;
      default:
        return null;
    }
  };
});
//会话列表名称
const showConversationName = computed(() => {
  return (item) => {
    switch (item.chatType) {
      case CHAT_TYPE.SINGLE_CHAT:
        const friendInfo = friendUserInfoMap.value.get(item.channel_id);
        return friendInfo?.nickname || item.channel_id;
      case CHAT_TYPE.GROUP_CHAT:
        return getGroupName(item.channel_id);
      default:
        return null;
    }
  };
});
//时间展示
const handleTime = computed(() => {
  return (item) => {
    return dateFormater('MM/DD/HH:mm', item.time);
  };
});
//删除会话
const deleteConversation = async (eventItem) => {
  const { channel_id, chatType } = eventItem;
  try {
    const res = await uni.showModal({
      title: '确认删除？',
      confirmText: '删除',
    });
    if (res.confirm) {
      await removeConversationFromServer(channel_id, chatType);
      conversationStore.deleteConversation(channel_id);
    }
  } catch (error) {
    uni.showToast({
      title: '删除失败',
      icon: 'none',
      duration: 2000,
    });
    console.log('删除失败', error);
  }
};
/* 搜索会话相关逻辑 */
//开启搜索模式
const openSearch = () => {
  conversationState.search_btn = false;
  conversationState.search_chats = true;
  conversationState.gotop = true;
};
//执行搜索方法
const actionSearch = () => {
  const keyWord = conversationState.search_keyword;
  let resConversationList = [];
  if (keyWord) {
    resConversationList = conversationStore.conversationList.filter((item) => {
      if (item.chatType === CHAT_TYPE.SINGLE_CHAT || item.chatType === 'chat') {
        if (
          friendUserInfoMap.value.has(item.channel_id) &&
          friendUserInfoMap.value.get(item.channel_id)?.nickname
        ) {
          return (
            item.lastMessage.msg?.indexOf(keyWord) > -1 ||
            item.channel_id?.indexOf(keyWord) > -1 ||
            friendUserInfoMap.value
              .get(item.channel_id)
              .nickname?.indexOf(keyWord) > -1
          );
        } else {
          return (
            item.lastMessage.msg?.indexOf(keyWord) > -1 ||
            item.channel_id?.indexOf(keyWord) > -1
          );
        }
      }
      if (
        item.chatType === CHAT_TYPE.GROUP_CHAT ||
        item.chatType === 'groupchat'
      ) {
        return (
          item.channel_id.indexOf(keyWord) > -1 ||
          getGroupName(item.channel_id).indexOf(keyWord) > -1 ||
          item.lastMessage.msg.indexOf(keyWord) > -1
        );
      }
    });
  }
  console.log('>>>>>执行搜索', resConversationList);
  conversationState.conversationList = resConversationList;
};
//取消搜索
const cancelSearch = () => {
  conversationState.search_btn = true;
  conversationState.search_chats = false;
  conversationState.gotop = false;
  conversationState.conversationList = conversationList.value;
};
//清空搜索框
const clearSearchInput = () => {
  conversationState.search_keyword = '';
  conversationState.show_clear = false;
};
//输入框事件触发
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    conversationState.show_clear = true;
  } else {
    cancelSearch();
  }
};
const close_mask = () => {
  conversationState.search_btn = true;
  conversationState.search_chats = false;
  conversationState.show_mask = false;
};

/* 获取窗口尺寸 */
const getWindowSize = () => {
  uni.getSystemInfo({
    success: (res) => {
      conversationState.winSize = {
        witdh: res.windowWidth,
        height: res.windowHeight,
      };
    },
  });
};
const hidePop = () => {
  conversationState.showPop = false;
};
const entryInform = () => {
  uni.navigateTo({
    url: '../notification/notification',
  });
};
const entryemChat = (params) => {
  console.log('params', params);
  //发送channelack 清除服务端该会话未读数，并且清除本地未读红点
  sendChannelAck(params.channel_id, params.chatType);
  conversationStore.clearConversationUnReadNum(params.channel_id);
  conversationStore.setChattingUserId(params.channel_id);
  uni.navigateTo({
    url: `../emChatContainer/index?targetId=${params.channel_id}&chatType=${params.chatType}`,
  });
};
onLoad(() => {
  if (!conversationList.value.length) {
    fetchConversationList();
  }
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
});
</script>
<style>
@import './conversation.css';
</style>
