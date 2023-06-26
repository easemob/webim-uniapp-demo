import { emContactsListener } from './emContactsListener';
import { emGroupListener } from './emGroupListener';
import { emMessagesListener } from './emMessagesListener';
import { emErrorListener } from './emErrorListener';
export const emMountGlobalListener = (cb) => {
  if (typeof cb === 'function') {
    // 参数是一个函数
    emMessagesListener(cb);
    emContactsListener(cb);
    emGroupListener(cb);
    emErrorListener(cb);
  } else {
    // 参数不是一个函数
    console.error('传入的参数不是一个函数');
  }
  console.log('>>>>全局监听');
};
