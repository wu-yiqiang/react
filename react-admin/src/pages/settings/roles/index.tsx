import Tabular from '@/components/Tabular.tsx'
import { getRolesLists, deleteRoleItem } from '@/api/settings'
import { useState } from 'react'
import { UserSearch } from '@/types/user'
import RoleAddDialog from './role-add-dialog'
import './role-manager.scss'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
export default function UserManager() {
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userId, setUserId] = useState(0)
  const [total, setTotal] = useState(0)
  // const [pager, setPager] = useState({

  // })
  const [queryData, setQueryData] = useState<UserSearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
  const handleEdit = (id: number) => {
    setUserId(id)
    setDialogOpen(true)
  }
  const handleDelete = async (id: number) => {
    await deleteRoleItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '  编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '状态',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      render: (value, record, index) => {
        return (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
          </Space>
        )
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: object) => {
    const { data } = await getRolesLists(values)
    setLists(data.lists)
    const datas = {
      pageSize: data.pageSize,
      pageNo: data.pageNo
    }
    setTotal(data?.total)
    setQueryData({ ...queryData, ...datas })
  }
  const handleNew = () => {
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleOk = async () => {
    setDialogOpen(false)
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  return (
    <>
      <Tabular
        dataSource={lists}
        total={total}
        pageNo={queryData.pageNo}
        pageSize={queryData.pageSize}
        columns={columns}
        data={queryData}
        searchOptions={searchOptions}
        handleSearch={handleSearch}
        right={
          <Button type="primary" onClick={handleNew}>
            新增
          </Button>
        }
      ></Tabular>
      <RoleAddDialog open={dialogOpen} handleSearch={handleSearch} handleClose={handleClose} handleOk={handleOk} userId={userId} />
    </>
  )
}
