import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "virtual:svg-icons-register";
import './index.css'
import '../custom.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  
  <ConfigProvider prefixCls="custom">
    <App />
  </ConfigProvider>
)
