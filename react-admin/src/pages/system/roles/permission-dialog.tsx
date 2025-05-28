import { Form, Input, Modal, Row, Col, Radio, Tree, Card } from 'antd'
import { useEffect, useState } from 'react'
import { postRoleItem, getRoleDetails, getMenuTreeLists, putRoleItem } from '@/api/system'
import { isEmpty } from 'lodash-es'
import { RoleItem, Role } from '@/types/role'
import Toast from '@/components/Toast'
import { DialogProps } from '@/types/common'
export default function UserAddDialog(props: DialogProps) {
  const { open, handleClose, handleOk } = props
  const [editStatus, setEditStatus] = useState(false)
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

  return (
    <Modal title='添加权限' centered forceRender maskClosable={false} destroyOnClose={true} open={open} onOk={submit} onCancel={close}>
        sad1
    </Modal>
  )
}
