import http from '../utils/http'
import Qs from 'qs'
/**
 * 管理员服务
 */
export default {
	enter: (data) => http.post('/customer/enter', Qs.stringify(data)),//获取会员id

	order: (data) => http.post('/order/add', Qs.stringify(data)), //
	messageAll: (data) => http.post('/message/select-all', Qs.stringify(data)),//捎话列表
	goodsAll: (data) => http.post('/goods/select-all', Qs.stringify(data)),//物品列表
	//


}



