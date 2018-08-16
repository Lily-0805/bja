import Axios from 'axios'
import service from '@/services/services'
import auth from './auth'

const http = Axios.create({
    baseURL: '/appapi',
    timeout: 180000, // 请求超时时间
    withCredentials: true
})

// 请求拦截器
http.interceptors.request.use(request => {
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
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb77b53289e95c9e7&redirect_uri='+uri+'&response_type=code&scope=snsapi_base#wechat_redirect';
	}


}
	return request;
}, error => {
	return Promise.reject(error);
});

//获取地址参数-code
function GetQuery(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

// 响应拦截器


export default http
