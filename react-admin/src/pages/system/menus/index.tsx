import Tabular from '@/components/Tabular.tsx'
import { getMenuTreeLists, deleteMenuItem } from '@/api/system'
import { useState } from 'react'
import { MenuSearch, MenuItem } from "@/types/menu";
import UserAddDialog from './menu-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import { menuType } from '@/common/const'
export default function UserManager() {
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuId, setMenuId] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<MenuSearch>({
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
    await deleteMenuItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: '菜单名',
      dataIndex: 'name',
      key: 'name',
      width: 140
    },
    {
      title: '排序',
      dataIndex: 'order_num',
      key: 'order_num',
      width: 60
    },
    {
      title: '权限标识',
      dataIndex: 'code',
      key: 'code',
      width: 120
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      key: 'component'
    },

    {
      title: '类型',
      dataIndex: 'menu_type',
      key: 'menu_type',
      width: 60,
      render: (value: string | number) => <>{menuType?.find((item) => item.value == value)?.label}</>
    },
    {
      title: '状态',
      dataIndex: 'roles',
      key: 'roles',
      width: 60
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      width: 100,
      align: 'center',
      render: (value: number | string, record: MenuItem, index: number) => {
        return (
          <Space key={index}>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />
          </Space>
        )
      }
    }
  ]
  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: MenuSearch) => {
    const { data } = await getMenuTreeLists()
    setLists(data)
    const datas = {
      pageSize: data.pageSize,
      pageNo: data.pageNo
    }
    setTotal(data?.total)
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
          <Button type="primary" onClick={handleNew}>
            新增
          </Button>
        }
      ></Tabular>
      {dialogOpen ? <UserAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={menuId} /> : null}
    </>
  )
}
