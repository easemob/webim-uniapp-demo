// Android权限查询
const requestAndroidPermission = (permissionID) => {
  return new Promise((resolve, reject) => {
    plus.android.requestPermissions(
      [permissionID], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
      function (resultObj) {
        var result = 0;
        for (var i = 0; i < resultObj.granted.length; i++) {
          var grantedPermission = resultObj.granted[i];
          console.log('已获取的权限：' + grantedPermission);
          result = 1;
        }
        for (var i = 0; i < resultObj.deniedPresent.length; i++) {
          var deniedPresentPermission = resultObj.deniedPresent[i];
          console.log('拒绝本次申请的权限：' + deniedPresentPermission);
          result = 0;
        }
        for (var i = 0; i < resultObj.deniedAlways.length; i++) {
          var deniedAlwaysPermission = resultObj.deniedAlways[i];
          console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
          result = -1;
        }
        resolve(result);
        // 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
        // if (result != 1) {
        // gotoAppPermissionSetting()
        // }
      },
      function (error) {
        console.log('申请权限错误：' + error.code + ' = ' + error.message);
        resolve({
          code: error.code,
          message: error.message,
        });
      }
    );
  });
};

export { requestAndroidPermission };
