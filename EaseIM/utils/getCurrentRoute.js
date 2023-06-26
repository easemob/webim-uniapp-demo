//通过uni-app提供的方法调用getCurrentPages 获取当前页面路由url
const getCurrentRoute = () => {
  let pages = getCurrentPages();
  if (pages.length > 0) {
    let currentPage = pages[pages.length - 1];
    return currentPage.route;
  }
  return '/';
};

export default getCurrentRoute;
