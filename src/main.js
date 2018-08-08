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

//获取地址参数-code
function GetQuery(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}


if(!auth.getToken('customerId')){
	var uri = window.location.href;
	var arr = uri.split('?')
	uri = arr[0];

	var code = GetQuery("code");
	if(code){
		service.enter({code:code}).then(rs => {
			if(rs.data.retCode=='000100'){
				auth.setToken('customerId',rs.data.customer.customerId);
				location.reload();
			}
		})
	}else{
		alert("请刷新页面")
	}


	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb77b53289e95c9e7&redirect_uri='+uri+'&response_type=code&scope=snsapi_base#wechat_redirect';

}
var storage=window.localStorage;
var sessionStorage=window.sessionStorage;
