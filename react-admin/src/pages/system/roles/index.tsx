import Tabular from '@/components/Tabular.tsx'
import { getRolesLists, deleteRoleItem } from '@/api/system'
import { useState } from 'react'
import { UserSearch } from '@/types/user'
import RoleAddDialog from './role-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import { RoleSearch, RoleItem } from "@/types/role";
import Authority from '@/components/Authority'
import { useTranslation } from 'react-i18next'
export default function UserManager() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [roleId, setRoleId] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<UserSearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
  const handleEdit = (id: number | null) => {
    if (!id) return
    setRoleId(id);
    setDialogOpen(true)
  }
  const handleDelete = async (id: number | null) => {
    if (!id) return
    await deleteRoleItem(id)
    Toast.success('操作成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "权限标识",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "操作",
      dataIndex: "opeartions",
      key: "opeartions",
      render: (value: number | string, record: RoleItem, index: number) => {
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
  const handleSearch = async (values: RoleSearch) => {
    const { data } = await getRolesLists(values)
    setLists(data?.data)
    const datas = {
      pageSize: data?.pageSize,
      pageNo: data?.pageNo
    }
    setTotal(data?.total)
    setQueryData({ ...queryData, ...datas })
  };
  const handleNew = () => {
    setRoleId(null)
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
          <Authority permission="system:role:create">
            <Button type="primary" onClick={handleNew}>
              {t('Add')}
            </Button>
          </Authority>
        }
      ></Tabular>
      {dialogOpen ? <RoleAddDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={roleId} /> : null}
    </>
  )
}
