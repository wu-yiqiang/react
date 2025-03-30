import Tabular from '@/components/Tabular.tsx'
import { getUsersLists } from '@/api/settings'
import { useState } from 'react'
import { UserSearch } from '@/types/user'
import UserAddDialog from './user-add-dialog'
import './user-manager.scss'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
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
  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '号码',
      dataIndex: 'phone_number',
      key: 'phoneNumber'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles'
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      render: (value, record, index) => {
        return <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: object) => {
    const { data } = await getUsersLists(values)
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
      <UserAddDialog open={dialogOpen} handleSearch={handleSearch} handleClose={handleClose} handleOk={handleOk} userId={userId} />
    </>
  )
}
