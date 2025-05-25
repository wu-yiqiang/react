import * as ReactDOM from 'react-dom/client'
import * as React from "react";
import App from './App.tsx'
import "virtual:svg-icons-register";
import './index.css'
import '@/lang/index.ts'
//import Track from '@/utils/track.ts';
//const clickTargetElement = ['ant-btn']
//const track = new Track(clickTargetElement)
if (!import.meta.env.DEV) await import('@/components/AutoUpdate.ts')
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />
)
