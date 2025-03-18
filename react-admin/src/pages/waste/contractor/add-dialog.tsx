import { Form, Input,Modal } from 'antd'
import { useEffect, useState } from 'react'
import { postContractor, getContractorDetail, putContractor } from '@/api/settings'
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
  const [editStatus, setEditStatus] = useState(false)
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
      const datas = { ...values, type: 1 }
      if (!editStatus) await postContractor(datas)
      if (editStatus) await putContractor(target.uuid,datas)
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
      form.setFieldsValue(new Contractor())
      await setTitle('新增')
    }
    if (!isEmpty(target)) {
      setEditStatus(true)
      const data = await fetchData(target)
      await setTitle('编辑')
      form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [target])
  return (
    <Modal title={title} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
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
