<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useChatStore } from "@/store/chat";
import { CHAT_STORE } from "@/const/index";
// 引入conn文件，初始化IM，不可删除
import conn from "./initIM";

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
  autoLogin();
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import url("./common.scss");
</style>
