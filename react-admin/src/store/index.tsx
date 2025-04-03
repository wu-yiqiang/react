import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { AES_ECB_ENCRYPT, AES_ECB_DECRYPT } from "@/utils/encrypt";
const useSystemStore = create(
  persist(
    (set) => ({
      userInfo: { username: "121" },
      theme: "system",
      language: "zh-CN",
      menus: [],
      currentMenu: {},
      getTheme: () => {
        const theme = localStorage.getItem("theme");
        return theme;
      },
      setTheme: (value: string) => set({ theme: value }),
      setLanguage: (value: string) => set({ language: value }),
      setUserInfo: (value: object) => set({ userInfo: value }),
    }),
    {
      name: "ANTON—EAMS-STORE",
      version: 2.0,
      storage: createJSONStorage(() => sessionStorage),
      // storage: {
      //   getItem: (name: string): ReturnType<typeof JSON.parse> => {
      //     const value = sessionStorage.getItem(name) ?? "";
      //     const dencryptData = JSON.parse(AES_ECB_DECRYPT(value));
      //     console.log("dencryptData", dencryptData);
      //     return dencryptData ?? null;
      //   },
      //   setItem: (name: string, value: unknown) => {
      //     const data = JSON.stringify(value);
      //     const encryptData = AES_ECB_ENCRYPT(data);
      //     console.log("set name", name, value);
      //     sessionStorage.setItem(name, encryptData);
      //   },
      //   removeItem: (name: string) => {
      //     sessionStorage.removeItem(name);
      //   },
      // },
    }
  )
);

export default useSystemStore;