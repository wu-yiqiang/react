import { Table, Pagination, PaginationProps } from 'antd'
import { Button, Space } from 'antd'
import React, { useImperativeHandle, useState, useRef, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchForm from './SearchForm'
import '@/style/Tabular.scss'
import { useTranslation } from 'react-i18next'

export default function Tabular(props: any) {
  
  const { dataSource, columns, data, searchOptions, handleSearch, defaultFoldNum, onRef, left = null, right = null, defaultFoldState, total, pageSize = 10, pageNo = 1, handleEdit, handleDelete } = props
  const { t } = useTranslation()
  const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`
  const [columnLists, setColumnLists] = useState([])
  const [searchParams, setSearchparams] = useState({})
  const SearchFormRef = useRef(null);
  const actionSlot = [
    {
    title: '操作',
    key: 'action',
    render: (_, record: object) => (
      <Space size="middle">
        <Button type="text" size="middle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button type="text" size="middle" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
      </Space>
    ),
    }
  ]
  useImperativeHandle(onRef, () => {
    return {
      flush: handleFlush,
    };
  });

  const handlePager = (page: number, pageSize: number) => {
    handleSearch({ pageSize, pageNo: page, ...searchParams })
  }
  const handleForm = (values: any) => {
    setSearchparams(values)
    handleSearch({ pageSize: pageSize, pageNo: pageNo, ...values })
  }

  const handleFlush = async () => {
    if (SearchFormRef?.current) await SearchFormRef.current.init()
  }

  const init = () => {
    setColumnLists([])
    columns.forEach((column: { key: string }) => {
      if (column.key == 'action') {
        setColumnLists((current) => [...current, ...actionSlot])
      } else {
        setColumnLists((current) => [...current, column])
      }
    })
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <SearchForm columns={searchOptions} labelWidth="50px" data={data} cRef={SearchFormRef} defaultFoldNum={defaultFoldNum} defaultFoldState={defaultFoldState} handleSearch={handleForm} />
      <section className="opeartions">
        <div className="opts-left">{props?.left}</div>
        <div className="opts-right">{props?.right}</div>
      </section>
      <Table columns={columnLists} scroll={{ y: 550 }} rowKey="id" dataSource={dataSource} pagination={false} />
      {total > 0 ? <Pagination style={{ marginTop: 10 }} showSizeChanger current={pageNo} pageSize={pageSize} total={total} onChange={handlePager} align="end" showTotal={showTotal} /> : null}
    </>
  )
}