<template>
  <view>
    <!-- 弹出举报入口 -->
    <!-- <uni-popup ref="alertReport">
      <button @click="showSelectReportType">举报</button>
      <button @click="cannelReport">取消</button>
    </uni-popup> -->
    <uv-popup ref="alertReport" mode="bottom" round="10">
      <view class="invite_btn_box">
        <text class="invite_func_btn" @click="showSelectReportType">举报</text>
        <text
          class="invite_func_btn invite_func_btn_cannel"
          @click="cannelReport"
          >取消</text
        >
      </view>
    </uv-popup>
    <!-- 展示举报选项 -->
    <uni-popup ref="selectReportType">
      <button
        v-for="(item, index) in reportTypeList"
        :key="index"
        @click="pickReportType(item)"
      >
        {{ item.text }}
      </button>
      <button type="warn" @click="hideSelectReportType">取消</button>
    </uni-popup>
    <!-- 填写举报原因 -->
    <uni-popup ref="inputReportReason" type="dialog">
      <uni-popup-dialog
        mode="input"
        title="举报原因"
        placeholder="请输入举报原因"
        @confirm="reportMsg"
        @cancel="msglistState.reason = ''"
      >
        <uni-easyinput
          type="textarea"
          v-model="msglistState.reason"
          placeholder="请填写举报内容"
          :maxlength="300"
        ></uni-easyinput>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { emMessages } from '@/EaseIM/imApis';
const { reportMessages } = emMessages();
const reportTypeList = ref([
  {
    text: '涉政',
  },
  {
    text: '涉黄',
  },
  {
    text: '广告',
  },
  {
    text: '辱骂',
  },
  {
    text: '暴恐',
  },
  {
    text: '违禁',
  },
]);
const msglistState = reactive({
  title: '消息举报',
  list: [
    {
      text: '举报',
    },
  ],
  rptMsgId: '', // 举报消息id
  rptType: '', // 举报类型
  reason: '',
});
/* 举报消息 */
//弹出举报
const alertReport = ref(null);
const actionAleartReportMsg = (msgBody) => {
  console.log('>>>>>>开始举报', msgBody);
  if (msgBody.style !== 'self') {
    alertReport.value.open();
    msglistState.showRpt = true;
    msglistState.rptMsgId = msgBody.id;
  }
};
//取消举报
const cannelReport = () => {
  alertReport.value.close();
};

//选择举报类型
const selectReportType = ref(null);
//展示举报类型面板
const showSelectReportType = () => {
  alertReport.value.close();
  selectReportType.value.open('bottom');
};
const pickReportType = (item) => {
  msglistState.rptType = item.text;
  hideSelectReportType();
  actionAleartReportReason(item);
};
const hideSelectReportType = () => {
  selectReportType.value.close();
};
//填写举报原因
const inputReportReason = ref(null);
const actionAleartReportReason = (item) => {
  inputReportReason.value.open();
};

const reportMsg = async () => {
  if (msglistState.reason === '') {
    uni.showToast({ title: '请填写举报原因', icon: 'none' });
    return;
  }
  const reportParams = {
    reportType: msglistState.rptType,
    reportReason: msglistState.reason,
    messageId: msglistState.rptMsgId,
  };
  try {
    await reportMessages({ ...reportParams });
    uni.showToast({ title: '举报成功', icon: 'none' });
  } catch (error) {
    console.log('>>>>举报失败', error);
    uni.showToast({ title: '举报失败', icon: 'none' });
  } finally {
    msglistState.reason = '';
    msglistState.rptType = '';
    msglistState.rptMsgId = '';
  }
};
defineExpose({
  actionAleartReportMsg,
});
</script>

<style lang="scss" scoped>
.invite_btn_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
}
.invite_func_btn {
  height: 55px;
  width: 100%;
  text-align: center;
}
.invite_func_btn_cannel {
  color: red;
  margin-top: 10px;
}
</style>
