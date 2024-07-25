import './login.scss'
import { Button, Form, Input, Divider } from 'antd'
function LoginPassword() {

  const onFinish = (value: any) => {
    // const { token } = await login(values)
    // localStorage.set('token', token)
    navgite('/dashbord')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="LoginPassword">
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
    </div>
  )
}

export default LoginPassword
