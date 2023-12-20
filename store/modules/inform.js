import { INFORM_TYPE } from '@/EaseIM/constant';
const InformStore = {
  state: {
    informData: {
      contactsInform: [],
      groupsInform: [],
    },
  },
  mutations: {
    RESET_INFORM_STORE: (state) => {
      state.informData = {
        contactsInform: [],
        groupsInform: [],
      };
    },
    ADD_NEW_INFORM: (state, payload) => {
      const { informType, inform } = payload;
      inform.time = Date.now();
      if (informType === INFORM_TYPE.CONTACTS) {
        //此类型通知需要按钮处理
        switch (inform.type) {
          case 'subscribe':
            {
              inform.showBtn = true;
              inform.handleText = '';
            }

            break;
          case 'unsubscribed':
            {
              inform.showBtn = false;
              inform.handleText = '好友关系已解除';
            }
            break;
          case 'subscribed': {
            inform.showBtn = false;
            inform.handleText = '好友关系已通过';
          }
          default:
            break;
        }

        inform.isHandled = false;
        state.informData.contactsInform.unshift(inform);
        return;
      }
      if (informType === INFORM_TYPE.GROUPS) {
        if (inform.operation === 'inviteToJoin') {
          inform.showBtn = true;
          inform.handleText = '';
        }
        inform.isHandled = false;
        state.informData.groupsInform.unshift(inform);
        return;
      }
    },
    CHANGE_INFORM: (state, payload) => {
      const { index, informParams } = payload;
      state.informData.contactsInform.splice(index, 1, informParams);
    },
    READED_INFROM: (state, payload) => {
      const { index } = payload;
      state.informData.contactsInform[index].isHandled = true;
    },
  },
  actions: {},
  getters: {
    //获取所有系统通知
    getAllInformsList(state) {
      let allInforms = [];
      allInforms = state.informData.contactsInform.concat(
        state.informData.groupsInform
      );
      return allInforms;
    },
  },
};
export default InformStore;
