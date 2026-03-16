import Tabular from '@/components/Tabular.tsx'
import { getUsersLists, deleteUserItem, getRoleOptions } from '@/api/system'
import { useEffect, useState } from 'react'
import { UserSearch, UserItem } from '@/types/user'
import ShopDialog from './shop-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import Export from '@/components/Export'
import { useTranslation } from 'react-i18next'
import Authority from '@/components/Authority'
import TableCell from '@/components/TableCell'
import Img from '@/components/Img'
import { ShopItem } from '@/types/shop'
import { deleteShopItem, getShopPages } from '@/api/commodity'
export default function ShopManager() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const searchOptions = [{ name: 'search', label: t('Search'), type: 'input' }]
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
    await deleteShopItem(id)
    Toast.success('删除成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: '店铺名',
      dataIndex: 'name',
      key: 'name'
    },
    {
        title: "店铺图片",
        dataIndex: "fileName",
        key: "fileName",
        render: (value: number | string, record: ShopItem, index: number) => {
          return (
            <Img fileName={record?.fileName} />
          );
        },
      },
    {
      title: '店铺地址',
      dataIndex: 'shopAddress',
      key: 'shopAddress'
    },
    {
      title: '店铺状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: string | number) => {
        return <TableCell value={value} type="ShopStatus" />
      }
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      render: (value: number | string, record: UserItem, index: number) => {
        return (
          <Space key={index}>
            <Authority permission="commodities:shop:edit">
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            </Authority>
            <Authority permission="commodities:shop:delete">
              <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
            </Authority>
          </Space>
        )
      }
    }
  ]
  const handleSearch = async (values: UserSearch) => {
    const { data } = await getShopPages(values)
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
            <Authority permission="commodities:shop:create">
              <Button type="primary" onClick={handleNew}>
                {t('Add')}
              </Button>
            </Authority>
          </>
        }
      ></Tabular>
      {dialogOpen ? <ShopDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={userId} /> : null}
    </>
  )
}
