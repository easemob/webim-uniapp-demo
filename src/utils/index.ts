import i18n from "@/locales/index";
export const formatDate = function (date: Date, fmt: string = "") {
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        //@ts-ignore
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export const getTimeStringAutoShort = function (
  timestamp: number,
  mustIncludeTime?: boolean
) {
  // 当前时间
  let currentDate = new Date();
  // 目标判断时间
  let srcDate = new Date(parseInt(timestamp as any));

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDateD = currentDate.getDate();

  let srcYear = srcDate.getFullYear();
  let srcMonth = srcDate.getMonth() + 1;
  let srcDateD = srcDate.getDate();

  let ret = "";

  // 要额外显示的时间分钟
  let timeExtraStr = mustIncludeTime ? " " + formatDate(srcDate, "hh:mm") : "";

  // 当年
  if (currentYear == srcYear) {
    let currentTimestamp = currentDate.getTime();
    let srcTimestamp = timestamp;
    // 相差时间（单位：毫秒）
    let deltaTime = currentTimestamp - srcTimestamp;

    // 当天（月份和日期一致才是）
    if (currentMonth == srcMonth && currentDateD == srcDateD) {
      // 时间相差60秒以内
      if (deltaTime < 60 * 1000) ret = i18n.global.t("justNow");
      // 否则当天其它时间段的，直接显示“时:分”的形式
      else ret = formatDate(srcDate, "hh:mm");
    }
    // 当年 && 当天之外的时间（即昨天及以前的时间）
    else {
      // 昨天（以“现在”的时候为基准-1天）
      let yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      // 前天（以“现在”的时候为基准-2天）
      let beforeYesterdayDate = new Date();
      beforeYesterdayDate.setDate(beforeYesterdayDate.getDate() - 2);

      // 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值
      // 的形式，是不准确的，比如：现在时刻是2019年02月22日1:00、而srcDate是2019年02月21日23:00，
      // 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，就完全是扯蛋的逻辑了）
      if (
        srcMonth == yesterdayDate.getMonth() + 1 &&
        srcDateD == yesterdayDate.getDate()
      )
        ret = i18n.global.t("yesterday") + timeExtraStr; // -1d
      // “前天”判断逻辑同上
      else if (
        srcMonth == beforeYesterdayDate.getMonth() + 1 &&
        srcDateD == beforeYesterdayDate.getDate()
      )
        ret = i18n.global.t("beforeYesterday") + timeExtraStr; // -2d
      else {
        // 跟当前时间相差的小时数
        let deltaHour = deltaTime / (3600 * 1000);

        // 如果小于或等 7*24小时就显示星期几
        if (deltaHour <= 7 * 24) {
          let weekday = new Array(7);
          weekday[0] = i18n.global.t("sunday");
          weekday[1] = i18n.global.t("monday");
          weekday[2] = i18n.global.t("tuesday");
          weekday[3] = i18n.global.t("wednesday");
          weekday[4] = i18n.global.t("thursday");
          weekday[5] = i18n.global.t("friday");
          weekday[6] = i18n.global.t("saturday");

          // 取出当前是星期几
          let weedayDesc = weekday[srcDate.getDay()];
          ret = weedayDesc + timeExtraStr;
        }
        // 否则直接显示完整日期时间
        else ret = formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
      }
    }
  }
  // 往年
  else {
    ret = formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
  }

  return ret;
};

export const isSafari = () => {
  return navigator?.userAgent?.toLowerCase().indexOf("safari") > -1;
};

export const isiOS = () => {
  return /iPad|iPhone|iPod/.test(navigator?.userAgent);
};

export const isWechat = () => {
 return navigator?.userAgent?.toLowerCase().indexOf("micromessenger") !== -1;
};

type CallbackFunction = (...args: any[]) => void;

export function throttle(
  func: CallbackFunction,
  limit: number
): CallbackFunction {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number | undefined;

  return function (this: any, ...args: any[]) {
    const context = this;

    if (!lastRan) {
      lastRan = Date.now();
      lastFunc = setTimeout(function () {
        func.apply(context, args);
        lastRan = undefined;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan! >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
