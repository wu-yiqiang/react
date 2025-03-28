import Tabular from '@/components/Tabular.tsx'
import { getUsersLists } from '@/api/settings'
import { useState } from 'react'
import { UserSearch } from "@/types/user";
import UserAddDialog from './user-add-dialog'
import './user-manager.scss'
import { Button } from 'antd'
export default function UserManager() {
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [total, setTotal] = useState(0)
  // const [pager, setPager] = useState({
   
  // })
  const [queryData, setQueryData] = useState<UserSearch>({
    search: "",
    pageNo: 1,
    pageSize: 10,
  })
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
      dataIndex: 'phoneNumber',
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
    }
  ]
  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: object) => {
    const params = { ...values, ...queryData }
    const { data } = await getUsersLists(params)
    setLists(data.lists)
    const datas = {
      pageSize: data.pageSize,
      pageNo: data.pageNo
    }
    setTotal(data?.total)
    setQueryData({...queryData,...datas});
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
      <UserAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} />
    </>
  )
}
