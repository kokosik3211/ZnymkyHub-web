import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./assets/sass/main.scss";
import axios from "axios";
import Buefy from "buefy";
import "@mdi/font/css/materialdesignicons.css";
import $ from "jquery";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";
import QuestionHub from "./question-hub";

Vue.use(Buefy, {
  defaultIconPack: "mdi"
});

Vue.use(BootstrapVue);
Vue.use(QuestionHub);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:5000";

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
