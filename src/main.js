import Vue from 'vue'
import router from './routes/router'
import App from './App'
import store from '@/store/index'
import service from '@/services/services'
import auth from './utils/auth'


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//临时用--------------------------
auth.setToken('customerId',221436642358426);
//------------------------------------



/*if(!auth.getToken('customerId')){
	let uri = window.location.href;
	let arr = uri.split('?')
	uri = arr[0];

	let code = GetQuery("code");
	if(code){
		service.enter({code:code}).then(rs => {
			if(rs.data.retCode=='000100'){
				auth.setToken('customerId',rs.data.customer.customerId);
				location.reload();
			}
		})
	}else{
		let appid='wx27359175cad204ca'
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+uri+'&response_type=code&scope=snsapi_base#wechat_redirect';
	}
}*/

//获取地址参数-code
function GetQuery(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var storage=window.localStorage;
var sessionStorage=window.sessionStorage;
