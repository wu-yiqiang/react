import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: "/prod-api",
  timeout: 10000,
  // 数组格式参数序列化
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}

const request: AxiosInstance = axios.create({
  ...defaultConfig
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error)
)

export default request
