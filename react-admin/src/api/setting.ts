
import request from '@/utils/request'

export const getUserInfo = (data: any) => request.post('/sensor', data)
export const getContractorsLists = (params: any) => {
  let url = '/itf/lms/web/company/page'
  const urlParams = Object.keys(params)
    .map(function (x) {
      return x + '=' + params[x]
    })
    .join('&')
  const newUrl = `${url}?${urlParams}`
  return request.get(newUrl)
}

export const postContractor = (data: any) => request.post('/itf/lms/web/company', data)