import { EMClient } from '../index';
import { HANDLER_EVENT_NAME } from '../constant';
import { useInformStore } from '@/stores/inform';
export const emGroupListener = (callback, listenerEventName) => {
  const informStore = useInformStore();
  console.log('>>>>群组事件监听挂载');
  const groupListenFunc = {
    onGroupEvent: (event) => {
      console.log('>>>>群组事件监听触发', event);
      const { operation } = event;
      callback(HANDLER_EVENT_NAME.GROUP_EVENT, event);
      switch (operation) {
        // 有新群组创建。群主的其他设备会收到该回调。
        case 'create':
          break;
        // 关闭群组一键禁言。群组所有成员（除操作者外）会收到该回调。
        case 'unmuteAllMembers':
          break;
        // 开启群组一键禁言。群组所有成员（除操作者外）会收到该回调。
        case 'muteAllMembers':
          break;
        // 有成员从群白名单中移出。被移出的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'removeAllowlistMember':
          break;
        // 有成员添加至群白名单。被添加的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'addUserToAllowlist':
          break;
        // 删除群共享文件。群组所有成员会收到该回调。
        case 'deleteFile':
          break;
        // 上传群共享文件。群组所有成员会收到该回调。
        case 'uploadFile':
          break;
        // 删除群公告。群组所有成员会收到该回调。
        case 'deleteAnnouncement':
          break;
        // 更新群公告。群组所有成员会收到该回调。
        case 'updateAnnouncement':
          break;
        // 更新群组信息，如群组名称和群组描述。群组所有成员会收到该回调。
        case 'updateInfo':
          break;
        // 有成员被移出禁言列表。被解除禁言的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'unmuteMember':
          break;
        // 有群组成员被加入禁言列表。被禁言的成员及群主和群管理员（除操作者外）会收到该回调。
        case 'muteMember':
          break;
        // 有管理员被移出管理员列表。群主、被移除的管理员和其他管理员会收到该回调。
        case 'removeAdmin':
          break;
        // 设置管理员。群主、新管理员和其他管理员会收到该回调。
        case 'setAdmin':
          break;
        // 转让群组。原群主和新群主会收到该回调。
        case 'changeOwner':
          break;
        // 群组所有者和管理员拉用户进群时，无需用户确认时会触发该回调。被拉进群的用户会收到该回调。
        case 'directJoined':
          break;
        // 群成员主动退出群组。除了退群的成员，其他群成员会收到该回调。
        case 'memberAbsence':
          break;
        // 有用户加入群组。除了新成员，其他群成员会收到该回调。
        case 'memberPresence':
          break;
        // 用户被移出群组。被踢出群组的成员会收到该回调。
        case 'removeMember':
          break;
        // 当前用户的入群邀请被拒绝。邀请人会收到该回调。例如，用户 B 拒绝了用户 A 的入群邀请，用户 A 会收到该回调。
        case 'rejectInvite':
          break;
        // 当前用户的入群邀请被接受。邀请人会收到该回调。例如，用户 B 接受了用户 A 的入群邀请，则用户 A 会收到该回调。
        case 'acceptInvite':
          break;
        // 当前用户收到了入群邀请。受邀用户会收到该回调。例如，用户 B 邀请用户 A 入群，则用户 A 会收到该回调。
        case 'inviteToJoin':
          {
            const groupsInform = Object.assign({}, event);
            informStore.addNewInform('groups', groupsInform);
          }

          break;
        // 当前用户的入群申请被拒绝。申请人会收到该回调。例如，用户 B 拒绝用户 A 的入群申请后，用户 A 会收到该回调。
        case 'joinPublicGroupDeclined':
          break;
        // 当前用户的入群申请被接受。申请人会收到该回调。例如，用户 B 接受用户 A 的入群申请后，用户 A 会收到该回调。
        case 'acceptRequest':
          break;
        // 当前用户发送入群申请。群主和群管理员会收到该回调。
        case 'requestToJoin':
          break;
        // 群组被解散。群主解散群组时，所有群成员均会收到该回调。
        case 'destroy':
          break;
        // 设置群成员的自定义属性。群组内其他成员均会收到该回调。
        case 'memberAttributesUpdate':
          break;
        default:
          break;
      }
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.GROUP_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.GROUP_EVENT,
    groupListenFunc
  );
};
