
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


export const getContractorDetail = (uuid: any) => {
  return request({
    url: `/itf/lms/web/company/uuid/${uuid}`,
    method: 'get',
  })
}
export const putContractor = (uuid: string, data: object) => {
  return request({
    url: `/itf/lms/web/company/uuid/${uuid}`,
    method: 'put',
    data
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

// 用户管理
export const getUsersLists = (params: any) => {
  return request({
    url: '/itf/lms/web/user/page',
    method: 'post',
    params
  })
}
export const postUser = (data: any) => { 
  return request({
    url: '/itf/lms/web/user',
    method: 'post',
    data
  })
}
