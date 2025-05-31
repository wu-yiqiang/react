import { Form, Button, Modal, Row, Col, Checkbox, Tree, Card, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { RoleItem, Role } from '@/types/role'
import { DialogProps } from '@/types/common'
import Tabular from '@/components/Tabular.tsx'
import { getIntefaceLists, getButtonsOpts } from '@/api/system'
import { UserSearch, UserItem } from '@/types/user'
import { useTranslation } from 'react-i18next'
import { intefaceType } from '@/common/const'
import { diff } from '@/utils'
const CheckboxGroup = Checkbox.Group
export default function UserAddDialog(props: DialogProps) {
  const { open, handleClose, handleOk } = props
  const [checkedLists, setCheckedLists] = useState([])
  const [buttons, setButtons] = useState([])
  const [checkedButtons, setCheckedButtons] = useState([])
  const [form] = Form.useForm<RoleItem>()
  const close = () => {
    form.resetFields()
    handleClose()
  }
  const submit = async () => {
    console.log('checked', checkedLists)
    // handleOk()
  }

  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<UserSearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
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
      render: (value: string | number) => <>{intefaceType?.find((item) => item.code == value)?.label}</>
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      key: 'path'
    },
  ]
  const searchOptions = [{ name: 'search', label: t('Search'), type: 'input' }]
  const handleSearch = async (values: UserSearch) => {
    const { data } = await getIntefaceLists(values)
    setLists(data.lists)
    const datas = {
      pageSize: data.pageSize,
      pageNo: data.pageNo
    }
    setTotal(data?.total)
    setQueryData({ ...queryData, ...datas })
  }
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    selectedRowKeys: checkedLists,
    onSelect: (record: React.Key[], selected) => {
      const key = record?.id
      if (selected) {
        setCheckedLists([...checkedLists, key])
      } else {
        setCheckedLists(checkedLists.filter((item) => item !== key))
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const keys = changeRows?.map((item) => item.id)
      if (selected) {
        setCheckedLists([...checkedLists, ...keys])
      } else {
        setCheckedLists(diff(checkedLists, keys))
      }
      console.log('ssss', checkedLists)
    }
  }
  const getButtons = async () => {
    const { data } = await getButtonsOpts()
    const lists = data?.map((item) => {
      item.value = item.id
      item.label = item?.name
      return item
    } )
    setButtons(lists ?? [])
  }
  const onChange = (list: string[] | number[]) => {
    setCheckedButtons(list)
  }
  useEffect(() => {
    getButtons()
  }, [])
  return (
    <Modal title="添加权限" width={900} centered forceRender maskClosable={false} destroyOnClose={true} styles={{ body: { height: '500px', overflow: 'auto' } }} open={open} onOk={submit} onCancel={close}>
      <Tabular dataSource={lists} total={total} pageNo={queryData.pageNo} pageSize={queryData.pageSize} columns={columns} data={queryData} rowSelection={{ type: 'checkbox', ...rowSelection }} preserveSelectedRowKeys={true} searchOptions={searchOptions} handleSearch={handleSearch} left={<CheckboxGroup options={buttons} value={checkedButtons} onChange={onChange} />}></Tabular>
    </Modal>
  )
}
