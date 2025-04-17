import * as ReactDOM from 'react-dom/client'
import * as React from "react";
import App from './App.tsx'
import "virtual:svg-icons-register";
import './index.css'
import '@/lang/index.ts'
// import track from '@/utils/track.ts';
// track
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />
)
