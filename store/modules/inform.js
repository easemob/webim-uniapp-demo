const InformStore = {
  state: {
    informData: {
      contactsInform: [],
      groupsInform: [],
    },
  },
  mutations: {
    ADD_NEW_INFORM: (state, payload) => {
      const { informType, inform } = payload;
      inform.time = Date.now();
      if (informType === 'contacts') {
        //此类型通知需要按钮处理
        if (inform.type === 'subscribe') {
          inform.showBtn = true;
          inform.handleText = '';
        }
        inform.isHandled = false;
        state.informData.contactsInform.unshift(inform);
        return;
      }
      if (informType === 'groups') {
        if (inform.operation === 'inviteToJoin') {
          inform.showBtn = true;
          inform.handleText = '';
        }
        inform.isHandled = false;
        state.informData.groupsInform.unshift(inform);
        return;
      }
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
