// import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
// import eventMitt from './eventMitt'
// import Toast from '@/components/Toast'
// import useSystemStore from '@/store'
// // import qs from 'qs'
// console.log('sdsd', import.meta.env.VITE_API_BASE_URL)
// const defaultConfig: AxiosRequestConfig = {
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 1000 * 60 * 5
//   // 数组格式参数序列化
//   //  paramsSerializer: (params) => qs.stringify(params, { indices: false })
// }

// const request: AxiosInstance = axios.create({
//   ...defaultConfig
// })

// request.interceptors.request.use(
//   (config) => {
// // 假设 useSystemStore.getState() 返回的类型为 unknown，先进行类型断言
// const systemState = useSystemStore.getState() as { userInfo?: { token?: string } };
// const token = systemState.userInfo?.token;
//     if (token) {
//       config.headers['Authorization'] = `${token}`
//     }
//     return config
//   },
//   (error) => {
//     console.log('response', error)
//     return Promise.reject(error)
//   }
// )

// request.interceptors.response.use(
//   (response) => {
//     const contentType = response?.headers?.['content-type']
//     const responseType = response?.config.responseType
//     if (responseType == 'blob') return response
//     const { code, msg } = response?.data
//     if (code !== 200 && contentType == 'application/json') {
//       Toast.error(msg)
//       return Promise.reject()
//     }
//     return response.data
//   },
//   (error) => {
//     const status = error?.response?.status
//     if (status == 401) {
//       Toast.error('认证信息过期，请重新登录')
//       eventMitt.emit('STORE:USER', '')
//       eventMitt.emit('ROUTER:LOGOUT')
//     }
//     if (status == 404) {
//       Toast.error("接口地址不存在")
//     }
//     if (status == 500) {
//       Toast.error('服务错误')
//     }
//     console.log('error', status)
//     return Promise.reject(error)
//   }
// )

// export default request
