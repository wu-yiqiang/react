
import request from '@/utils/request'

export const getUserInfo = (data: any) => request.post('/sensor', data)
export const getContractorsLists = (params: any) => {
  return request({
    url: '/eams/web/company/page',
    method: 'get',
    params
  })
}

export const postContractor = (data: any) => {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}


export const getContractorDetail = (uuid: any) => {
  return request({
    url: `/eams/web/company/uuid/${uuid}`,
    method: 'get',
  })
}
export const putContractor = (uuid: string, data: object) => {
  return request({
    url: `/eams/web/company/uuid/${uuid}`,
    method: 'put',
    data
  })
}

export const deleteContractors = (uuid: any) => {
  return request({
    url: `/eams/web/company/uuid/${uuid}`,
    method: 'delete',
  })
}

export const getTruckLists = (params: any) => {
  return request({
    url: '/eams/web/disposalTruck/page',
    method: 'get',
    params
  })
}

// 用户管理
export const getUsersLists = (data: any) => {
  return request({
    url: '/user/page',
    method: 'post',
    data
  })
}
export const postUser = (data: any) => {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export const getUserDetail = (id: number) => {
  if(!id) return
  return request({
    url: `/user/detail/${id}`,
    method: 'post',
  })
}

export const updateUserDetail = (data: object) => {
  console.log("ssss", data?.id)
  if (!data?.id) return
  return request({
    url: `/user/update`,
    method: 'post',
    data
  })
}
