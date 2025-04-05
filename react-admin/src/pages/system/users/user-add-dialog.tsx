import { Form, Input, Modal, Upload, Select, Row, Col, Spin, Image } from 'antd'
import { useEffect, useState } from 'react'
import { postUser, updateUserDetail, getUserDetail } from '@/api/system'
import { upload } from '@/api/public'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { emailRequiredRules, requiredRules } from '@/validator/index'
import { User } from '@/types/user'
import { DialogProps } from '@/types/common'
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
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
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new User())
    }
    if (id) {
      await setTitle('编辑')
      setEditStatus(true)
      setLoading(true)
      const response = await getUserDetail(id)?.finally(() => {
        setLoading(false)
      })
      const data = response?.data
      if (!data) {
        Toast.error('未获取到用户数据')
        return
      }
      form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [id])
  const handleUpload = async (info: object) => {
    const file = info?.file
    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    const { data } = await upload(formData)
    form.setFieldValue('avatar', data)
    console.log('sds', form.getFieldValue('avatar'))
    setLoading(false)
  }
  const beforeUpload = (file: File) => {
    const fileType = file?.type
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      Toast.error('请上传 JPEG 或 PNG 格式的图片')
      return false
    }
    return true
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )
  return (
    <Modal title={title} width={800} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} labelCol={{ span: '4' }} layout="inline">
            <Row>
              <Col span={12}>
                <Form.Item label="头像" name="avatar">
                  <Upload name="avatar" listType="picture-card" className="avatar-uploader" accept=".jpg,.jpeg,.png" showUploadList={false} beforeUpload={(file: File) => beforeUpload(file)} customRequest={handleUpload}>
                    {form?.getFieldValue('avatar') ? (
                      <Image
                        width='100%'
                        height='100%'
                        preview={false}
                        src={form?.getFieldValue('avatar')}
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
                <Form.Item label="邮箱" name="email" rules={emailRequiredRules}>
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
        )}
      </Spin>
    </Modal>
  )
}
