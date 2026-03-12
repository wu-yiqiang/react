import { RouterProvider } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import useSystemStore from "@/store/index";
import eventMitt from "@/utils/eventMitt";
import { isDark, TimeInterval } from '@/utils/index'
import { SystemStore } from "@/types/common";
import ScreenLock from './pages/screenLock'
import dayjs from 'dayjs'
import { Suspense, useEffect } from "react";
import { routes } from '@/routers/index.tsx'
import zhCN from 'antd/locale/zh_CN';
function App() {
  const { systemSetting,userInfo, setSystemSetting } = useSystemStore() as SystemStore
  const darkTheme = {
    token: {
      // colorPrimary: '#FF7A00',
      borderRadius: 4,
      borderRadiusLG: 4,
      colorTextBase: '#ffffff',
      colorBgBase: '#131211'
    },
    components: {
      Layout: {
        headerBg: '#131211',
        color: '#fff',
        siderBg: '#131211',
        headerColor: '#fff'
      },
      Button: {
        // colorPrimary: '#FF7A00',
        primaryShadow: '0 0 0 #000',
        defaultBorderColor: '#f9f9f9'
      },
      Input: {
        // colorPrimary: '#FF7A00',
        colorBorder: '#f9f9f9'
      },
      Select: {
        colorBorder: '#f9f9f9',
        optionSelectedBg: '#ff7a0026'
      },
      Tree: {
        colorBorder: '#ffffff'
      },
      Upload: {
        colorBorder: '#ffffff'
      },
      Message: {
        borderRadiusLG: 4
      }
    }
  }
  const lightTheme = {
    token: {
      // colorPrimary: '#FF7A00',
      borderRadius: 4,
      colorTextBase: '#131211',
      colorBgBase: '#fff'
    },
    components: {
      Layout: {
        headerBg: '#fff',
        color: '#131211',
        siderBg: '#fff',
        headerColor: '#131211'
      },
      Button: {
        // colorPrimary: '#FF7A00',
        primaryShadow: '0 0 0 #fff',
        defaultBorderColor: '#d9d9d9'
      },
      Input: {
        // colorPrimary: '#FF7A00',
        colorBorder: '#d9d9d9'
      },
      Select: {
        colorBorder: '#d9d9d9',
        optionSelectedBg: '#ff7a0026'
      },
      Tree: {
        colorBorder: '#d9d9d9'
      },
      Upload: {
        colorBorder: '#d9d9d9'
      },
      Message: {
        borderRadiusLG: 4
      }
    }
  }
  const themeConfig = isDark(systemSetting.theme) ? darkTheme : lightTheme;
  eventMitt.on("SYSTEM:THEME", (value: string) => {
    setSystemSetting({ ...systemSetting , theme: value})
  });
  eventMitt.on("SYSTEM:LANGUAGE", (value: string) => {
    setSystemSetting({ ...systemSetting, language: value })
  });
  
  eventMitt.on('SYSTEM:LOCKSCREEN', () => {
    setSystemSetting({ ...systemSetting, locked: true })
  })
  
  
  const init = () => {
    let startTime: number
    startTime = new Date().getTime()
    new TimeInterval(() => {
      const endTime = new Date().getTime()
      const startTimeAdded = dayjs(startTime).add(systemSetting.lockTime, 'minute').valueOf()
      if (endTime > startTimeAdded && !systemSetting?.locked && userInfo?.token) {
        setSystemSetting({ ...systemSetting, locked: true })
      }
    }, 1000)
    document.addEventListener('mousemove', () => {
      startTime = new Date().getTime()
    })
    document.addEventListener('keypress', () => {
      startTime = new Date().getTime()
    })
    document.addEventListener('click', () => {
      startTime = new Date().getTime()
    })
    window.addEventListener('keydown', (event: Event) => {
      // @ts-ignore
      if (event.key == 'Escape') {
        event?.stopPropagation()
        event?.preventDefault()
      }
    })
    if (!userInfo.token)  eventMitt.emit('ROUTER:LOGOUT')

  }
  useEffect(() => {
    init()
  })
  return (
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <Suspense fallback={<Spin percent="auto" fullscreen size="large" />}>
        {/* <SomeComponent /> */}
        <RouterProvider router={routes} />
      </Suspense>
      {systemSetting?.locked ? <ScreenLock /> : null}
    </ConfigProvider>
  )
}

export default App;
