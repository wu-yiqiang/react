import { Form, Input, Modal, Select, Row, Col, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { postIntefaceItem, updateIntefaceItem, getIntefaceItem } from '@/api/system'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import { Inteface } from '@/types/inteface'
import { DialogProps } from '@/types/common'
import DictsSelector from '@/components/DictsSelector'
export default function IntefaceDialog(props: DialogProps) {
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
      if (!editStatus) await postIntefaceItem(values)
      if (editStatus) await updateIntefaceItem(values)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const init = async () => {
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new Inteface())
    }
    if (id) {
      await setTitle('编辑')
      setEditStatus(true)
      setLoading(true)
      const { data } = await getIntefaceItem(id)?.finally(() => {
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
    <Modal title={title} width={550} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
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
                <Form.Item label="请求方式" name="type" rules={requiredRules}>
                  <DictsSelector type="intefaceType" onChange={(value: number) => form.setFieldValue('type', value)} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="请求路径" name="path" rules={requiredRules}>
                  <Input />
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
