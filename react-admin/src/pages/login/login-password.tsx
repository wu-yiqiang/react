import './login.scss'
import { Button, Form, Input, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/api/public'
import eventMitt from '@/utils/eventMitt'
import Toast from '@/components/Toast'
import { useState } from 'react'
import {AES_ECB_ENCRYPT} from '@/utils/encrypt'
import { cloneDeep } from 'lodash-es'
function LoginPassword() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = async (value: any) => {
    setLoading(true)
    const params = cloneDeep(value)
    // params.password = AES_ECB_ENCRYPT(params.password)
    const { data } = await login(params).finally(() => {
      setLoading(false)
    })
    if (data?.token) {
      const datas = data
      datas.menus = data?.roles.reduce((acc: any, val: any) => acc.concat(val.menus), []);
      eventMitt.emit('STORE:USER', datas)
      eventMitt.emit('ROUTER:KEY', 'personal')
      window.location.reload()
      Toast.success('登录成功')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="LoginPassword">
      <Form name="basic" initialValues={{ email: 'sutter.wu@itforce-tech.com', password: '1234@Abcd' }} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} autoComplete="off">
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <div className="submit">
            <Button loading={loading} block htmlType="submit">
              注册
            </Button>
            <Button type="primary" loading={loading} block htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>

      {/* <Divider>Or</Divider> */}
    </div>
  )
}

export default LoginPassword
