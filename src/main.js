import Vue from 'vue'
import router from './routes/router'
import App from './App'
import store from '@/store/index'

import axios from 'axios'

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





var storage=window.localStorage;
var sessionStorage=window.sessionStorage;
