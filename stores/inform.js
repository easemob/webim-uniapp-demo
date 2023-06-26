import { defineStore } from 'pinia';
//系统通知
export const useInformStore = defineStore('inform', {
  state: () => {
    return {
      informData: {
        contactsInform: [],
        groupsInform: [],
      },
    };
  },
  getters: {
    //获取所有系统通知
    getAllInformsList() {
      let allInforms = [];
      allInforms = this.informData.contactsInform.concat(
        this.informData.groupsInform
      );
      return allInforms;
    },
  },
  actions: {
    //新增一条系统通知
    addNewInform(informType, inform) {
      inform.time = Date.now();
      if (informType === 'contacts') {
        //此类型通知需要按钮处理
        if (inform.type === 'subscribe') {
          inform.showBtn = true;
          inform.handleText = '';
        }
        inform.isHandled = false;
        this.informData.contactsInform.unshift(inform);
        return;
      }
      if (informType === 'groups') {
        if (inform.operation === 'inviteToJoin') {
          inform.showBtn = true;
          inform.handleText = '';
        }
        inform.isHandled = false;
        this.informData.groupsInform.unshift(inform);
        return;
      }
    },
  },
});
