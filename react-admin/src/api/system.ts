
import request from '@/utils/request'
import { UserItem, UserSearch } from "@/types/user";
import { RoleSearch } from "@/types/role";
import {MenuSearch} from '@/types/menu'

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

// 菜单管理
export const getMenuTreeLists = () => {
  return request({
    url: '/menu/treeLists',
    method: 'get',
  })
}

export const postMenuItem = (data: any) => {
  return request({
    url: '/menu/create',
    method: 'post',
    data
  })
}

export const getMenusLists = (data: MenuSearch) => {
  return request({
    url: '/menu/page',
    method: 'post',
    data
  })
}

export const deleteMenuItem = (id: number) => {
  if (!id) return
  return request({
    url: `/menu/delete/${id}`,
    method: 'delete',
  })
}

export const updateMenuItem = (data: any) => {
  return request({
    url: `/menu/update`,
    method: 'post',
    data
  })
}

export const getMenuItem = (id: number) => {
  return request({
    url: `/menu/detail/${id}`,
    method: 'get',
  })
}