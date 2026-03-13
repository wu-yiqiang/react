import { Form, Input, Modal, InputNumber, Row, Col, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { postButtonItem, updateButtonItem, getButtonItem } from '@/api/system'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import { DialogProps } from '@/types/common'
import { Button } from '@/types/button'
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
      if (!editStatus) await postButtonItem(values)
      if (editStatus) await updateButtonItem(values)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const init = async () => {
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new Button())
    }
    if (id) {
      await setTitle('编辑')
      setEditStatus(true)
      setLoading(true)
      const { data } = await getButtonItem(id)?.finally(() => {
        setLoading(false)
      })
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
  return (
    <Modal title={title} width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} labelAlign="left" labelCol={{ style: { width: 80 } }} layout="horizontal">
            <Row>
              <Col span={24}>
                <Form.Item label="名称" name="name" rules={requiredRules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="权限标识" name="code" rules={requiredRules}>
                  <Input style={{ width: '100%' }} />
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
