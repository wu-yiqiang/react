import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import { File, FileItem } from '@/types/file'
import { DialogProps } from '@/types/common'
import { createFold } from '@/api/share'
import { CarryOutOutlined } from '@ant-design/icons'
export default function MoveDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState([
    {
      value: 'parent 1',
      title: 'parent 1',
      icon: <CarryOutOutlined />,
      children: [
        {
          value: 'parent 1-0',
          title: 'parent 1-0',
          icon: <CarryOutOutlined />,
          children: [
            {
              value: 'leaf1',
              title: 'leaf1',
              icon: <CarryOutOutlined />,
            },
            {
              value: 'leaf2',
              title: 'leaf2',
              icon: <CarryOutOutlined />,
            },
          ],
        },
        {
          value: 'parent 1-1',
          title: 'parent 1-1',
          icon: <CarryOutOutlined />,
          children: [
            {
              value: 'sss',
              title: 'sss',
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ],
    },
  ])
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
    // if (!id) {
    //   setEditStatus(false)
    //   form.setFieldsValue(new File())
    // }
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal title="移动" width={360} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Spin spinning={loading} size="large">
        {loading ? null : (
          <Form id="form" form={form} layout="horizontal">
            <Form.Item name="fileName" rules={requiredRules}>
              <TreeSelect treeLine={true} treeData={treeData} />
            </Form.Item>
          </Form>
        )}
      </Spin>
    </Modal>
  )
}
