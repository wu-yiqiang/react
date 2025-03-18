import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from '@/routers/index.tsx'
import { ConfigProvider } from "antd";

function App() {
  const theme = {
    token: {
      colorPrimary: "#FF7A00",
      borderRadius: 4,
    },
    components: {
      Button: {
        colorPrimary: "#FF7A00",
        colorPrimaryHover: "#ff7a007f",
        defaultHoverColor: "#ff7a0026",
        defaultHoverBg: "#ff7a0026",
        defaultHoverBorderColor: "#ff7a0026",
      },
      Input: {
        colorPrimary: "#FF7A00",
      },
    },
  };
  return (
    <ConfigProvider theme={theme} >
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App
