import { defineStore } from "pinia";
import { ref } from "vue";
import { useConnStore } from "./conn";
import type { EasemobChat } from "easemob-websdk";

export const useAppUserStore = defineStore("appUser", () => {
  const appUserInfo = ref<Map<string, EasemobChat.UpdateOwnUserInfoParams>>(
    new Map()
  );

  const conn = useConnStore().getChatConn();

  const getUsersInfo = (props: {
    userIdList: string[];
    withPresence?: boolean;
  }) => {
    const { userIdList = [], withPresence = true } = props;
    return new Promise((resolve, reject) => {
      const type = [
        "nickname",
        "avatarurl",
        "mail",
        "phone",
        "gender",
        "sign",
        "birth",
        "ext"
      ] as EasemobChat.ConfigurableKey[];
      if (userIdList.length === 0) {
        resolve({});
        return;
      }
      const fetchUserIds = userIdList.filter((userId) => {
        return !appUserInfo.value.has(userId);
      });

      if (fetchUserIds.length === 0) {
        resolve({});
        return;
      }

      conn
        .fetchUserInfoById(fetchUserIds, type)
        .then((res) => {
          res.data &&
            Object.keys(res.data).forEach((key) => {
              const result = res.data?.[key] || {};
              appUserInfo.value.set(key, result);
            });

          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  type UpdateUserInfoParams = Parameters<typeof conn.updateUserInfo>[0];

  /** 更新用户信息 */
  const updateUserInfo = (params: UpdateUserInfoParams) => {
    return conn.updateUserInfo(params).then((res) => {
      appUserInfo.value.set(conn.user, res.data || {});
      return res;
    });
  };

  /** 从Store中获取用户信息 */
  const getUserInfoFromStore = (userId: string) => {
    const userInfo = appUserInfo.value.get(userId);
    return {
      name: userInfo?.nickname || userId,
      nickname: userInfo?.nickname,
      avatar: userInfo?.avatarurl || "",
      sign: userInfo?.sign || ""
    };
  };

  const getSelfUserInfo = () => {
    return getUserInfoFromStore(conn.user);
  };

  const clear = () => {
    appUserInfo.value.clear();
  };

  return {
    appUserInfo,
    getUserInfoFromStore,
    getUsersInfo,
    updateUserInfo,
    getSelfUserInfo,
    clear
  };
});
