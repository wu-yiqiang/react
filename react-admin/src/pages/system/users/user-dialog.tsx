import { Form, Input, Modal, Upload, Select, Row, Col, Spin, Image, Avatar, UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import { postUser, updateUserDetail, getUserDetail, getRoleOptions } from '@/api/system'
import { upload } from '@/api/public'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { emailRequiredRules, requiredRules } from '@/validator/index'
import { User } from '@/types/user'
import { DialogProps } from '@/types/common'
import DictsSelector from '@/components/DictsSelector'
import ImgCrop from 'antd-img-crop'
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
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
  const getRoles = async () => {
    const { data } = await getRoleOptions()
    console.log('role', data)
    setRoles(data ?? [])
  }
  const init = async () => {
    await getRoles()
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
    // @ts-ignore
    const file = info?.file
    setLoading(true)
    const { data } = await upload(file).finally(() => {
      setLoading(false)
    })
    form.setFieldValue('avatar', data)
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
    <Modal title={title} width={600} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} labelAlign="left" labelCol={{ style: { width: 60 } }} layout="horizontal">
            <Row>
              <Col span={12}>
                <Form.Item label="头像" name="avatar">
                  <Upload name="avatar" listType="picture-card" accept=".jpg,.jpeg,.png" showUploadList={false} beforeUpload={(file: File) => beforeUpload(file)} maxCount={1} customRequest={handleUpload}>
                    {form?.getFieldValue('avatar') ? <Image preview={false} style={{ width: '100px', height: '100px', objectFit: 'cover', objectPosition: 'top', borderRadius: '2px' }} src={form?.getFieldValue('avatar')} /> : uploadButton}
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
                  <DictsSelector type="status" onChange={(value: number) => form.setFieldValue('status', value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="角色" name="roles" rules={requiredRules}>
                  <Select mode="multiple" options={roles} fieldNames={{ label: 'name', value: 'id' }}></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
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
