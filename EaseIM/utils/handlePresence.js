const handleStatusDetails = (params) => {
  let resultArr = [];

  if (Array.isArray(params)) {
    resultArr = [...params];
    return resultArr;
  }

  if (params instanceof Object) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const status = params[key];
        resultArr.push({ device: key, status: Number(status) });
      }
    }
  }

  return resultArr;
};

export default function (statusBody) {
  return {
    uid: statusBody.uid || statusBody.userId,
    expiry: statusBody.expiry || statusBody.expire,
    lastTime: statusBody.lastTime || statusBody.last_time,
    statusDetails: handleStatusDetails(
      statusBody.status || statusBody.statusDetails
    ),

    ext: statusBody.ext,
  };
}
