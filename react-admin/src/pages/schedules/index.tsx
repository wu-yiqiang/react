import Tabular from '@/components/Tabular.tsx'
import { getTruckLists, getUsersLists } from '@/api/settings'
import { useState } from 'react'
import { Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function RoleManager() {
  const navgite = useNavigate()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pager, setPager] = useState({
    total: 0,
    pageNo: 1,
    pageSize: 10
  })
  const columns = [
    {
      title: '姓名',
      dataIndex: 'displayName',
      key: 'displayName'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: '岗位',
      dataIndex: 'positon',
      key: 'positon'
    },
  ]
  const searchOptions = [
    { name: 'keyword', label: '快速搜索', type: 'input' }
  ]
  const queryData = {
    keyword: '',
    gender: 'male'
  }

  const handleSearch = async (values: object) => {
    const params = { ...values, ...queryData }
    const { data } = await getTruckLists(params)
    setLists(data.lists)
    const datas = {
      pageSize: data.pageSize,
      total: data.total,
      pageNo: data.pageNo
    }
    setPager(datas)
  }
  const formState = {
    name: '',
    email: '',
    picture: ''
  }
  const handleNew = () => {
    navgite('/day-schedule')
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleOk = async (values: any) => {
    const datas = { ...values, type: 1 }
    await getUsersLists(datas)
    message.success('操作成功')
    setDialogOpen(false)
  }
  return (
    <>
      <Tabular
        dataSource={lists}
        total={pager.total}
        pageNo={pager.pageNo}
        pageSize={pager.pageSize}
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
      {/* <UserAddDialog open={dialogOpen} formState={formState} handleClose={handleClose} handleOk={handleOk} /> */}
    </>
  )
}
