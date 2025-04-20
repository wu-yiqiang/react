import { RouterProvider } from "react-router-dom";
import { routes } from "@/routers/index.tsx";
import { ConfigProvider } from "antd";
import useSystemStore from "@/store/index";
import eventMitt from "@/utils/eventMitt";
import { isDark } from "@/utils/index";
import { SystemStore } from "@/types/common";
import ScreenLock from './pages/screenLock'
import dayjs from 'dayjs'
function App() {
  const { systemSetting, setSystemSetting } = useSystemStore() as SystemStore
  const darkTheme = {
    token: {
      colorPrimary: '#FF7A00',
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
        colorPrimary: '#FF7A00',
        primaryShadow: '0 0 0 #000',
        defaultBorderColor: '#f9f9f9'
      },
      Input: {
        colorPrimary: '#FF7A00',
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
      colorPrimary: '#FF7A00',
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
        colorPrimary: '#FF7A00',
        primaryShadow: '0 0 0 #fff',
        defaultBorderColor: '#d9d9d9'
      },
      Input: {
        colorPrimary: '#FF7A00',
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
  let startTime: number
  startTime = new Date().getTime()
  setInterval(() => {
    const endTime = new Date().getTime()
    const startTimeAdded = dayjs(startTime).add(systemSetting.lockTime, 'minute').valueOf()
    if (endTime > startTimeAdded) setSystemSetting({ ...systemSetting, locked: true })
  }, 1000)
  eventMitt.emit('SYSTEM:LOCKSCREEN', () => {
    startTime = new Date().getTime()
  })
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={routes} />
      { systemSetting.locked ? <ScreenLock /> : null}
    </ConfigProvider>
  )
}

export default App;
