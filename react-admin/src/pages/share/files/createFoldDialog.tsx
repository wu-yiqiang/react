import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import { File, FileItem } from '@/types/file'
import { createFold } from '@/api/share'
export default function FoldAddDialog(props: any) {
  const { open, id, handleClose, handleOk, current_id } = props
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
      const values = form.getFieldsValue() as FileItem
      if (!editStatus) await createFold(values)
      // if (editStatus) await updateDictionaryItem(values)
      Toast.success('操作成功')
      handleOk(value)
    }
  }
  const init = async () => {
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new File())
      form.setFieldValue('parent_id', current_id)
    }
    if (id) {
      await setTitle('编辑')
      // setEditStatus(true)
      // setLoading(true)
      // const response = await getDictionaryItem(id)?.finally(() => {
      //   setLoading(false)
      // })
      // const data = response?.data
      // if (!data) {
      //   Toast.error('未获取到用户数据')
      //   return
      // }
      // form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [id])
  return (
    <Modal title={title} width={360} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} layout="horizontal">
            <Form.Item name="file_name" rules={requiredRules}>
              <Input placeholder="新建文件夹" maxLength={30} />
            </Form.Item>
            <Form.Item hidden label="ID" name="id">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="isFold" name="is_fold">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="fileSize" name="file_size">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="parentId" name="parent_id">
              <Input hidden />
            </Form.Item>
          </Form>
        )}
      </Spin>
    </Modal>
  )
}
