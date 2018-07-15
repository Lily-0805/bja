import Axios from 'axios'

const http = Axios.create({
    baseURL: '/appapi',
    timeout: 180000, // 请求超时时间
    withCredentials: true
})

// 请求拦截器


// 响应拦截器


export default http
