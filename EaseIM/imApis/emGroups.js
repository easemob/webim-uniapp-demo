import { EMClient } from '@/EaseIM';
const emGroups = () => {
  const fetchJoinedGroupListFromServer = () => {
    return new Promise((resolve, reject) => {
      console.log('>>>>开始获取加入的群组列表');
      EMClient.getGroup({
        limit: 100,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const createNewGroup = (params) => {
    return new Promise((resolve, reject) => {
      console.log('>>>>开始创建群组');
      EMClient.createGroup({ data: { ...params } })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getGroupInfosFromServer = (groupId) => {
    return new Promise((resolve, reject) => {
      EMClient.getGroupInfo({
        groupId,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getGroupMembersFromServer = (groupId) => {
    //暂且仅取前100个群成员
    const pageNum = 1,
      pageSize = 100;
    return new Promise((resolve, reject) => {
      EMClient.listGroupMembers({
        pageNum: pageNum,
        pageSize: pageSize,
        groupId,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const inviteUsersToGroup = (groupId, memberIdList) => {
    return new Promise((resolve, reject) => {
      EMClient.inviteUsersToGroup({
        groupId: groupId,
        users: memberIdList,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const leaveGroupFromServer = (groupId) => {
    return new Promise((resolve, reject) => {
      EMClient.leaveGroup({ groupId })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const destroyGroupFromServer = (groupId) => {
    return new Promise((resolve, reject) => {
      EMClient.destroyGroup({ groupId })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const acceptGroupInvite = (invitee, groupId) => {
    return new Promise((resolve, reject) => {
      EMClient.acceptGroupInvite({
        groupId: groupId,
        invitee: invitee,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const rejectGroupInvite = (invitee, groupId) => {
    return new Promise((resolve, reject) => {
      EMClient.rejectGroupInvite({
        groupId: groupId,
        invitee: invitee,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    fetchJoinedGroupListFromServer,
    createNewGroup,
    getGroupInfosFromServer,
    getGroupMembersFromServer,
    inviteUsersToGroup,
    leaveGroupFromServer,
    destroyGroupFromServer,
    acceptGroupInvite,
    rejectGroupInvite,
  };
};

export default emGroups;
