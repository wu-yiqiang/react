import { Form, Input, Modal, Upload, Select, Row, Col, Spin, Image } from 'antd'
import { useEffect, useState } from 'react'
import {  updateUserPassword } from '@/api/system'
import Toast from '@/components/Toast'
import { emailRequiredRules, requiredRules } from '@/validator/index'
import { DialogProps } from '@/types/common'
import Password from 'antd/es/input/Password'
export default function ResetPasswordDialog(props: DialogProps) {
  const { open, id, handleClose } = props
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
      await updateUserPassword(values)
      Toast.success('操作成功')
      close()
    }
  }
  useEffect(() => {
    form.setFieldsValue({id:id, password: ''})
  }, [id])
  return (
    <Modal title='重置密码' width={400} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} labelAlign="left" labelCol={{ style: { width: 60 } }} layout="inline">
            <Row>
              <Col span={24}>
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
