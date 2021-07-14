import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import api from './api'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://172.30.179.22:3000'
Object.defineProperty(Vue.prototype, '$api', { value: api })

new Vue({
  render: h => h(App),
}).$mount('#app')
