import { Form, Input, Modal, Row, Col, Radio, Tree, Card } from 'antd'
import { useEffect, useState } from 'react'
import { postRoleItem, getRoleDetails, getMenuTreeLists, putRoleItem } from '@/api/system'
import { isEmpty } from 'lodash-es'
import { RoleItem, Role } from '@/types/role'
import Toast from '@/components/Toast'
import { requiredRules } from '@/validator/index'
import type { TreeDataNode, TreeProps } from 'antd'
import PermissionDialog from './permission-dialog'
import { DialogProps } from '@/types/common'
import DictsRadioGroup from '@/components/DictsRadioGroup'
const { TextArea } = Input
export default function UserAddDialog(props: DialogProps) {
  const { open, id, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
  const [title, setTitle] = useState('新增')
  const [treeData, setTreeData] = useState([])
  const [visible, setVisible] = useState(false)
  const [menuId, setMenuId] = useState(0)
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
    setTreeData(data?.map((item: any) => {
      if (item.id == 1) item.disableCheckbox = true
      return item
    }))
    if (isEmpty(id)) {
      setEditStatus(false)
      form.setFieldsValue(new Role())
      await setTitle('新增')
    }
    if (id) {
      setEditStatus(true)
      const data = await fetchData(id)
      data.menus = data?.menus?.map((item: any) => item.id) ?? []
      data.buttons = data?.buttons?.map((item: any) => item.id) ?? []
      data.intefaces = data?.intefaces?.map((item: any) => item.id) ?? []
      await setTitle('编辑')
      form.setFieldsValue(data)
    }
  }
  useEffect(() => {
    init()
  }, [id])

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue?.checked)
    form.setFieldValue('menus', checkedKeysValue?.checked ?? [])
  }
  const handleSelect = (value: any) => {
    setMenuId(value[0])
    setVisible(true)
  }
  const handleClose2 = () => {
    setVisible(false)
  }
  const handleOk2 = (value: any) => {
    const {buttons, intefaces} = value
    form.setFieldValue('buttons', buttons)
    form.setFieldValue('intefaces', intefaces)
    setVisible(false)
  }

  const dataPermissionLists: TreeDataNode[] = [
    {
      title: 'TL集团',
      key: 'anton',
      children: [
        {
          title: '北京公司',
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
    <Modal title={title} centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
      <Form id="form" style={{ maxHeight: '500px', overflowY: 'scroll', overflowX: 'hidden' }} form={form} labelCol={{ span: '4' }} layout="horizontal">
        <Row>
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
          {/* <Col span={24}>
            <Form.Item label="状态" name="status">
              <DictsRadioGroup type="status" onSelect={(value: number) => form.setFieldValue('status', value)} />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item label="菜单权限" name="menus" rules={requiredRules}>
              <Card>{treeData?.length ? <Tree checkable onCheck={onCheck} autoExpandParent={true} defaultExpandAll checkStrictly={true} checkedKeys={form.getFieldValue('menus')} onSelect={handleSelect} fieldNames={{ title: 'name', key: 'id' }} treeData={treeData} /> : null}</Card>
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
          <Form.Item hidden name="buttons">
          </Form.Item>
          <Form.Item hidden  name="intefaces">
          </Form.Item>
          <Form.Item hidden label="ID" name="id">
            <Input hidden />
          </Form.Item>
        </Row>
      </Form>
      {visible && menuId ? <PermissionDialog open={visible} handleClose={handleClose2} handleOk={handleOk2} id={menuId} roleButtons={form.getFieldValue('buttons')} roleIntefaces={form.getFieldValue('intefaces')} /> : null}
    </Modal>
  )
}
