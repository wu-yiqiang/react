import Tabular from '@/components/Tabular.tsx'
import { getIntefacesPage, deleteIntefaceItem } from '@/api/system'
import { useEffect, useState } from 'react'
import { UserSearch, UserItem } from '@/types/user'
import ConnectorDialog from './connector-dialog.tsx'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import { useTranslation } from 'react-i18next'
import TableCell from '@/components/TableCell.tsx'
import Authority from '@/components/Authority.tsx'
export default function IntefaceManager() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
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
    await deleteIntefaceItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
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
      render: (value: number) => {
        return <TableCell value={value} type="intefaceType" />
      }
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      key: 'path'
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
    const { data, total, pageSize, pageNo } = await getIntefacesPage(values)
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
            <Authority permission="system:connector:create">
              <Button type="primary" onClick={handleNew}>
                {t('Add')}
              </Button>
            </Authority>
          </>
        }
      ></Tabular>
      {dialogOpen ? <ConnectorDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={userId} /> : null}
    </>
  )
}
