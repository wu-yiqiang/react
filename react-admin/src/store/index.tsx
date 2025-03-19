import { create } from "zustand";
const useSystemStore = create((set) => ({
  userInfo: { username: '121' },
  theme: 'light',
  language: 'cn',
  menus: [],
  currentMenu: {},
  setTheme: (value: string) => set({ theme: value }),
  setLanguage: (value: string) => set({ language: value }),
  setUserInfo: (value: object) => set({ userInfo: value })
}))


export default useSystemStore;