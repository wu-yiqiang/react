import './lowCode.scss'
import { useState } from 'react'
import Editor from './Editor'
import LeftPanel from './LeftPanel'
function Login() {
  return (
    <div className="LowCode">
      <div className="headerContainer">header</div>
      <div className="mainContainer">
        <div className="leftContainer">
          <LeftPanel />
        </div>
        <div className="middleContainer">
          <Editor />
        </div>
        <div className="rightContainer">sdsf1</div>
      </div>
    </div>
  )
}

export default Login
