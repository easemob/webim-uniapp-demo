<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useChatStore } from "@/store/chat";
import { CHAT_STORE } from "@/const/index";
// 引入conn文件，初始化IM，不可删除
import conn from "./initIM";

// #ifdef APP-PLUS
const EMPushUniPlugin = uni.requireNativePlugin("EMPushUniPlugin");

// 注册推送插件
conn.usePlugin(
  {
    //@ts-ignore
    emPush: EMPushUniPlugin,
    config: {
      MICertificateName: "XXXXX", // 小米推送证书名称
      OPPOCertificateName: "XXXXX", // oppo推送证书名称
      HMSCertificateName: "XXXXX", // 华为推送证书名称
      VIVOCertificateName: "XXXXX", // vivo推送证书名称
      HONORCertificateName: "XXXXX", // 荣耀推送证书名称
      MEIZUCertificateName: "XXXXX", // 魅族推送证书名称
      APNsCertificateName: "XXXXX" // APNs推送证书名称
    }
  },
  "push" // 为固定名称
);
// #endif

const autoLogin = async () => {
  try {
    let res = await uni.getStorage({
      key: CHAT_STORE
    });
    // 如果存在缓存，直接登录
    if (res.data) {
      // 跳转会话列表页面
      uni.switchTab({
        url: "/pages/ConversationList/index"
      });
      const { userId, token } = res.data;
      await useChatStore().login({
        user: userId,
        accessToken: token
      });
    }
  } catch (error) {
    uni.redirectTo({
      url: "/pages/Login/index"
    });
    console.log(error, "error");
  }
};

onLaunch(() => {
  console.log("App Launch");
  // #ifdef APP-PLUS
  // 初始化推送插件
  EMPushUniPlugin.initPushModule();
  // #endif
  autoLogin();
});

onShow(() => {
  console.log("App Show");
  // sdk 内部处理从后台返回应用时的重连
  conn.onShow();
});

onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import url("./common.scss");
</style>
