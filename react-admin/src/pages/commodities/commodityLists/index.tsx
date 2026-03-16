import Tabular from '@/components/Tabular.tsx'
import { useState } from 'react'
import CommodityDialog from './commodity-dialog'
import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, ArrowUpOutlined } from '@ant-design/icons'
import Toast from '@/components/Toast'
import { deleteCommodityItem, getCommodityPages, putCommodityUp } from '@/api/commodity'
import { CommodityItem, CommoditySearch } from '@/types/commodity'
import Img from '@/components/Img'
import { formattedAmountCNY } from '@/utils'
import Authority from '@/components/Authority'
import { useTranslation } from 'react-i18next'
import TableCell from '@/components/TableCell'
import { CommonId } from '@/types/common'
import { ListTypes } from '@/components/Selector/data'
import Selector from '@/components/Selector'
enum CommodityStatus {
  NotAvailable = 0,
  Available = 1,
  Removed = 2,
  SaleOut = 3
}
export default function CommodityLists() {
  const { t } = useTranslation()
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [commodityId, setCommodityId] = useState(0)
  const [total, setTotal] = useState(0)
  const [queryData, setQueryData] = useState<CommoditySearch>({
    search: '',
    pageNo: 1,
    pageSize: 10
  })
  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'shopId',
      key: 'shopId',
      render: (value: number | string, record: CommodityItem, index: number) => {
        return (
          <Selector type={ListTypes.shops} value={record?.shopId} />
        );
      },
    },
    {
      title: '商品编号',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: "商品图片",
      dataIndex: "fileName",
      key: "fileName",
      render: (value: number | string, record: CommodityItem, index: number) => {
        return (
          <Img fileName={record?.fileName} />
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: "商品价格(元)",
      dataIndex: "price",
      key: "price",
      render: (value: number | string, record: CommodityItem, index: number) => {
        return (
          <div> {formattedAmountCNY(record?.price)}</div>
        );
      },
    },
    {
      title: '商品库存',
      dataIndex: 'inventory',
      key: 'inventory'
    },
    {
      title: '商品销量',
      dataIndex: 'sales',
      key: 'sales'
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: string | number) => {
        return <TableCell value={value} type="CommodityStatus" />
      }
    },
    {
      title: '操作',
      dataIndex: 'opeartions',
      key: 'opeartions',
      render: (value: number | string, record: CommodityItem, index: number) => {
        return (
          <Space key={index}>
            <Authority permission="commodities:commodity:delete">
              {record.status === CommodityStatus.NotAvailable ? <Button icon={<ArrowUpOutlined />} onClick={() => handleUp(record?.id)} />
                : null}
            </Authority>
            <Authority permission="commodities:commodity:edit">
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record?.id)} />
            </Authority>
            <Authority permission="commodities:commodity:delete">
              {record.status === CommodityStatus.Available ?
                null : <Button icon={<DeleteOutlined />} type="primary" danger ghost onClick={() => handleDelete(record?.id)} />}
            </Authority>
          </Space>
        )
      }
    }
  ]
  const handleEdit = (id: number | null) => {
    if (!id) return
    setCommodityId(id)
    setDialogOpen(true)
  }
  const handleDelete = async (id: number | null) => {
    await deleteCommodityItem(id)
    Toast.success('商品删除成功')
    await handleSearch({ ...queryData, pageNo: 1 })
  }

  const searchOptions = [{ name: 'search', label: '搜索', type: 'input' }]
  const handleSearch = async (values: CommoditySearch) => {
    const { data } = await getCommodityPages(values)
    setLists(data?.data)
    const datas = {
      pageSize: data?.pageSize,
      pageNo: data?.pageNo
    }
    setQueryData({ ...queryData, ...datas })
    setTotal(data?.total)
  }
  const handleNew = () => {
    setCommodityId(0)
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleUp = async (id: number | null) => {
    const reqParams = {
      id: id,
      status: CommodityStatus.Available
    }
    await putCommodityUp(reqParams)
    Toast.success('上架成功')
    console.log('上架', queryData)
    await handleSearch({ ...queryData })
  }
  const handleOk = async () => {
    setDialogOpen(false)
    await handleSearch({ ...queryData, pageNo: 1 })
  }
  return (
    <>
      {/* {queryData?.pageNo} */}
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
          <Authority permission="commodities:commodity:create">
            <Button type="primary" onClick={handleNew}>
              {t('Add')}
            </Button>
          </Authority>
        }
      ></Tabular>
      {dialogOpen ? <CommodityDialog open={dialogOpen} handleClose={handleClose} handleOk={handleOk} id={commodityId} /> : null}
    </>
  )
}
