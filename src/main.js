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

// sessionStorage.setItem("fromData",JSON.stringify(
// 	{fromName:'小文利',
// 		fromContact:'14509897846',
// 		fromProvince:'重庆市',
// 		fromCity:'重庆市',
// 		fromArea:'合川区',
// 		fromDetailAddr:'龙市镇龙头村22组',}
// ));
// sessionStorage.setItem("toData",JSON.stringify(
// 	{toName:'大笨蛋',
// 		toContact:'14509897846',
// 		toProvince:'广东省',
// 		toCity:'广州市',
// 		toArea:'天河区',
// 		toDetailAddr:'东圃大马路',}
// ));