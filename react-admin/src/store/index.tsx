import { create } from "zustand";
const useSystemStore = create((set) => ({
    userInfo: { username: '121' },
    menus: [],
    currentMenu: {},
    setUserInfo: (value: object) => set(({ userInfo: value })),
}));


export default useSystemStore;