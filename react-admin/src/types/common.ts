import { BtnField, BtnItem } from './button';
import {MenuItem} from './menu'
export interface Pagenation {
    pageSize: number;
    pageNo: number; 
}

export interface Search {
    search: string;
}

export interface CommonTime {
    created_at?: string;
    updated_at?: string;
}

export interface CommonRemark  {
    remark?: string
 }
export interface CommonId {
  id: number | null
}

export interface CommonUuid {
    uuid: string;
}


export interface LoginData {
    username: string;
    password: string;
}

export interface RouterItem {
    path: string;
    key: string;
    label: string;
    icon: React.ReactNode;
    parentkey: string;
    element: React.ReactNode;
}



export interface DialogProps {
    open: boolean
    handleClose: () => void
    handleOk: (values: object) => void
    id?: number | null
}

interface UserInfo {
  id: number | null;
  username: string
  avatar: string
  token: string
  menus: Array<MenuItem>
  roles: Array<object>
  buttons: Array<BtnItem>
}

interface SystemSetting {
    lockTime: number,
    lockPassword: string,
    theme: string,
    language: string
    locked: boolean
}
export interface SystemStore {
  userInfo: UserInfo
  menus: Array<RouterItem>
  currentMenu: RouterItem
  systemSetting: SystemSetting
  selectMenu: Array<string>
  openMenu: Array<string>
  setUserInfo: (value: object) => void
  setSystemSetting: (value: object) => void
  setSelectMenu: (value: object) => void
  setOpenMenu: (value: object) => void
}

export interface UploadData {
    file: FormData
}

export interface SearchFormProps {
    label: string
    name: string
    type: string
}

export interface ResponseTypes<T> {
    data: T
    code: number
    msg: string
}