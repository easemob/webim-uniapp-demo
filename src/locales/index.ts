import en from "./en";
import zhHans from "./zh-Hans";
import { createI18n } from "vue-i18n"; // v9.x

const messages = {
  en,
  "zh-Hans": zhHans
};

let i18nConfig = {
  legacy: false,
  locale: uni.getLocale() || "en", // 获取已设置的语言
  messages,
  globalInjection: true
};

const i18n = createI18n(i18nConfig);

export { messages, i18nConfig };

export default i18n;
