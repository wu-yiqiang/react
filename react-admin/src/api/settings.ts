
import request from '@/utils/request'
import { UserItem, UserSearch } from "@/types/user";
import { RoleSearch } from "@/types/role";

// 用户管理
export const getUsersLists = (data: UserSearch) => {
  return request({
    url: '/user/page',
    method: 'post',
    data
  })
}
export const postUser = (data: UserItem) => {
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

export const updateUserDetail = (data: UserItem) => {
  if (!data?.id) return
  return request({
    url: `/user/update`,
    method: 'post',
    data
  })
}

export const deleteUserItem = (id: number) => {
  if (!id) return
  return request({
    url: `/user/delete/${id}`,
    method: 'delete',
  })
}

// 角色管理
export const getRolesLists = (data: RoleSearch) => {
  return request({
    url: '/role/page',
    method: 'post',
    data
  })
}

export const deleteRoleItem = (id: number) => {
  if (!id) return
  return request({
    url: `/role/delete/${id}`,
    method: 'delete'
  })
}