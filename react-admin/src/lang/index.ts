import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './language.ts';
import eventMitt from '@/utils/eventMitt.ts';
import useSystemStore from '@/store/index.tsx';
const language  = useSystemStore.getState().language
i18n.use(initReactI18next).init({
  resources,
  lng: language, // 语言环境
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false
  }
})

export default i18n;


eventMitt.on("SYSTEM:LANGUAGE", (value: string) => {
  i18n.changeLanguage(value)
});
