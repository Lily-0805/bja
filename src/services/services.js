import http from '../utils/http'
import Qs from 'qs'
/**
 * 管理员服务
 */
export default {



	enter: (data) => http.post('/customer/enter', Qs.stringify(data)),//获取会员id

	order: (data) => http.post('/order/add', Qs.stringify(data)), //下单
	orderList: (data) => http.post('/order/list', Qs.stringify(data)), //订单列表
	cancelOrder: (data) => http.post('/order/cancel', Qs.stringify(data)), //取消订单

	messageAll: (data) => http.post('/message/select-all', Qs.stringify(data)),//捎话列表
	goodsAll: (data) => http.post('/goods/select-all', Qs.stringify(data)),//物品列表




	expressno: (data) => http.post('/order/detail', Qs.stringify(data)),//查件


	//地址相关
	addAddr: (data) => http.post('/customer-address/add', Qs.stringify(data)), //新增
	editAddr: (data) => http.post('/customer-address/edit', Qs.stringify(data)), //修改
	addrList: (data) => http.post('/customer-address/list', Qs.stringify(data)), //列表
	addrDetail: (data) => http.post('/customer-address/detail', Qs.stringify(data)), //详情
	delAddr: (data) => http.post('/customer-address/delete', Qs.stringify(data)), //删除


}



