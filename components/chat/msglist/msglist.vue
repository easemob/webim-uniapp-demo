<template>
  <view
    scroll-y="true"
    :class="view + ' wrap ' + (isIPX?'scroll_view_X': '')"
    @tap="onTap"
    upper-threshold="-50"
    :scroll-into-view="toView"
  >
  <view>
    <u-modal v-model="show" title="消息举报" ref="uModal" confirm-text="举报" :async-close="true" @confirm="reportMsg" >
      <view class="slot-content">
         <u-field
            v-model="reason"
            label="举报原因"
            placeholder="请填写举报原因"
            type="textarea"
            :auto-height="false"
            :clearable="false"
            maxlength="100"
		      >
		    </u-field>
			</view>
    </u-modal>
		<u-action-sheet :list="list" @click="onMenuClick" v-model="showRpt"></u-action-sheet>
		<u-action-sheet :list="typeList" @click="onReportTypeClick" v-model="showRptType"></u-action-sheet>
	</view>
	<view class="tips">本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！</view>
    <view @longtap="onMsgTap(item)" class="message" v-for="item in chatMsg" :key="item.mid" :id="item.mid">
      <!-- <view class="time">
				<text class="time-text">{{ item.time }}</text>
      </view>-->
      <view class="main" :class="item.style">
        <view class="user">
          <!-- yourname：就是消息的 from -->
          <text v-if="!item.style" class="user-text">{{ showMessageListNickname(item.yourname) + ' ' + handleTime(item)}}</text>
        </view>
        <image class="avatar" :src="showMessageListAvatar(item)" />
        <view class="msg">
          <image
            class="err"
            :class="(item.style == 'self' && item.isFail) ?  'show' : 'hide'"
            src="/static/images/msgerr.png"
          />

          <image
            v-if="item.style == 'self'"
            src="/static/images/poprightarrow2x.png"
            class="msg_poprightarrow"
          />
          <image
            v-if="item.style == ''"
            src="/static/images/popleftarrow2x.png"
            class="msg_popleftarrow"
          />
          <view v-if="item.msg.type == 'img' || item.msg.type == 'video'">
            <image
              v-if="item.msg.type == 'img'"
              class="avatar"
              :src="item.msg.data"
              style="width:90px; height:120px; margin:2px auto;"
              mode="aspectFit"
              @tap="previewImage"
              :data-url="item.msg.data"
            />
            <video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/>
          </view>
          <audio-msg v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>
          <file-msg v-if="item.msg.type == 'file'" :msg="item"></file-msg>
          <view v-else-if="item.msg.type == 'txt' || item.msg.type == 'emoji'">
            <view class="template" v-for="(d_item, d_index) in item.msg.data" :key="d_index">
              <text
                :data-msg="item"
                @tap="clickMsg"
                v-if="d_item.type == 'txt'"
                class="msg-text"
                style="float:left;"
                selectable="true"
              >{{ d_item.data }}</text>

              <image
                v-if="d_item.type == 'emoji'"
                class="avatar"
                :src="'/static/images/faces/' + d_item.data"
                style="width:25px; height:25px; margin:0 0 2px 0; float:left;"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- <view style="height: 1px;"></view> -->
</template>


