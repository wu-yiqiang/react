import { useState } from "react";
import { createModel } from "hox";

function useInfo() {
  const [locale, setLocale] = useState('zh')
  const [theme, setTheme] = useState('light')
  const [token, setToken] = useState('')
  const changeLanguage = (lang: string) => {
    setLocale(lang)
  }
  const changeTheme = (theme: string) => {
    setTheme(theme)
  }
  const changeToken = (token: string) => {
    setToken(token)
  }
  return {
    locale,
    theme,
    token,
    changeLanguage,
    changeTheme,
    changeToken
  }
}

export default createModel(useInfo)