import { Form, Button, Modal, Row, Col, Checkbox, Tree, Card, TableProps, Table } from 'antd'
import { useEffect, useState } from 'react'
import { RoleItem, Role } from '@/types/role'
import { DialogProps } from '@/types/common'
import Tabular from '@/components/Tabular.tsx'
import { getMenuItem } from '@/api/system'
import { useTranslation } from 'react-i18next'
import { cross, diff } from '@/utils'
import { IntefaceItem } from '@/types/inteface'
import TableCell from '@/components/TableCell'
const CheckboxGroup = Checkbox.Group
export default function UserAddDialog(props: any) {
  const { id,open, handleClose, handleOk, roleButtons, roleIntefaces } = props
  const [checkedLists, setCheckedLists] = useState<Array<any>>([])
  const [buttons, setButtons] = useState([])
  const { t } = useTranslation()
  const [lists, setLists] = useState([])
  const [checkedButtons, setCheckedButtons] = useState<Array<any>>([])
  const [remaindButtons, setRemaindButtons] = useState<Array<any>>([])
  const [remaindIntefaes, setRemaindIntefaces] = useState<Array<any>>([])
  const [form] = Form.useForm<RoleItem>()
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    const checkedAllButtons = [...new Set(checkedButtons.concat(remaindButtons))]
    const checkedAllIntefaces = [...new Set(checkedLists.concat(remaindIntefaes))]
    handleOk({ buttons: checkedAllButtons, intefaces: checkedAllIntefaces })
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '请求方式',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (value: string | number) => {
        return <TableCell value={value} type="intefaceType" />
      }
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      key: 'path'
    }
  ]
  const rowSelection = {
    selectedRowKeys: checkedLists,
    onSelect: (record: IntefaceItem, selected: boolean) => {
      const key = record?.id
      if (selected) {
        setCheckedLists([...checkedLists, key].filter(Boolean))
      } else {
        setCheckedLists(checkedLists.filter((item) => item !== key))
      }
    },
    onSelectAll: (selected: boolean, selectedRows: any, changeRows: IntefaceItem[]) => {
      const keys = changeRows?.map((item: any) => item.id)
      if (selected) {
        setCheckedLists([...checkedLists, ...keys])
      } else {
        setCheckedLists(diff(checkedLists, keys))
      }
    }
  }
  const getMenuDetails = async () => {
    const { data } = await getMenuItem(id)
    const btns = data?.buttons?.map((item: any) => {
      item.label = item?.name
      item.value = item?.id
      return item
    })
    setButtons(btns ?? [])
    setLists(data?.intefaces ?? [])
  }
  const getRoleButtons = () => {
    const btns = buttons?.map((item: any) => {
      return item?.id
    })?.filter(Boolean)
    const crossBtns = cross(roleButtons ?? [], btns)
    const diffBtns = diff(roleButtons ?? [], crossBtns)
    setRemaindButtons(diffBtns ?? [])
    setCheckedButtons(crossBtns ?? [])
  }
  const getRoleIntefaces = () => {
    const intefaces = lists
      ?.map((item: any) => {
        return item?.id
      })
      ?.filter(Boolean)
    const crossIntefaces = cross(roleIntefaces ?? [], intefaces)
    const diffIntefaces = diff(roleIntefaces ?? [], crossIntefaces)
    setRemaindIntefaces(diffIntefaces ?? [])
    setCheckedLists(crossIntefaces ?? [])
  }
  const onChangeButtons = (list: number[]) => {
    setCheckedButtons(list)
  }
  useEffect( () => {
    getMenuDetails()
  }, [open])
  useEffect(() => {
    getRoleButtons()
  }, [buttons])
  useEffect(() => {
    getRoleIntefaces()
  }, [lists])
  return (
    <Modal title="添加权限" width={700} centered forceRender maskClosable={false} destroyOnClose={true} styles={{ body: { maxHeight: '400px', overflow: 'auto' } }} open={open} onOk={submit} onCancel={close}>
      <CheckboxGroup options={buttons} value={checkedButtons} onChange={onChangeButtons} />
      <Table
        rowSelection={{ ...rowSelection }}
        // onRow={(record) => {
        //   return {
        //     onClick: (event) => {
        //       console.log("行点击", record)
        //     },
        //   }
        // }}
        rowKey="id"
        dataSource={lists}
        columns={columns}
        pagination={false}
      />
    </Modal>
  )
}
