import { Form, Input, Modal, Cascader, TreeSelect, Row, Col, Spin, Radio, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import { postMenuItem, updateMenuItem, getMenuItem, getMenuTreeLists } from '@/api/system'
import Toast from '@/components/Toast'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import {  requiredRules } from '@/validator/index'
import { Menu } from '@/types/menu'
import { DialogProps } from '@/types/common'
export default function UserAddDialog(props: DialogProps) {
  const {open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [loading, setLoading] = useState(false)
  const [menuOpts, setMenuOpts] = useState<Option[]>([])
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
      if (!editStatus) await postMenuItem(values)
      if (editStatus) await updateMenuItem(values)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const getTreeOpts = async () => {
    const { data } = await getMenuTreeLists()
    setMenuOpts(data ?? [])
  }
  const init = async () => {
    await getTreeOpts()
    if (!id) {
      await setTitle('新增')
      setEditStatus(false)
      form.setFieldsValue(new Menu())
    }
    if (id) {
      await setTitle('编辑')
      setEditStatus(true)
      setLoading(true)
      const response = await getMenuItem(id)?.finally(() => {
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
    <Modal title={title} width={700} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
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
                <Form.Item label="菜单名称" name="name" rules={requiredRules}>
                  <Input placeholder="菜单名称" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="上级菜单" name="parent_id">
                  <TreeSelect treeData={menuOpts} placeholder="上级菜单" fieldNames={{ label: 'name', value: 'id' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="菜单类型" name="menu_type" rules={requiredRules}>
                  <Radio.Group
                    value={form.getFieldValue('menu_type')}
                    options={[
                      { value: 'M', label: '目录' },
                      { value: 'C', label: '菜单' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="权限标识" name="perms" rules={requiredRules}>
                  <Input placeholder="权限标识" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="显示排序" name="order_num" rules={requiredRules}>
                  <InputNumber placeholder="显示排序" min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="路由地址" name="path" rules={requiredRules}>
                  <Input placeholder="路由地址" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="组件路径" name="component" rules={requiredRules}>
                  <Input placeholder="组件路径" />
                </Form.Item>
              </Col>
              <Form.Item hidden label="ID" name="id">
                <Input hidden />
              </Form.Item>
              {/* <Col span={12}>
                <Form.Item label="菜单状态" name="status" rules={requiredRules}>
                  <Radio.Group
                    value={form.getFieldValue('status')}
                    options={[
                      { value: 1, label: '启用' },
                      { value: 0, label: '禁用' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="显示状态" name="id">
                  <Radio.Group
                    value={form.getFieldValue('status')}
                    options={[
                      { value: 1, label: '显示' },
                      { value: 0, label: '隐藏' }
                    ]}
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </Form>
        )}
      </Spin>
    </Modal>
  )
}
