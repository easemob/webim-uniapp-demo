const MessageStore = {
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {},
  },
  getters: {},
};
export default MessageStore;
