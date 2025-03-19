import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: "/",
  timeout: 1000 * 60 * 5,
  // 数组格式参数序列化
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}

const request: AxiosInstance = axios.create({
  ...defaultConfig
})


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


request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error)
)

export default request
