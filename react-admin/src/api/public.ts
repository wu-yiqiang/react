import request from '@/utils/request'
import { LoginData } from '@/types/public'
export const login = (data: LoginData) => request.post('/user/login', data)
export const logout = () => request.get('/logout')
