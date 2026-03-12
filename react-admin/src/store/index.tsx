import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import eventMitt from "@/utils/eventMitt";
//import { AES_ECB_ENCRYPT, AES_ECB_DECRYPT } from "@/utils/encrypt";
import { STORENAME } from '@/common/enum.ts'
const useSystemStore = create(
  persist(
    (set) => ({
      userInfo: { name: '', token: '', menus: [], roles: [] },
      systemSetting: {
        lockTime: 10,
        locked: false,
        lockPassword: '123456',
        language: 'zh-CN',
        theme: 'system'
      },
      selectMenu: [],
      openMenu: [],
      currentMenu: {},
      setUserInfo: (value: object) => set({ userInfo: value }),
      setCurrentMenu: (value: object) => set({ currentMenu: value }),
      setSelectMenu: (value: object) => set({ selectMenu: value }),
      setOpenMenu: (value: object) => set({ openMenu: value }),
      setSystemSetting: (value: object) => set({ systemSetting: value })
    }),
    {
      name: STORENAME,
      version: 2.0
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useSystemStore
eventMitt.on('STORE:USER', (value: object) => {
  useSystemStore.setState(() => ({
    userInfo: value
  }))
})

eventMitt.on('ROUTER:OPENMENU', (value: object) => {
  useSystemStore.setState(() => ({
    openMenu: value
  }))
})