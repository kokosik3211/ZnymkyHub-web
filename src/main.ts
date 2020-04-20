import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./assets/sass/main.scss";
import axios from "axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "bulma-extensions/dist/css/bulma-extensions.min.css";
import "@mdi/font/css/materialdesignicons.css";
import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.css";
import QuestionHub from "./question-hub";
import "bulma-helpers/css/bulma-helpers.min.css";
import { baseUrl } from "./constants";

Vue.use(Buefy, {
  defaultIconPack: "mdi"
});

Vue.use(QuestionHub);

Vue.config.productionTip = false;

axios.defaults.baseURL = baseUrl;

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

axios.interceptors.request.use(
  (config: any) => {
    const authToken = store.getters["auth/authToken"];
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);
