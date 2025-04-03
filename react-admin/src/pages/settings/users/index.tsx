import Tabular from '@/components/Tabular.tsx'
import { getUsersLists, deleteRoleItem } from '@/api/settings'
import { useState } from 'react'
import { UserSearch, UserItem } from "@/types/user";
import UserAddDialog from './user-add-dialog'
import './user-manager.scss'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
export default function UserManager() {
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userId, setUserId] = useState(0)
  const [total, setTotal] = useState(0)
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
      title: "姓名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "号码",
      dataIndex: "phone_number",
      key: "phoneNumber",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "操作",
      dataIndex: "opeartions",
      key: "opeartions",
      render: (value: number | string, record: UserItem, index: number) => {
        return (
          <Space key={index}>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record?.id)}
            />
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              ghost
              onClick={() => handleDelete(record?.id)}
            />
          </Space>
        );
      },
    },
  ];
  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: UserSearch) => {
    const { data } = await getUsersLists(values);
    setLists(data.lists);
    const datas = {
      pageSize: data.pageSize,
      pageNo: data.pageNo,
    };
    setTotal(data?.total);
    setQueryData({ ...queryData, ...datas });
  };
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
      <UserAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={userId} />
    </>
  )
}
