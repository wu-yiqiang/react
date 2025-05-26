import { Form, Input, Modal, Row, Col, Radio, Tree, Card } from 'antd'
import { useEffect, useState } from 'react'
import { postRoleItem, getRoleDetails, getMenuTreeLists, putRoleItem } from '@/api/system'
import { isEmpty } from 'lodash-es'
import { RoleItem, Role } from '@/types/role'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import type { TreeDataNode, TreeProps } from 'antd'
import { DialogProps } from '@/types/common'
const { TextArea } = Input
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [treeData, setTreeData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [form] = Form.useForm<RoleItem>()
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const value = await form.validateFields()
    if (value) {
      const values = form.getFieldsValue()
      const datas = { ...values }
      if (!editStatus) await postRoleItem(datas)
      if (editStatus) await putRoleItem(datas)
      Toast.success('操作成功')
      handleOk(values)
    }
  }
  const fetchData = async (id: number) => {
    const response = await getRoleDetails(id)
    return response?.data ?? {}
  }
  const init = async () => {
    const { data } = await getMenuTreeLists()
    setTreeData(data)
    if (isEmpty(id)) {
      setEditStatus(false)
      form.setFieldsValue(new Role())
      await setTitle('新增')
    }
    if (id) {
      setEditStatus(true)
      const data = await fetchData(id)
      await setTitle('编辑')
      form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [id])

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue, { halfCheckedKeys }) => {
    setCheckedKeys(checkedKeysValue?.checked as React.Key[])
    form.setFieldValue('menus', checkedKeysValue?.checked ?? [])
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info)
  }

  const dataPermissionLists: TreeDataNode[] = [
    {
      title: '安东集团',
      key: 'anton',
      children: [
        {
          title: '迪拜分公司',
          key: 'dubai',
          children: [
            { title: '运维部门', key: 'maintenance' },
            { title: '开发部门', key: 'develop' },
            { title: '财务部门', key: 'finance' },
            { title: '后勤部门', key: 'logistics' }
          ]
        }
      ]
    }
  ]
  return (
    <Modal title={title} width='100%' centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Form id="form" style={{ maxHeight: '100%', overflowY: 'scroll', overflowX: 'hidden' }} form={form} labelCol={{ span: '4' }} layout="inline">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="角色名称" name="name" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="角色标识" name="code" rules={requiredRules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="状态" name="status">
              <Radio.Group
                value={form.getFieldValue('status')}
                options={[
                  { value: 1, label: '启用' },
                  { value: 0, label: '禁用' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="菜单权限" name="menus" rules={requiredRules}>
              <Card>{treeData?.length ? <Tree checkable onCheck={onCheck} autoExpandParent={true} defaultExpandAll checkStrictly={ true } checkedKeys={form.getFieldValue('menus')}  fieldNames={{ title: 'name', key: 'id' }} treeData={treeData} /> : null}</Card>
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <Form.Item label="数据权限" name="email" rules={requiredRules}>
              <Card>
                <Tree checkable autoExpandParent={true} onCheck={onCheck} checkedKeys={checkedKeys} onSelect={onSelect} selectedKeys={selectedKeys} treeData={dataPermissionLists} />
              </Card>
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item label="描述" name="remark">
              <TextArea placeholder="remark" autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
          </Col>
          <Form.Item hidden label="ID" name="id">
            <Input hidden />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}
