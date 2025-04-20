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
    id: number;
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
    id: number | null
}

interface UserInfo {
    username: string;
}

interface SystemSetting {
    locaTime: number,
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
  setUserInfo: (value: object) => void
  setSystemSetting: (value: object) => void
}

export interface UploadData {
    file: FormData
}