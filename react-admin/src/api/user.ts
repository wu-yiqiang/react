import request from '@/utils/request'

interface UserInfo {
  name: String
  age: Number
  permissionRouters: Array<String>
  code: Number
}

export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'dongxiao yuan',
        age: 10,
        permissionRouters: [],
        code: 11
      })
    }, 1000)
  })
}

export const login = (data: any) => request.post('/login', data)
