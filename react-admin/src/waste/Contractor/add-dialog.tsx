import { Form, Input,Modal } from 'antd'
import { useEffect, useState } from 'react'
import { postContractor, getContractorsDetail } from '@/api/setting'
import {isEmpty} from 'lodash-es'
import { message } from 'antd'
class Contractor {
  companyName: string;
  email: string;
  type: number;
  constructor() {
    this.companyName = ""
    this.email = ""
    this.type = 1
  }
}
export default function AddDialog(props: any) {
  const { open, handleClose, target, handleOk } = props
  const [formStates, setFormStates] = useState(new Contractor())
  const [title, setTitle] = useState('新增')
  const [form] = Form.useForm()
  const emailRules = [{ required: true, message: '请输入' }, {type: 'email', message: '请输入合法的邮箱'}]
  const companyRules = [{required: true, message: '请输入' }]
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields();
    if (value) {
      const values = form.getFieldsValue()
      const datas = {...values, type: 1}
      await postContractor(datas)
      message.destroy()
      message.success('操作成功')
      handleOk(values)
    }
  }
  const fetchData = async (target: any) => {
    const { data } = await getContractorsDetail(target.uuid)
    setFormStates(data ?? {})
  }
  useEffect(() => {
    if (isEmpty(target)) {
      setFormStates(new Contractor())
      setTitle('新增')
    }
    if (!isEmpty(target)) {
      fetchData(target)
      setTitle('编辑')
    }
    form.setFieldsValue(formStates)
  }, [target])
  return (
    <Modal title={title} centered forceRender maskClosable={ false} destroyOnClose open={open} onOk={submit} onCancel={close}>
      <Form id="form" form={form} layout="inline">
        <Form.Item label="承包商" name="companyName" rules={companyRules}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={emailRules}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
