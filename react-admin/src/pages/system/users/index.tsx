import Tabular from '@/components/Tabular.tsx'
import { getUsersLists, deleteUserItem, getRoleOptions } from '@/api/system'
import { useEffect, useState } from 'react'
import { UserSearch, UserItem } from '@/types/user'
import UserAddDialog from './user-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import Export from '@/components/Export'
import { useTranslation } from 'react-i18next'
import ResetPasswordDialog from './reset-password'
import { RoleItem } from "@/types/role";
import Authority from '@/components/Authority'
import { MenuItem } from '@/types/menu'
import TableCell from '@/components/TableCell'
export default function UserManager() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [roles, setRoles] = useState<RoleItem[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<UserSearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
  const handleEdit = (id: number | null) => {
    if (!id) return
    setUserId(id)
    setDialogOpen(true)
  }
  const handleDelete = async (id: number | null) => {
    if (!id) return
    await deleteUserItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const handleResetPassword = (id: number | null) => {
    if (!id) return
    setUserId(id)
    setResetDialogOpen(true)
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '号码',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: string | number) => {
        return <TableCell value={value} type="Status" />
      }
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (value: Array<MenuItem>) => {
        return (
          <>
            {value
              ?.map((item) => {
                return item?.name
              })
              ?.filter(Boolean)
              ?.join(',')}
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      render: (value: number | string, record: UserItem, index: number) => {
        return (
          <Space key={index}>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            <Button icon={<ReloadOutlined />} onClick={() => handleResetPassword(record?.id)} />
            <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
          </Space>
        )
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: t('Search'), type: 'input' }]
  const handleSearch = async (values: UserSearch) => {
    const { data } = await getUsersLists(values)
    setLists(data?.data)
    const datas = {
      pageSize: data?.pageSize,
      pageNo: data?.pageNo
    }
    setTotal(data?.total)
    setQueryData({ ...queryData, ...datas })
  }
  const handleNew = () => {
    setUserId(null)
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleResetClose = () => {
    setResetDialogOpen(false)
  }
  const handleOk = async () => {
    setDialogOpen(false)
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const getRoles = async () => {
    const { data } = await getRoleOptions()
    setRoles(data ?? [])
  }
  useEffect(() => {
    getRoles()
  }, [])
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
          <>
            <Authority permission="system:user:export">
              <Export url="/user/download" method="get" />
            </Authority>
            <Authority permission="system:user:create">
              <Button type="primary" onClick={handleNew}>
                {t('Add')}
              </Button>
            </Authority>
          </>
        }
      ></Tabular>
      {dialogOpen ? <UserAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={userId} /> : null}
      {resetDialogOpen ? <ResetPasswordDialog open={resetDialogOpen} handleClose={handleResetClose} handleOk={handleClose} id={userId} /> : null}
    </>
  )
}
