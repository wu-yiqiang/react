import Tabular from '@/components/Tabular.tsx'
import { getTruckLists, getUsersLists } from '@/api/settings'
import { useState } from 'react'
import UserAddDialog from './user-add-dialog'
import './user-manager.scss'
import { Button, message } from 'antd'
export default function UserManager() {
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
      title: '部门',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '岗位',
      dataIndex: 'positon',
      key: 'positon'
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles'
    }
  ]
  const searchOptions = [
    {
      name: "gender",
      label: "性别",
      type: "select",
      rules: [{ required: true, message: "请选择性别" }],
      list: [
        { value: "male", label: "男" },
        { value: "female", label: "女" },
      ],
      callback: (res) => onGenderChange(res),
    },
    { name: "keyword", label: "搜索", type: "input" },
  ];
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
    setDialogOpen(true)
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
      <UserAddDialog open={dialogOpen} formState={formState} handleClose={handleClose} handleOk={handleOk} />
    </>
  )
}
