import { login } from '@/api/user'
import { Button, Form, Input, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import { useState } from 'react'
import logo from '@/assets/images/logo.png'
function Login() {
  const navgite = useNavigate()
  const onFinish = (value: any) => {
    // const { token } = await login(values)
    // localStorage.set('token', token)
    navgite('/dashbord')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="Login">
      <div className="logo-box">
        <img src={ logo } alt="" />
      </div>
      <div className="bottom-box">
        <div className="left-box">
          <div className="first-title">eHSE</div>
          <div className="second-title">Digital Health-Safety-Environment Management System</div>
        </div>
        <div className="right-box">
          <div className="card">
            <div className="title">Login In</div>
            <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
            </Form>
            <div className="submit">
              <Button type="primary" block onClick={onFinish} htmlType="submit">
                登录
              </Button>
            </div>
            <Divider>Or</Divider>
            <Button type="primary" block onClick={onFinish}>
              人脸登陆
            </Button>
            <div className="opts-box">
              <div className="content">
                <span className='item-left'>Register User</span>
              <span className='opts-devide'>|</span>
              <span className='item-right'>Forget Password</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
