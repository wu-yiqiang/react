import { login } from '@/api/user'
import { Button, Form, Input, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import LoginFace from './login-face'
import LoginPassword from './login-password'
import { useState } from 'react'
import logo from '@/assets/images/logo.png'
function Login() {
  const navgite = useNavigate()
  const [loginType, setLoginType] = useState(1)
  const onFinish = (value: any) => {
    // const { token } = await login(values)
    // localStorage.set('token', token)
    navgite('/dashbord')
  }
  const handleLoginType = (value: number) => {
    setLoginType(value)
  }
  return (
    <div className="Login">
      <div className="logo-box">
        <img src={logo} alt="" />
      </div>
      <div className="bottom-box">
        <div className="left-box">
          <div className="first-title">eHSE</div>
          <div className="second-title">Digital Health-Safety-Environment Management System</div>
        </div>
        <div className="right-box">
          <div className="card">
            <div className="title">Login In</div>
            <div className="content-box">{loginType == 1 ? <LoginPassword /> : <LoginFace />}</div>
            <Divider>Or</Divider>
            {loginType == 1 ? (
              <Button type="primary" block onClick={() => handleLoginType(2)}>
                人脸登陆
              </Button>
            ) : (
              <Button type="primary" block onClick={() => handleLoginType(1)}>
                密码登陆
              </Button>
            )}
            <div className="opts-box">
              <div className="content">
                <span className="item-left">Register User</span>
                <span className="opts-devide">|</span>
                <span className="item-right">Forget Password</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
