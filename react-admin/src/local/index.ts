import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './language.ts';
// import useSystemStore from "@/store/index";
// const { language } = useSystemStore();
// console.log('language',language);
i18n.use(initReactI18next).init({
  resources,
  lng: "en-US", // 语言环境
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
