import axios from 'axios' // 为什么使用axios，上手简单
import { SERVER } from './constant'

const req = axios.create({
  baseURL: `${SERVER}/api`,
  timeout: 15000,
})

// 请求拦截器
req.interceptors.request.use(
  (config) => config,
  () => {
    console.error('请求异常')
  },
)

// 响应拦截器
req.interceptors.response.use((response) => {
  const d = response.data || {}
  if (d.code !== '0' && typeof window !== 'undefined') {
    // 接口报错处理
    alert(d.description)
    return null
  }
  return d.data
})

export default req