<script>
let msgStorage = require("../msgstorage");
let disp = require("../../../utils/broadcast");
let LIST_STATUS = {
  SHORT: "scroll_view_change",
  NORMAL: "scroll_view"
};
let page = 0;
let Index = 0;
let curMsgMid = '';
let isFail = false;
import audioMsg from "./type/audio/audio";
import fileMsg from "./type/file";
let WebIM = require("../../../utils/WebIM")["default"];
export default {
  data() {
    return {
      view: LIST_STATUS.NORMAL,
      toView: "",
      chatMsg: [],
      __visibility__: false,
      isIPX: false,
      title:'消息举报',
			list: [{
					text: '举报'
			}],
      show: false,
			showRpt: false,
      showRptType: false,
      rptMsgId: '', // 举报消息id
      rptType: '', // 举报类型
      reason: '',
      typeList: [
        {
          text: "涉政"
        },
        {
          text: "涉黄"
        },
        {
          text: "广告"
        },
        {
          text: "辱骂"
        },
        {
          text: "暴恐"
        },
        {
          text: "违禁"
        }
      ],
      defaultAvatar: "/static/images/theme2x.png",
      defaultGroupAvatar: "/static/images/groupTheme.png"
    };
  },

  components: {
    audioMsg,
    fileMsg
  },
  props: {
    username: {
      type: Object,
      default: () => ({})
    }
  },

  // lifetimes
  created() {},

  beforeMount() {
    this.__visibility__ = true;
    page = 0;
    Index = 0;
  },

  moved() {},

  destroyed() {
    this.__visibility__ = false;
	msgStorage.off("newChatMsg", this.dispMsg)
  },

  mounted(event) {

    let me = this;
    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
	
	  this.username = uni.username;
    let username = this.username;
    let myUsername = uni.getStorageSync("myUsername");
    let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
    let chatMsg = uni.getStorageSync(sessionKey) || [];
    this.renderMsg(null, null, chatMsg, sessionKey);
    uni.setStorageSync(sessionKey, null);
    disp.on('em.error.sendMsgErr', function (err) {
      // curMsgMid = err.data.mid;
      isFail = true;
      // return;
      console.log('发送失败了');
	  return;
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      // if (me.curChatMsg[0].mid == curMsgMid) {
      //   me.curChatMsg[0].msg.data[0].isShow = false;
      //   me.curChatMsg[0].isShow = false;
      // }

      uni.setStorageSync("rendered_" + sessionKey, msgList);
    });
    msgStorage.on("newChatMsg", this.dispMsg);
  },
  computed:{
    //消息列表头像展示
    showMessageListAvatar() {
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      const myUserInfos = getApp().globalData.userInfoFromServer;
      return (item)=>{
        if(!item.style){
            if(friendUserInfoMap.has(item.username) && friendUserInfoMap.get(item.username)?.avatarurl){
                return friendUserInfoMap.get(item.username).avatarurl
            }else{
                return this.defaultAvatar
            }
        }else{
            if(myUserInfos?.avatarurl){
                return myUserInfos.avatarurl
            }else{
                return this.defaultAvatar
            }
        }
        
      }
    },
    //消息列表昵称显示
    showMessageListNickname(){
        const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
        return (hxId)=>{
            if(friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.nickname){
                return friendUserInfoMap.get(hxId).nickname
            }else{
                return hxId
            }
            
        }
    },
    //处理时间显示
    handleTime() {
        return (item) => {
            return this.$u.timeFormat(item.time, 'mm/dd/hh:MM')
        }
    }
  },
  methods: {
    normalScroll() {
      this.setData({
        view: LIST_STATUS.NORMAL
      });
    },
	dispMsg(renderableMsg, type, curChatMsg, sesskey) {
	  let me = this;
	  let username = this.username;
	  let myUsername = uni.getStorageSync("myUsername");
	  let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
	  me.curChatMsg = curChatMsg;
	  
	  if (!me.__visibility__) return; // 判断是否属于当前会话
	
	  if (username.groupId) {
	    // 群消息的 to 是 id，from 是 name
	    if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
	      if (sesskey == sessionKey) {
	        me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
	      }
	    }
	  } else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
	    if (sesskey == sessionKey) {
	      me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
	    }
	  }
	},
    onInput(e){
      this.setData({
        reason: e.target.value
      })
    },
    shortScroll() {
      this.setData({
        view: LIST_STATUS.SHORT
      });
    },

    onTap() {
      this.$emit("msglistTap", null, {
        bubbles: true
      });
    },

    onMsgTap(item){
      // 别人发的消息
      if(item.style !== 'self'){
        this.setData({
          showRpt: true,
          rptMsgId: item.id
        })
      }
    },

    onMenuClick(idx){
      if(idx === 0){
        this.setData({
          showRptType: true
        })
      }
    },

    reportMsg(){
      let that = this
      if(this.reason === ''){
        this.$refs.uModal.clearLoading();
        uni.showToast({title: "请填写举报原因",icon:'none'});
        return false
      }
      WebIM.conn
        .reportMessage({
          reportType: that.rptType, // 举报类型
          reportReason: that.reason, // 举报原因。
          messageId: that.rptMsgId // 上报消息id
        })
        .then(() => {
          uni.showToast({title: "举报成功",icon:'none'});
        })
        .catch((e) => {
           uni.showToast({title: "举报失败",icon:'none'});
        }).finally(() => {
            that.setData({
              reason: '',
              rptType: '',
              rptMsgId: '',
              show: false
            })
        });
    },

    onReportTypeClick(idx){
      // 设置举报类型
      this.setData({
        rptType: this.typeList[idx].text,
        show: true
      })
    },
    

    previewImage(event) {
      var url = event.target.dataset.url;
      uni.previewImage({
        urls: [url] // 需要预览的图片 http 链接列表
      });
    },

    getHistoryMsg() {
      let me = this;
      let username = this.username;
      let myUsername = uni.getStorageSync("myUsername");
      let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
      let historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];

      if (Index < historyChatMsgs.length) {
        let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
        this.setData({
          chatMsg: timesMsgList.concat(me.chatMsg),
          toView: timesMsgList[timesMsgList.length - 1].mid
        });
        Index += timesMsgList.length;

        if (timesMsgList.length == 10) {
          page++;
        }

        uni.stopPullDownRefresh();
      }
    },

    renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew) {
      let me = this;

      var historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || []; 

      historyChatMsgs = historyChatMsgs.concat(curChatMsg); 

      if (!historyChatMsgs.length) return;

      if (isnew == 'newMsg') {
        this.setData({
          chatMsg: this.chatMsg.concat(curChatMsg),
          // 跳到最后一条
          toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        });
      } else {
        this.setData({
          chatMsg: historyChatMsgs.slice(-10),
          // 跳到最后一条
          toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        });
      }

      uni.setStorageSync("rendered_" + sessionKey, historyChatMsgs);
      let chatMsg = uni.getStorageSync(sessionKey) || [];
      chatMsg.map(function (item, index) {
        curChatMsg.map(function (item2, index2) {
          if (item2.mid == item.mid) {
            chatMsg.splice(index, 1);
          }
        });
      });
      uni.setStorageSync(sessionKey, chatMsg);
      Index = historyChatMsgs.slice(-10).length;
	  // setTimeout 兼容支付宝小程序
	  setTimeout(() => {
		  uni.pageScrollTo({
		    scrollTop: 5000,
		    duration: 300,
		  		fail: (e) => {
		  			//console.log('滚失败了', e)
		  		}
		  });
	  }, 100)
      
      if (isFail) {
        this.renderFail(sessionKey);
      }
    },

    renderFail(sessionKey) {
      let me = this;
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      if (me.curChatMsg[0].mid == curMsgMid) {
        me.curChatMsg[0].msg.data[0].isShow = false;
        me.curChatMsg[0].isShow = false;
      }

      uni.setStorageSync("rendered_" + sessionKey, msgList);
      isFail = false;
    },
	
	clickMsg(event){
		if(typeof(event.target.dataset.msg) == 'object' && 
			event.target.dataset.msg.msg.ext && 
			event.target.dataset.msg.msg.ext.msg_extension){
			this.$emit("clickMsg", event.target.dataset.msg.msg.ext)
		}
	}

  }
};
</script>
<style>
@import "./msglist.css";
</style>