import { Form, Input, Modal, Row, Col, Spin, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import { postDictionaryItem, updateDictionaryItem, getDictionaryItem } from '@/api/system'
import Toast from '@/components/Toast'
import {  requiredRules } from '@/validator/index'
import { Dictionary } from '@/types/dictionary'
import { DialogProps } from '@/types/common'
const { TextArea } = Input;
export default function DictionaryAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  interface Option {
    id: string
    name: string
    children?: Option[]
  }
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      if (!editStatus) await postDictionaryItem(values)
      if (editStatus) await updateDictionaryItem(values)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const init = async () => {
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new Dictionary())
    }
    if (id) {
      await setTitle('编辑')
      setEditStatus(true)
      setLoading(true)
      const response = await getDictionaryItem(id)?.finally(() => {
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
  return (
    <Modal title={title} width={500} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form
            id="form"
            form={form}
            labelAlign="right"
            labelCol={{
              style: { width: 80 }
            }}
            layout="inline"
          >
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Form.Item label="字典类型" name="mappingType" rules={requiredRules}>
                  <Input placeholder="字典类型" disabled={editStatus} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="字典标识" name="mappingValue" rules={requiredRules}>
                  <InputNumber placeholder="字典标识" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="字典标签" name="name" rules={requiredRules}>
                  <Input placeholder="字典标签" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="字典描述" name="description">
                  <TextArea placeholder="字典描述" rows={3} />
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
