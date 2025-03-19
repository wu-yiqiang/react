import './login.scss'
import { Button, Form, Input, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/api/user'
function LoginPassword() {
  const [form] = Form.useForm()
  const onFinish = async (value: any) => {
    const { token } = await login(value)
    console.log('token', token)
    // localStorage.set('token', token)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="LoginPassword">
      <Form name="basic" initialValues={{ username: 'python222', password: '23456' }} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <div className="submit">
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Divider>Or</Divider>
    </div>
  )
}

export default LoginPassword
