import Tabular from '@/components/Tabular.tsx'
import { getDictionaryLists, deleteDictionaryItem } from '@/api/system'
import { useState } from 'react'
import { DictionarySearch, DictionaryItem } from "@/types/dictionary";
import DictionaryAddDialog from './dictionary-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import Authority from '@/components/Authority';
import { useTranslation } from 'react-i18next'

export default function Dictionarys() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuId, setMenuId] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<DictionarySearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
  const handleEdit = (id: number | null) => {
    if (!id) return
    setMenuId(id)
    setDialogOpen(true)
  }
  const handleDelete = async (id: number | null) => {
    if (!id) return
    await deleteDictionaryItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: '字典类型',
      dataIndex: 'type',
      key: 'type',
      width: 140
    },

    {
      title: '标识',
      dataIndex: 'code',
      key: 'code',
      width: 120
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
      width: 60
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      width: 100,
      align: 'center',
      render: (value: number | string, record: DictionaryItem, index: number) => {
        return (
          <Space key={index}>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
          </Space>
        )
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: '字典类型', type: 'input' }]
  const handleSearch = async (values: DictionarySearch) => {
    const { data, pageNo, pageSize, total } = await getDictionaryLists(values)
    setLists(data)
    const datas = {
      pageSize: pageSize,
      pageNo: pageNo
    }
    setTotal(total)
    setQueryData({ ...queryData, ...datas })
  }
  const handleNew = () => {
    setMenuId(null)
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
          <Authority permission="system:dictionary:create">
            <Button type="primary" onClick={handleNew}>
              {t('Add')}
            </Button>
          </Authority>
        }
      ></Tabular>
      {dialogOpen ? <DictionaryAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={menuId} /> : null}
    </>
  )
}
