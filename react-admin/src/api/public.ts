import requestes from '@/utils/request'
import { LoginData } from '@/types/common'
export const login = (data: LoginData) => requestes.Post('/user/login', data)
export const logout = () => requestes.Post('/user/logout')
export const upload = (data: any) => requestes.Post('/upload', data)
export const download = (url: string, method: string = 'Get') =>
  requestes.Get(url, {
    headers: { 'Content-Type': 'blob' }
  })
