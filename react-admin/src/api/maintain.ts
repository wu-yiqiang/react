import requestes from '@/network/request'
import { MaintainSearch } from '@/types/maintain'

// 维修管理
export const getMaintainLists = async (data: MaintainSearch): Promise<any> => {
  return await requestes.Post('/maintain/page', data)
}
