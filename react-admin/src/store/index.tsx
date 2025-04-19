import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import eventMitt from "@/utils/eventMitt";
import { AES_ECB_ENCRYPT, AES_ECB_DECRYPT } from "@/utils/encrypt";
import { storeName } from '@/common/enum.ts'
const useSystemStore = create(
  persist(
    (set) => ({
      userInfo: { username: '121' },
      theme: 'system',
      language: 'en-US',
      token: '',
      menus: [],
      openMenu: [],
      currentMenu: {},
      setTheme: (value: string) => set({ theme: value }),
      setToken: (value: string) => set({ token: value }),
      setLanguage: (value: string) => set({ language: value }),
      setUserInfo: (value: object) => set({ userInfo: value }),
      setCurrentMenu: (value: object) => set({ currentMenu: value }),
      setOpenMenu: (value: object) => set({ openMenu: value }),
    }),
    {
      name: storeName,
      version: 2.0,
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useSystemStore;
eventMitt.on("STORE:TOEKN", (value: string) => {
  useSystemStore.setState(() => ({
    token: value
  }))
});

eventMitt.on("STORE:CURRENTMENU", (value: object) => {
  // const { setCurrentMenu } = useSystemStore();
  // setCurrentMenu(value);
  // useSystemStore.setState(() => ({
  //   token: value
  // }))
});