import './index.scss'
import { Button, Space, Form, Input, Row, Typography, Col } from 'antd'
const { Title } = Typography

export default function SelfService() {
  const onFinish = () => { }
  const onFinishFailed = () => {}
  return (
    <div className="SelfService">
      <Title level={5}>个人信息</Title>
      <div className="contents">
        <Form labelCol={{ style: { width: 100 } }} style={{ maxWidth: 400 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="联系电话" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="家庭住址" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="紧急联系电话" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="修改密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
