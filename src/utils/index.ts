import i18n from "@/locales/index";
import { emojiAltMap, emoji } from "@/const/emoji";
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

// 格式化文本消息， 将输入框文本消息中的表情符号转换为对应的emoji,进行发送
export function formatTextMessage(txt: string): string {
  if (txt === undefined) {
    return "";
  }
  let rnTxt = "";
  let match = null;
  const regex = /(\[.*?\])/g;
  let start = 0;
  let index = 0;
  while ((match = regex.exec(txt))) {
    index = match.index;
    if (index > start) {
      rnTxt += txt.substring(start, index);
    }
    if (match[1] in emojiAltMap) {
      //@ts-ignore
      rnTxt += emojiAltMap[match[1]];
    } else {
      rnTxt += match[1];
    }
    start = index + match[1].length;
  }
  rnTxt += txt.substring(start, txt.length);
  return rnTxt;
}

export function formatHtmlString(str: string): string {
  return str?.replace(/[\u00A0-\u9999<>]/gim, (i) =>
    //@ts-ignore
    "".concat("&#", i.charCodeAt(0), ";")
  );
}

export const renderTxt = (txt: string | undefined | null) => {
  if (txt === undefined || txt === null) {
    return [];
  }
  let rnTxt: any[] = [];
  let match;
  const regex =
    /(U\+1F600|U\+1F604|U\+1F609|U\+1F62E|U\+1F92A|U\+1F60E|U\+1F971|U\+1F974|U\+263A|U\+1F641|U\+1F62D|U\+1F610|U\+1F607|U\+1F62C|U\+1F913|U\+1F633|U\+1F973|U\+1F620|U\+1F644|U\+1F910|U\+1F97A|U\+1F928|U\+1F62B|U\+1F637|U\+1F912|U\+1F631|U\+1F618|U\+1F60D|U\+1F922|U\+1F47F|U\+1F92C|U\+1F621|U\+1F44D|U\+1F44E|U\+1F44F|U\+1F64C|U\+1F91D|U\+1F64F|U\+2764|U\+1F494|U\+1F495|U\+1F4A9|U\+1F48B|U\+2600|U\+1F31C|U\+1F308|U\+2B50|U\+1F31F|U\+1F389|U\+1F490|U\+1F382|U\+1F381|😀|😄|😉|😮|🤪|😎|🥱|🥴|☺|🙁|😭|😐|😇|😬|🤓|😳|🥳|😠|🙄|🤐|🥺|🤨|😫|😷|🤒|😱|😘|😍|🤢|👿|🤬|😡|👍|👎|👏|🙌|🤝|🙏|❤️|💔|💕|💩|💋|☀️|🌜|🌈|⭐|🌟|🎉|💐|🎂|🎁)/g;
  let start = 0;
  let index = 0;
  while ((match = regex.exec(txt))) {
    index = match.index;
    if (index > start) {
      rnTxt.push({
        type: "text",
        value: txt.substring(start, index)
      });
    }
    if (match[1] in emoji.map) {
      const v = emoji.map[match[1] as keyof typeof emoji.map];
      rnTxt.push({
        type: "emoji",
        value: v.url
      });
    } else {
      rnTxt.push({
        type: "text",
        value: match[1]
      });
    }
    start = index + match[1].length;
  }

  rnTxt.push({
    type: "text",
    value: txt.substring(start, txt.length)
  });
  return rnTxt;
};
