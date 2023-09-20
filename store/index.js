// 页面路径：store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); //vue的插件机制
import ConversationStore from './modules/conversation';
import MessageStore from './modules/message';
//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    //存放状态
    username: 'foo',
    age: 18,
  },
  modules: {
    ConversationStore,
    MessageStore,
  },
});
export default store;
