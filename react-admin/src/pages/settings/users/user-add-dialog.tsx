import { Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from 'react'
import { postUser, updateUserDetail, getUserDetail } from '@/api/settings'
import { Select, Row, Col } from 'antd'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
class User {
  username: string
  email: string
  password: string
  avatar: string
  phone_number: string
  status: number | null
  constructor() {
    this.username = ''
    this.email = ''
    this.password = ''
    this.avatar = ''
    this.phone_number = ''
    this.status = null
  }
}
export default function UserAddDialog(props: any) {
  const { open, handleClose, handleOk, userId } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const emailRules = [
    { required: true, message: '请输入' },
    { type: 'email', message: '请输入合法的邮箱' }
  ]
  const requiredRules = [{ required: true, message: '请输入' }]
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      if (!editStatus) await postUser(values)
      if (editStatus) await updateUserDetail(values)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const init = async () => {
    if (!userId) {
      setEditStatus(false)
      form.setFieldsValue(new User())
      await setTitle('新增')
    }
    if (userId) {
      setEditStatus(true)
      const { data } = await getUserDetail(userId)
      await setTitle('编辑')
      form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [userId])
   const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
       {loading ? <LoadingOutlined /> : <PlusOutlined />}
       <div style={{ marginTop: 8 }}>Upload</div>
     </button>
   );
  return (
    <Modal
      title={title}
      width={800}
      centered
      forceRender
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onOk={submit}
      onCancel={close}
    >
      <Form id="form" form={form} labelCol={{ span: "4" }} layout="inline">
        <Row>
          <Col span={12}>
            <Form.Item label="头像" name="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1/upload"
              >
                {form?.getFieldValue("avatar") ? (
                  <img
                    src={form?.getFieldValue("avatar")}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="姓名" name="username" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="邮箱" name="email" rules={emailRules}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="号码" name="phone_number" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="状态" name="status" rules={requiredRules}>
              <Select>
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Disabled</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {/* <Col span={12}>
            <Form.Item label="角色" name="email" rules={requiredRules}>
              <Select>
                <Select.Option value="sample">Sample</Select.Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item label="密码" name="password" rules={requiredRules}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Form.Item hidden label="ID" name="id">
            <Input hidden />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
}
