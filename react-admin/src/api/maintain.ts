import request from '@/utils/request'
import { MaintainSearch } from '@/types/maintain'

// 维修管理
export const getMaintainLists = (data: MaintainSearch) => {
  return request({
    url: '/maintain/page',
    method: 'post',
    data
  })
}
