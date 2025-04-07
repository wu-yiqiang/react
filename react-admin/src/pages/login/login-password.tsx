import './login.scss'
import { Button, Form, Input, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/api/public'
import eventMitt from '@/utils/eventMitt'
function LoginPassword() {
  const [form] = Form.useForm()
  const onFinish = async (value: any) => {
    const { data } = await login(value)
    const token = data?.token
    if (token) {
      eventMitt.emit("STORE:TOEKN", token);
      eventMitt.emit("ROUTER:HOME");
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="LoginPassword">
      <Form name="basic" initialValues={{ email: 'sutter.wu@outlook.com', password: '1234@Abcd' }} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} autoComplete="off">
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
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
