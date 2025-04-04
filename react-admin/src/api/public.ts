import request from '@/utils/request'
import { LoginData, UploadData } from '@/types/common'
export const login = (data: LoginData) => request.post('/user/login', data)
export const logout = () => request.get('/logout')

export const upload = (data: UploadData) => request.post('/upload', data)
