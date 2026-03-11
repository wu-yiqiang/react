import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import eventMitt from '@/utils/eventMitt'
import Toast from '@/components/Toast'
import useSystemStore from '@/store'
const Alova = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000 * 60 * 5,
  requestAdapter: adapterFetch(),
  cacheFor: {},
  beforeRequest(method: { config: { headers: { [x: string]: string } } }) {
    // method.config.headers['Content-Type'] = method?.config?.headers['Content-Type'] ?? null 
    const systemState = useSystemStore.getState() as { userInfo?: { token?: string } }
    const token = systemState.userInfo?.token
    if (token) method.config.headers['Authorization'] = token
  },
  responded: {
    onSuccess: async (response: { status: number; statusText: string | undefined; json: () => any }, method: any) => {
      const { status } = response
      if (status == 400) Toast.error('客户端出现错误')
      if (status == 401) {
        Toast.error('认证信息过期，请重新登录')
        eventMitt.emit('STORE:USER', '')
        eventMitt.emit('ROUTER:LOGOUT')
      }
      if (status == 404) Toast.error('请求地址不存在')
      if (status == 500) {
        Toast.error('服务端出现错误')
      }
      if (status == 502) Toast.error('网关错误')
      if (method.config.headers['Content-Type'] == 'blob') {
        return response
      }
      const data = (await response.json())
      if (data.code == 200) return Promise.resolve(data)
      if (data.code != 200) {
        Toast.error(data?.msg)
        if (data.code === 1010002) {
          eventMitt.emit('STORE:USER', '')
          eventMitt.emit('ROUTER:LOGOUT')
        }
      }
      return Promise.reject()
    },
    onError: (err: Error) => {
      Toast.error('网络出现错误')
      return Promise.reject(err)
    },
    // onComplete: (method: { config: { headers: { [x: string]: string } } }) => {
    //   if (method.config.headers['Content-Type'] == 'blob') {
        
    //   }
    // }
  }
})

export default Alova
