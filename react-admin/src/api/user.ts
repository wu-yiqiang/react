
interface UserInfo {
  name: String
    age: Number
    permissionRouters: Array<String>
    code: Number
}

export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "dongxiao yuan",
        age: 10,
        permissionRouters: ['home', ''],
        code: 11
      })
    }, 1000)
  })
}