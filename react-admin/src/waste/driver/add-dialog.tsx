import { Form, Input,Modal } from 'antd'
import { useEffect } from 'react'
export default function AddDialog(props: any) {
  const { open,formState, handleClose, handleOk } = props
  const [form] = Form.useForm()
  const submitQuery = (value: any) => {
    // const data = form.getFieldsValue()
    console.log('ssds萨达萨达舒服舒服', value)
    // handleSearch(data)
  }
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = () => {
    const values = form.getFieldsValue()
    handleOk(values)
  }
  useEffect(() => {
    form.setFieldsValue(formState)
  })
  return (
    <Modal title="Basic Modal" destroyOnClose open={open} onOk={submit} onCancel={close}>
      <Form id="form" form={form} layout="inline" onFinish={submitQuery}>
        <Form.Item label="公司名" name="companyName">
          <Input />
        </Form.Item>
        <Form.Item label="公司名2" name="email">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
