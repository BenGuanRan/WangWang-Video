import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/assets/elment_ui_style/theme/index.css";
import "@/assets/global.css";
import VideoPlayer from "vue-video-player";
import axios from "axios";
import echarts from "echarts";
Vue.prototype.$EventBus = new Vue() // 引入事件总线
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  model: "history",
  render: (h) => h(App),
}).$mount("#app");
