import * as emoji from './emoji';
export { emoji };
//群成员页面为复用页面，定义三种展示形态
export const GROUP_MEMEBERS_SHOW_TYPE = {
  READ_ONLY: 1, //只读
  TRANSFER_OWNER: 2, //转让群主
  ADD_NEW_MEMBER: 3, //新增群成员
  DEL_MEMBER: 4, //删除群成员
};
//个人信息编辑类型
export const PERSONAL_INFO_EDIT_TYPE = {
  NICKNAME: 1,
  SIGN: 2,
};
//uni.$emit 事件名称
export const EVENT_BUS_NAME = {
  EASEIM_MESSAGE_COLLECTION_UPDATE: 'easeim-message-collection-update',
  EASEIM_MESSAGE_COLLECTION_DELETE: 'easeim-message-collection-delete',
  EASEIM_MESSAGE_COLLECTION_MODIFY: 'easeim-message-collection-modify',
};
/* 录音相关 */
export const RECORD_STATUS = {
  SHOW: 0,
  HIDE: 1,
  HOLD: 2,
  SWIPE: 3,
  RELEASE: 4,
};
export const RECOED_DESC = {
  0: '长按开始录音',
  2: '向上滑动取消',
  3: '松开手取消',
};
