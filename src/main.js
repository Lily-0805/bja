import Vue from 'vue'
import router from './routes/router'
import App from './App'
import store from '@/store/index'
import auth from './utils/auth'
import service from '@/services/services'
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if(!auth.getToken('customerId')){
	service.enter({openid:'fsdfrger'}).then(rs => {
		if(rs.data.retCode=='000100'){
			auth.setToken('customerId',rs.data.customer.customerId)
		}
	})
}
var storage=window.localStorage;
var sessionStorage=window.sessionStorage;
