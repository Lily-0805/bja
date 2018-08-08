import Vue from 'vue'
import router from './routes/router'
import App from './App'
import store from '@/store/index'
import auth from './utils/auth'
import axios from 'axios'
import service from '@/services/services'
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if(!auth.getToken('customerId')){
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb77b53289e95c9e7&redirect_uri=http://zk302.s1.natapp.cc&response_type=code&scope=snsapi_base#wechat_redirect';

	// service.enter({openid:'fsdfrger'}).then(rs => {
	// 	if(rs.data.retCode=='000100'){
	// 		auth.setToken('customerId',rs.data.customer.customerId);
	// 		location.reload();
	// 	}
	// })
}
var storage=window.localStorage;
var sessionStorage=window.sessionStorage;
