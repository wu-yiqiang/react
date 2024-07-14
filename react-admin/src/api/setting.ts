
import request from '@/utils/request'

export const getUserInfo = (data: any) => request.post('/sensor', data)
export const getContractorsLists = (params: any) => {
  return request({
    url: '/itf/lms/web/company/page',
    method: 'get',
    params
  })
}

export const postContractor = (data: any) => { 
  return request({
    url: '/itf/lms/web/company',
    method: 'post',
    data
  })
}


export const getContractorsDetail = (uuid: any) => {
  return request({
    url: `/itf/lms/web/company/uuid/${uuid}`,
    method: 'get',
  })
}

export const deleteContractors = (uuid: any) => {
  return request({
    url: `/itf/lms/web/company/uuid/${uuid}`,
    method: 'delete',
  })
}

export const getTruckLists = (params: any) => {
  return request({
    url: '/itf/lms/web/disposalTruck/page',
    method: 'get',
    params
  })
}