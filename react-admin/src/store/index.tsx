import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import eventMitt from "@/utils/eventMitt";
import { AES_ECB_ENCRYPT, AES_ECB_DECRYPT } from "@/utils/encrypt";
import { storeName } from '@/common/enum.ts'
const useSystemStore = create(
  persist(
    (set) => ({
      userInfo: { username: 'Sutter', token: '' },
      systemSetting: {
        lockTime: 10,
        locked: false,
        lockPassword: '123456',
        language: 'en-US',
        theme: 'system'
      },
      menus: [],
      openMenu: [],
      currentMenu: {},
      setUserInfo: (value: object) => set({ userInfo: value }),
      setCurrentMenu: (value: object) => set({ currentMenu: value }),
      setOpenMenu: (value: object) => set({ openMenu: value }),
      setSystemSetting: (value: object) => set({ systemSetting: value })
    }),
    {
      name: storeName,
      version: 2.0
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useSystemStore;
eventMitt.on('STORE:USER', (value: object) => {
  useSystemStore.setState(() => ({
    userInfo: value
  }))
})

eventMitt.on("STORE:CURRENTMENU", (value: object) => {
  // const { setCurrentMenu } = useSystemStore();
  // setCurrentMenu(value);
  // useSystemStore.setState(() => ({
  //   token: value
  // }))
});