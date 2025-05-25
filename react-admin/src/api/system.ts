
import requestes from '@/utils/request'
import { UserItem, UserSearch } from '@/types/user'
import { RoleItem, RoleSearch } from '@/types/role'
import { MenuSearch } from '@/types/menu'
import { ResponseTypes } from '@/types/common'

// 用户管理
export const getUsersLists = async (data: UserSearch): Promise<any> => {
  return await requestes.Post(`/user/page`, data)
}
export const postUser = async (data: UserItem): Promise<any> => {
  return await requestes.Post(`/user/create`, data)
}

export const getUserDetail = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Post(`/user/detail/${id}`)
}

export const updateUserDetail = async (data: UserItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/user/update`, data)
}
export const updateUserPassword = async (data: UserItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/user/update/password`, data)
}

export const deleteUserItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/user/delete/${id}`)
}

// 角色管理
export const getRolesLists = async (data: RoleSearch): Promise<any> => {
  return await requestes.Post(`/role/page`, data)
}

export const postRoleItem = async (data: RoleItem): Promise<any> => {
  return await requestes.Post(`/role/create`, data)
}

export const getRoleOptions = async (): Promise<any> => {
  return await requestes.Get(`/role/lists`)
}

export const getRoleDetails = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Post(`/role/detail/${id}`)
}

export const putRoleItem = async (data: RoleItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/role/update`)
}

export const deleteRoleItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/role/delete/${id}`)
}

// 菜单管理
export const getMenuTreeLists = async (): Promise<any> => {
  return await requestes.Get('/menu/treeLists')
}

export const postMenuItem = async (data: any): Promise<any> => {
  return await requestes.Post('/menu/create', data)
}

export const getMenusLists = async (data: MenuSearch): Promise<any> => {
  return await requestes.Post('/menu/page', data)
}

export const deleteMenuItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/menu/delete/${id}`)
}

export const updateMenuItem = async (data: any): Promise<any> => {
  return await requestes.Post('/menu/update', data)
}

export const getMenuItem = async (id: number): Promise<any> => {
  return await requestes.Get(`/menu/detail/${id}`)
}

// 按钮管理
export const getButtonsLists = async (data: MenuSearch):Promise<any> => {
  return  await requestes.Post('/button/page', data)
}

export const postButtonItem = async (data: any): Promise<any> => {
  return await requestes.Post('/button/create', data)
}

export const deleteButtonItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/button/delete/${id}`)
}

export const updateButtonItem = async (data: any): Promise<any> => {
  return await requestes.Post(`/button/update`, data)
}

export const getButtonItem = async (id: number): Promise<any> => {
  return await requestes.Post(`/button/detail/${id}`)
}