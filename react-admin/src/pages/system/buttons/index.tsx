import Tabular from '@/components/Tabular.tsx'
import { getButtonsLists, deleteButtonItem } from '@/api/system'
import { useEffect, useState } from 'react'
import { UserSearch, UserItem } from '@/types/user'
import UserAddDialog from './button-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import { useTranslation } from 'react-i18next'
import Authority from '@/components/Authority'
export default function ButtonManager() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [roles, setRoles] = useState([])
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
    await deleteButtonItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '权限标识',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      width: 150,
      align: 'center',
      render: (value: number | string, record: UserItem, index: number) => {
        return (
          <Space key={index}>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
          </Space>
        )
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: t('Search'), type: 'input' }]
  const handleSearch = async (values: UserSearch) => {
    const { data, pageSize, pageNo, total } = await getButtonsLists(values)
    setLists(data)
    const datas = {
      pageSize: pageSize,
      pageNo: pageNo
    }
    setTotal(total)
    setQueryData({ ...queryData, ...datas })
  }
  const handleNew = () => {
    setUserId(null)
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleOk = async () => {
    setDialogOpen(false)
    await handleSearch({ ...queryData, pageNo: 1 })
  }

  useEffect(() => {
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
            <Authority permission="system:button:create">
              <Button type="primary" onClick={handleNew}>
                {t('Add')}
              </Button>
            </Authority>
          </>
        }
      ></Tabular>
      {dialogOpen ? <UserAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={userId} /> : null}
    </>
  )
}
