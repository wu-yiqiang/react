import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { postUser, getContractorDetail } from '@/api/settings'
import {AES_ECB_ENCRYPT} from '@/utils/encrypt'
import { isEmpty } from 'lodash-es'
import { message, Select, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
class User {
  username: string
  email: string
  password: string
  avatar: string
  phoneNumber: string
  status: Number | null
  constructor() {
    this.username = ''
    this.email = ''
    this.password = ''
    this.avatar = ''
    this.phoneNumber = ''
    this.status = null
  }
}
export default function UserAddDialog(props: any) {
  const { open, handleClose, target, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
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
      const datas = { ...values }
     // datas.password = AES_ECB_ENCRYPT(datas.password, datas.email)
      console.log('sadasda', datas)
      if (!editStatus) await postUser(datas)
      // if (editStatus) await putContractor(target.uuid, datas)
      message.destroy()
      message.success('操作成功')
      handleOk(values)
    }
  }
  const fetchData = async (target: any) => {
    const { data } = await getContractorDetail(target.uuid)
    return data
  }
  const init = async () => {
    if (isEmpty(target)) {
      setEditStatus(false)
      form.setFieldsValue(new User())
      await setTitle('新增')
    }
    if (!isEmpty(target)) {
      setEditStatus(true)
      const data = await fetchData(target)
      await setTitle('编辑')
      form.setFieldsValue(data)
    }
  }
  const handleUploadImg = () => {
    const reader = new FileReader()
    const f: any = document.getElementById('img')
    f?.click()
    f.onchange = async function (e: any) {
      const file = e.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = function () {
        form.setFieldValue('picture', this.result)
      }
    }
  }
  useEffect(() => {
    init()
  }, [target])
  return (
    <Modal title={title} width={800} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Form id="form" form={form} labelCol={{ span: '4' }} layout="inline">
        <Row>
          <Col span={12}>
            <Form.Item label="头像" name="avatar">
              <div className="image">{form.getFieldValue('avatar') ? <img src={form.getFieldValue('avatar')} alt="" /> : <PlusOutlined onClick={handleUploadImg} />}</div>
              <input id="img" type="file" accept="image/*" style={{ display: 'none' }} />
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
            <Form.Item label="号码" name="phoneNumber" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="激活" name="status" rules={requiredRules}>
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
        </Row>
      </Form>
    </Modal>
  )
}
