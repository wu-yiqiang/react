import { Form, Input, Modal, Upload, Row, Col, Spin  } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { upload } from '@/api/public'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { requiredRules } from '@/validator/index'
import { User } from '@/types/user'
import { DialogProps } from '@/types/common'
import DictsSelector from '@/components/DictsSelector'
import { getShopDetails, postShopItem, updateShopItem } from '@/api/commodity'
import TextArea from 'antd/es/input/TextArea'
import Img from '@/components/Img'
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [previewOpen, setPreviewOpen] = useState(false)
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
      if (!editStatus) {
        await postShopItem(values) 
        Toast.success('店铺添加成功')
      }
      if (editStatus) {
        await updateShopItem(values)
        Toast.success('店铺信息更新成功')
      }
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
      const response = await getShopDetails(id)?.finally(() => {
        setLoading(false)
      })
      const data = response?.data
      if (!data) {
        Toast.error('未获取到店铺数据')
        return
      }
      form.setFieldsValue(data)
    }
  }
  const handlePreview = () => {
    setPreviewOpen(true)
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
    form.setFieldValue('fileName', data)
  }
  const beforeUpload = (file: File) => {
    const fileType = file?.type
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      Toast.error('请上传 JPEG 或 PNG 格式的图片')
      return false
    }
    return true
  }
      const avatar = useMemo(() => {
          return form?.getFieldValue('fileName')
      }, [form?.getFieldValue('fileName')])
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )
  return (
    <Modal title={title} width={600} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} labelAlign="left" labelCol={{ style: { width: 100 } }} layout="horizontal">
            <Row>
              <Col span={12}>
                <Form.Item label="店铺图" name="fileName" rules={requiredRules}>
                  <Upload name="fileName" listType="picture-card" accept=".jpg,.jpeg,.png" showUploadList={false} beforeUpload={(file: File) => beforeUpload(file)} maxCount={1} customRequest={handleUpload} onPreview={handlePreview}>
                    {avatar ? <Img fileName={avatar} previewOpen={previewOpen} /> : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="店铺名称" name="name" rules={requiredRules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="店铺地址" name="shopAddress" rules={requiredRules}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item label="店铺状态" name="status" rules={requiredRules}>
                <DictsSelector type="ShopStatus" onChange={(value: number) => form.setFieldValue('status', value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="店铺描述" name="description">
                <TextArea placeholder="店铺描述" rows={3} />
              </Form.Item>
            </Col>
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
