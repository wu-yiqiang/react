import * as ReactDOM from 'react-dom/client'
import * as React from "react";
import App from './App.tsx'
import "virtual:svg-icons-register";
import './index.css'
import '@/lang/index.ts'
import autoRefresh from '@/components/AutoUpdate.ts'
if (!import.meta.env.DEV) autoRefresh()
//import Track from '@/utils/track.ts';
//const clickTargetElement = ['ant-btn']
//const track = new Track(clickTargetElement)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />
)
