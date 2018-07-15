// const getViewComponent = process.env.NODE_ENV === 'production' ? (path) => (resolve) => require(['@/views' + path + '.vue'], resolve) : (path) => require('@/views' + path + '.vue')

const getViewComponent = (path) => (resolve) => require(['@/views' + path + '.vue'], resolve)

export default [
    {path: '/', component: getViewComponent('/index'),meta: {title: ''}},

    {path: '/address/list', component: getViewComponent('/address/list'),meta: {title: ''}}
]
