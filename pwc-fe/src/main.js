import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import api from "./api";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
/* read .env for env */
axios.defaults.baseURL = "http://localhost:3000"; // dev
// axios.defaults.baseURL = 'http://47.100.10.198:3005'

Object.defineProperty(Vue.prototype, "$api", { value: api });

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
