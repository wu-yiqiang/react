import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { postUser, getContractorDetail } from '@/api/settings'
import {AES_ECB_ENCRYPT} from '@/utils/encrypt'
import { isEmpty } from 'lodash-es'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
class Contractor {
  name: string
  email: string
  // gender: number
  picture: string
  password: string
  constructor() {
    this.name = ''
    this.email = ''
    this.password = ''
    // this.gender = 0
    this.picture = ''
  }
}
export default function UserAddDialog(props: any) {
  const { open, handleClose, target, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [form] = Form.useForm()
  const emailRules = [
    { required: true, message: '请输入' },
    { type: 'email', message: '请输入合法的邮箱' }
  ]
  // const genderRules = [{ required: true, message: '请输入' }]
  const companyRules = [{ required: true, message: '请输入' }]
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      const datas = { ...values }
      datas.password = AES_ECB_ENCRYPT(datas.password, datas.email)
      console.log('sadasda', datas)
      if (!editStatus) await postUser(datas)
      // if (editStatus) await putContractor(target.uuid, datas)
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
  const handleUploadImg = () => {
    const reader = new FileReader()
    const f: any = document.getElementById('img')
    f?.click()
    f.onchange = async function (e: any) {
      const file = e.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = function () {
        form.setFieldValue('picture', this.result)
      }
    }
  }
  useEffect(() => {
    init()
  }, [target])
  return (
    <Modal title={title} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Form id="form" form={form} labelCol={{ span: '6' }} layout="inline">
        <Form.Item label="姓名" name="name" rules={companyRules}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={emailRules}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        {/* <Form.Item label="性别" name="gender" rules={genderRules}>
          <Radio.Group value={form.gender}>
            <Radio value={0}>男</Radio>
            <Radio value={1}>女</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="照片" name="picture" >
          <div className="image">   
            {
              form.getFieldValue('picture') ? (<img src={form.getFieldValue('picture')} alt="" />) : (<PlusOutlined onClick={handleUploadImg} />)
            }
          </div>
          <input id="img" type="file" accept="image/*" style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
