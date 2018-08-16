import Axios from 'axios'

const http = Axios.create({
    baseURL: '/appapi',
    timeout: 180000, // 请求超时时间
    withCredentials: true
})

export default http
