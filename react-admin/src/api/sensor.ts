
import request from '@/utils/request'

export const getUserInfo = (data: any) => request.post('/sensor', data)