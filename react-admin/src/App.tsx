// import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from '@/routers/index.tsx'
import { ConfigProvider, Layout } from "antd";
import useSystemStore from '@/store/index'

function App() {
  const { theme } = useSystemStore()
  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#FF7A00',
      borderRadius: 4,
      colorTextBase: '#ffffff',
      colorBgBase: '#000'
    },
    components: {
      Layout: {
        headerBg: '#000',
        color: '#fff',
        siderBg: '#000',
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
      }
    }
  }
  const lightTheme = {
    algorithm: theme.lightAlgorithm,
    token: {
      colorPrimary: '#FF7A00',
      borderRadius: 4,
      colorTextBase: '#000',
      colorBgBase: '#fff'
    },
    components: {
      Layout: {
        headerBg: '#fff',
        color: '#000',
        siderBg: '#fff',
        headerColor: "#000",
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
      }
    }
  }
  console.log("sdsdddddd", theme)
  const themeConfig = theme == 'dark' ? darkTheme : lightTheme
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App
