import { createSSRApp } from "vue";
import App from "./App.vue";
import i18n from "./locales/index";
import * as Pinia from "pinia";
import IMStore from "@/store/pinia";

export function createApp() {
  const app = createSSRApp(App);
  app.use(IMStore);
  app.use(i18n);
  return {
    app,
    Pinia
  };
}
