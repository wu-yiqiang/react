import requestes from '@/network/request'
import { LoginData } from '@/types/common'
export const login = async (data: LoginData): Promise<any> => await requestes.Post('/user/login', data)
export const logout = async (): Promise<any> => await requestes.Post('/user/logout')
export const upload = async (data: any): Promise<any> => {
  const formData = new FormData()
  formData.append('file', data)
  return await requestes.Post('/general/upload', formData)
}
export const download = async (url: string, method: string = 'Get'): Promise<any> =>
  await requestes.Get(url, {
    headers: { 'Content-Type': 'blob' },
  })
