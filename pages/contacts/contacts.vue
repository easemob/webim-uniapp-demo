<template>
  <view class="contacts_container">
    <view>
      <view class="search" v-if="contactsState.search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>

    <view>
      <view>
        <!-- 左侧列表内容部分 -->
        <scroll-view
          class="main_body"
          enable-back-to-top
          :scroll-into-view="contactsState.toView"
          scroll-y="true"
          scroll-with-animation="true"
          :style="{
            height: contactsState.scrollViewHeight,
          }"
        >
          <!-- search -->

          <view class="search_input" v-if="contactsState.search_friend">
            <view>
              <icon type="search" size="13"></icon>
              <input
                placeholder="搜索"
                placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
                auto-focus
                confirm-type="search"
                type="text"
                @confirm="onSearchContacts"
                @input="onInput"
                v-model="contactsState.serach_keyword"
              />
              <icon
                type="clear"
                size="13"
                @tap.stop="clearInput"
                v-if="contactsState.show_clear"
              ></icon>
            </view>
            <text @tap="cancelSearchContacts">取消</text>
          </view>
          <view class="contain">
            <view class="otherItem" @click="entryInform">
              <image
                src="../../static/images/inform.png"
                data-username="name"
              ></image>
              <text>系统通知</text>
            </view>
            <view class="otherItem" @click="entryAddNewFreiend">
              <image
                src="/static/images/invite_theme2x.png"
                data-username="name"
              ></image>
              <text>添加好友</text>
            </view>
            <view class="otherItem" @click="entryGroups">
              <image src="/static/images/groupTheme.png"></image>
              <text>群组</text>
            </view>
          </view>

          <view
            v-for="(group, id) in contactsState.listMain"
            :key="id"
            :id="'inToView' + group.id"
            :data-id="group.id"
          >
            <view class="address_top">{{ group.region }}</view>
            <view
              v-for="(item, brandId) in group.brands"
              :key="brandId"
              :data-username="item.name"
            >
              <swipe-delete @deleteChatItem="deleteFriend(item)">
                <view
                  class="tap_mask"
                  :data-username="item.name"
                  @click="entryemChat(item)"
                >
                  <view class="address_bottom" :data-username="item.name">
                    <image
                      :src="showFriendAvatar(item.name)"
                      :data-username="item.name"
                    ></image>
                    <text :data-username="item.name">{{
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
          <block v-for="(item, id) in contactsState.listMain" :key="id">
            <view
              :class="
                'orientation_city ' +
                (contactsState.isActive == item.id ? 'active' : '')
              "
              @tap="scrollToViewFn"
              :data-id="item.id"
              >{{ item.region }}</view
            >
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed, watchEffect, onMounted } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import swipeDelete from '@/components/swipedelete/swipedelete';
/* stores */
import { useContactsStore } from '@/stores/contacts';
/* im api */
import { CHAT_TYPE } from '@/EaseIM/constant';
import { emContacts } from '@/EaseIM/imApis';

let systemReady = false;
let canPullDownreffesh = true;

const contactsState = reactive({
  search_btn: true,
  search_friend: false,
  show_mask: false,
  messageNum: '',
  //总通知数：加好友申请数 + 加群通知数
  isActive: null,
  listMain: [],
  listTitles: [],
  scrollViewHeight: '100vh',
  toView: '',
  oHeight: [],
  scroolHeight: 0,
  show_clear: false,
  isHideLoadMore: true,
  isIPX: false,
  gotop: false,
  serach_keyword: '',
  showFixedTitile: false,
  defaultAvatar: '/static/images/theme2x.png',
});
/* 联系人用户昵称头像展示 */
const contactsStore = useContactsStore();
//好友属性
const friendUserInfoMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
//好友头像展示
const showFriendAvatar = computed(() => {
  return (hxId) => {
    if (
      friendUserInfoMap.value.has(hxId) &&
      friendUserInfoMap.value.get(hxId)?.avatarurl
    ) {
      return friendUserInfoMap.value.get(hxId).avatarurl;
    } else {
      return contactsState.defaultAvatar;
    }
  };
});
//好友昵称展示
const showFriendNickname = computed(() => {
  return (hxId) => {
    if (
      friendUserInfoMap.value.has(hxId) &&
      friendUserInfoMap.value.get(hxId)?.nickname
    ) {
      return friendUserInfoMap.value.get(hxId).nickname;
    } else {
      return hxId;
    }
  };
});
//好友列表
const friendList = computed(() => {
  return contactsStore.friendList;
});
/* 形成indexlist好友列表 */
//点击右侧字母导航定位触发
const scrollToViewFn = (e) => {
  let _id = e.target.dataset.id;
  for (let i = 0; i < contactsState.listMain.length; ++i) {
    if (contactsState.listMain[i].id === _id) {
      contactsState.isActive = _id;
      contactsState.toView = 'inToView' + _id;
      console.log('first');
      uni.pageScrollTo({
        selector: `#inToView${_id}`,
        duration: 300,
        success: () => {
          console.log('>>>>滚动成功');
        },
        fail: () => {
          console.log('>>>>失败成功');
        },
      });
      break;
    }
  }
};
// 处理数据格式 生成list 索引。
const getBrands = (member) => {
  const reg = /[a-z]/i;
  let contactsList = [];
  member.length &&
    member.forEach((userId) => {
      let contactsObj = {};
      contactsObj.name = userId;
      if (reg.test(userId.substring(0, 1))) {
        contactsObj.initial = userId.substring(0, 1).toUpperCase();
        contactsList.push({ ...contactsObj });
      } else {
        contactsObj.initial = '#';
        contactsList.push({ ...contactsObj });
      }
    });
  generateIndexedList(contactsList);
};
const generateIndexedList = (contactsList) => {
  contactsList.sort(
    (a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0)
  );
  var someTtitle = null;
  var someArr = [];

  for (var i = 0; i < contactsList.length; i++) {
    var newBrands = {
      brandId: contactsList[i].name + contactsList[i].initial,
      name: contactsList[i].name,
    };

    if (contactsList[i].initial == '#') {
      if (!lastObj) {
        var lastObj = {
          id: i,
          region: '#',
          brands: [],
        };
      }

      lastObj.brands.push(newBrands);
    } else {
      if (contactsList[i].initial != someTtitle) {
        someTtitle = contactsList[i].initial;
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
  contactsState.listMain = someArr;
  //赋值给当前高亮的isActive
  contactsState.isActive = someArr.length > 0 ? someArr[0].id : '';
};
watchEffect(() => {
  getBrands(friendList.value);
});

/* 好友删除逻辑 */
const { fetchContactsListFromServer, removeContactFromServer } = emContacts();
//二次确认&执行删除
const deleteFriend = async (event) => {
  console.log('>>>>执行删除好友', event);
  const { name: delFriendId } = event;
  const res = await uni.showModal({
    title: '确认删除？+ delFriendId',
    confirmText: '删除',
  });
  if (res.confirm) {
    removeContactFromServer(delFriendId);
    updateFriendList();
  }
};
//更新好友列表
const updateFriendList = async () => {
  try {
    const contactsList = await fetchContactsListFromServer();
    contactsStore.setFriendList(contactsList);
  } catch (error) {
    console.log('>>>>>更新好友列表失败', error);
  }
};
/* 搜索联系人 */
const openSearch = () => {
  contactsState.search_btn = false;
  contactsState.search_friend = true;
  contactsState.show_mask = true;
  contactsState.gotop = true;
};
const clearInput = () => {
  contactsState.input_code = '';
  contactsState.show_clear = false;
  cancelSearchContacts();
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    contactsState.show_clear = true;
  } else {
    contactsState.show_clear = false;
    cancelSearchContacts();
  }
};
const cancelSearchContacts = () => {
  contactsState.search_btn = true;
  contactsState.search_friend = false;
  contactsState.gotop = false;
  contactsState.serach_keyword = '';
  getBrands(friendList.value);
};
const onSearchContacts = () => {
  let searchValue = contactsState.serach_keyword;
  let member = friendList.value;
  let serchList = [];
  member.forEach((friendId, index) => {
    if (String(friendId).indexOf(searchValue) > -1) {
      serchList.push(friendId);
    } else if (
      friendUserInfoMap.value.has(friendId) &&
      friendUserInfoMap.value.get(friendId)?.nickname
    ) {
      if (
        friendUserInfoMap.value.get(friendId).nickname.indexOf(searchValue) > -1
      ) {
        serchList.push(friendId);
      }
    }
  });
  getBrands(serchList);
};

/* 该页面进入其他页面跳转方法 */
//进入到聊天页面
const entryemChat = (params) => {
  const chatType = CHAT_TYPE.SINGLE_CHAT;
  uni.navigateTo({
    url: `../emChatContainer/index?targetId=${params.name}&chatType=${chatType}`,
  });
};
const entryInform = () => {
  uni.navigateTo({
    url: '../notification/notification',
  });
};
//进入添加好友页面
const entryAddNewFreiend = () => {
  uni.navigateTo({
    url: '../addNewFriend/addNewFriend',
  });
};
//进入群组页面
const entryGroups = () => {
  uni.navigateTo({
    url: '../groups/groups',
  });
};
const setScrollViewHeight = () => {
  const sys = uni.getSystemInfoSync();
  console.log('>>>>sys', sys);
  contactsState.scrollViewHeight = `${sys.windowHeight - 100}px`;
  //   contactsState.scrollViewHeight = `200px`;
};
onMounted(() => {
  console.log(11111);
  uni.hideHomeButton && uni.hideHomeButton();
  contactsState.isIPX = true;
  setScrollViewHeight();
});
</script>
<style>
@import './contacts.css';
</style>
