import request from '@/utils/request'
import { LoginData } from '@/types/common'
export const login = (data: LoginData) => request.post('/user/login', data)
export const logout = () => request.post('/user/logout')
export const upload = (data: any) => request.post('/upload', data)
export const download = (url: string, method: string = 'get') => request.get(url, {responseType: 'blob'})
