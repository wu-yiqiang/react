import requestes from '@/utils/request'
import { MaintainSearch } from '@/types/maintain'

// 维修管理
export const getMaintainLists = (data: MaintainSearch) => {
  return requestes.Post('/maintain/page', data)
}
