import requestes from '@/utils/request'
import { LoginData } from '@/types/common'
export const login = async (data: LoginData): Promise<any> => await requestes.Post('/user/login', data)
export const logout = async (): Promise<any> => await requestes.Post('/user/logout')
export const upload = async (data: any): Promise<any> => await requestes.Post('/upload', data)
export const download = async (url: string, method: string = 'Get'): Promise<any> =>
  await requestes.Get(url, {
    headers: { 'Content-Type': 'blob' }
  })
