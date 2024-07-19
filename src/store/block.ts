import { defineStore } from "pinia";
import { ref } from "vue";
import { useConnStore } from "./conn";

export const useBlockStore = defineStore("block", () => {
  const blockList = ref<string[]>([]);
  const conn = useConnStore().getChatConn();

  /** 获取黑名单列表 */
  const getBlockList = () => {
    conn.getBlocklist().then((res) => {
      blockList.value = res.data || [];
    });
  };

  /** 将用户加入黑名单 */
  const blockUser = (userId: string) => {
    return conn
      .addUsersToBlocklist({
        name: userId
      })
      .then((res) => {
        blockList.value.unshift(userId);
        return res;
      });
  };
  /** 将用户移除黑名单 */
  const unBlockUser = (userId: string) => {
    return conn
      .removeUserFromBlocklist({
        name: userId
      })
      .then((res) => {
        const index = blockList.value.findIndex((item) => item === userId);
        if (index !== -1) {
          blockList.value.splice(index, 1);
        }
        return res;
      });
  };

  const clear = () => {
    blockList.value = [];
  };

  return {
    blockList,
    blockUser,
    unBlockUser,
    getBlockList,
    clear
  };
});
