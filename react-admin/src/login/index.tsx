import { login } from '@/api/user'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'
function Login() {
  let navgite = useNavigate()
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
      <div className="card">
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
        <div className="submit">
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button type="primary" onClick={onFinish} htmlType="submit">
            登录
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
