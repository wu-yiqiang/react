
import requestes from '@/utils/request'
import { UserItem, UserSearch } from '@/types/user'
import { RoleItem, RoleSearch } from '@/types/role'
import { MenuSearch } from '@/types/menu'

// 用户管理
export const getUsersLists = (data: UserSearch) => {
  return requestes.Post(`/user/page`, data)
}
export const postUser = (data: UserItem) => {
  return requestes.Post(`/user/create`, data)
}

export const getUserDetail = (id: number) => {
  if (!id) return
  return requestes.Post(`/user/detail/${id}`)
}

export const updateUserDetail = (data: UserItem) => {
  if (!data?.id) return
  return requestes.Post(`/user/update`, data)
}
export const updateUserPassword = (data: UserItem) => {
  if (!data?.id) return
  return requestes.Post(`/user/update/password`, data)
}

export const deleteUserItem = (id: number) => {
  if (!id) return
  return requestes.Delete(`/user/delete/${id}`)
}

// 角色管理
export const getRolesLists = (data: RoleSearch) => {
  return requestes.Post(`/role/page`, data)
}

export const postRoleItem = (data: RoleItem) => {
  return requestes.Post(`/role/create`, data)
}

export const getRoleOptions = () => {
  return requestes.Get(`/role/lists`)
}

export const getRoleDetails = (id: number) => {
  if (!id) return
  return requestes.Post(`/role/detail/${id}`)
}

export const putRoleItem = (data: RoleItem) => {
  if (!data?.id) return
  return requestes.Post(`/role/update`)
}

export const deleteRoleItem = (id: number) => {
  if (!id) return
  return requestes.Delete(`/role/delete/${id}`)
}

// 菜单管理
export const getMenuTreeLists = () => {
  return requestes.Get('/menu/treeLists')
}

export const postMenuItem = (data: any) => {
  return requestes.Post('/menu/create', data)
}

export const getMenusLists = (data: MenuSearch) => {
  return requestes.Post('/menu/page', data)
}

export const deleteMenuItem = (id: number) => {
  if (!id) return
  return requestes.Delete(`/menu/delete/${id}`)
}

export const updateMenuItem = (data: any) => {
  return requestes.Post('/menu/update', data)
}

export const getMenuItem = (id: number) => {
  return requestes.Get(`/menu/detail/${id}`)
}

// 按钮管理
export const postButtonItem = (data: any) => {
  return requestes.Post('/button/create', data)
}

export const getButtonsLists = (data: MenuSearch) => {
  return requestes.Post('/button/page', data)
}

export const deleteButtonItem = (id: number) => {
  if (!id) return
  return requestes.Delete(`/button/delete/${id}`)
}

export const updateButtonItem = (data: any) => {
  return requestes.Post(`/button/update`, data)
}

export const getButtonItem = (id: number) => {
  return requestes.Post(`/button/detail/${id}`)
}