import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import eventMitt from './eventMitt'
import { message } from 'antd'
// import qs from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/prod-api',
  timeout: 1000 * 60 * 5
  // 数组格式参数序列化
  //  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}

const request: AxiosInstance = axios.create({
  ...defaultConfig
})

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    console.log('response', error)
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error?.response?.status
    if (status == 401) {
      message.destroy()
      message.error('认证信息过期，请重新登录')
      eventMitt.emit('ROUTER:LOGOUT')
    }
    if (status == 500) {
      message.destroy()
      message.error('服务错误')
    }
    console.log('error', status)
    Promise.reject(error)
  }
)

export default request
