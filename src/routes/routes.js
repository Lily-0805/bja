// const getViewComponent = process.env.NODE_ENV === 'production' ? (path) => (resolve) => require(['@/views' + path + '.vue'], resolve) : (path) => require('@/views' + path + '.vue')

const getViewComponent = (path) => (resolve) => require(['@/views' + path + '.vue'], resolve)

export default [
    {path: '/', component: getViewComponent('/index'),meta: {title: '保捷安物流'}},

	{path: '/address/list', component: getViewComponent('/address/list'),meta: {title: '保捷安物流'}},
	{path: '/address/add', component: getViewComponent('/address/add'),meta: {title: '保捷安物流'}},

	{path: '/order/list', component: getViewComponent('/order/list'),meta: {title: '保捷安物流'}},
	{path: '/express/detail', component: getViewComponent('/express/detail'),meta: {title: '保捷安物流'}},
]
