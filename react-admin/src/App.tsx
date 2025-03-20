// import './App.css'
import { RouterProvider, useNavigate } from 'react-router-dom'
import { routes } from '@/routers/index.tsx'
import { ConfigProvider, Layout } from "antd";
import useSystemStore from '@/store/index'
import eventMitt from "@/utils/eventMitt";
import {isDark} from '@/utils/index'
function App() {
  const { theme, setTheme, setLanguage } = useSystemStore();
  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: "#FF7A00",
      borderRadius: 4,
      colorTextBase: "#ffffff",
      colorBgBase: "#131211",
    },
    components: {
      Layout: {
        headerBg: "#131211",
        color: "#fff",
        siderBg: "#131211",
        headerColor: "#fff",
      },
      Button: {
        colorPrimary: "#FF7A00",
        primaryShadow: "0 0 0 #000",
        defaultBorderColor: "#f9f9f9",
      },
      Input: {
        colorPrimary: "#FF7A00",
        colorBorder: "#f9f9f9",
      },
      Select: {
        colorBorder: "#f9f9f9",
        optionSelectedBg: "#ff7a0026",
      },
    },
  };
  const lightTheme = {
    algorithm: theme.lightAlgorithm,
    token: {
      colorPrimary: "#FF7A00",
      borderRadius: 4,
      colorTextBase: "#131211",
      colorBgBase: "#fff",
    },
    components: {
      Layout: {
        headerBg: "#fff",
        color: "#131211",
        siderBg: "#fff",
        headerColor: "#131211",
      },
      Button: {
        colorPrimary: "#FF7A00",
        primaryShadow: "0 0 0 #fff",
        defaultBorderColor: "#d9d9d9",
      },
      Input: {
        colorPrimary: "#FF7A00",
        colorBorder: "#d9d9d9",
      },
      Select: {
        colorBorder: "#d9d9d9",
        optionSelectedBg: "#ff7a0026",
      },
    },
  };
  const themeConfig = isDark(theme) ? darkTheme : lightTheme;
  eventMitt.on("SYSTEM:THEME", (value: string) => {
    setTheme(value);
  });
  eventMitt.on("SYSTEM:LANGUAGE", (value: string) => {
    setLanguage(value);
  });
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App
