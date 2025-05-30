import './index.scss'
import { Divider, Typography } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
const { Title } = Typography

export default function SelfService() {
  const onFinish = () => { }
  const onFinishFailed = () => {}
  return (
    <div className="SelfService">
      <Title level={5}>信息修改</Title>
      <div className="contents">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
