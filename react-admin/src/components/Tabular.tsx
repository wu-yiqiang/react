import { Table, Pagination } from 'antd'
import { Button, Space } from 'antd'
import React, { useImperativeHandle, useState, useRef, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchForm from './SearchForm'
import '@/style/Tabular.scss'

export default function Tabular(props: any) {
  useImperativeHandle(props.onRef, () => {
    return {
      flush: handleFlush,
    };
  });
  const { dataSource, columns, data, searchOptions, handleSearch, defaultFoldNum, left = null, right = null, defaultFoldState,total ,pageSize = 10, pageNo = 1, handleEdit, handleDelete  } = props
  const [columnLists, setColumnLists] = useState([])
  const [searchParams, setSearchparams] = useState([])
  const SearchFormRef = useRef();
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

  const handlePager = (page: number, pageSize: number) => {
    handleSearch({ pageSize, pageNo: page, ...searchParams })
  }
  const handleForm = (values: any) => {
    setSearchparams(values)
    handleSearch({ pageSize: pageSize, pageNo: pageNo, ...searchParams })
  }

  const handleFlush = () => {
    SearchFormRef.current.init()
  }

  const init = () => {
    columns.forEach(column => {
      if (column.key == 'action') {
        setColumnLists((current) => [...current, ...actionSlot,])
      } else {
        setColumnLists((current) => [...current, column])
      }
    });
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <SearchForm columns={searchOptions} data={data} cRef={SearchFormRef} defaultFoldNum={defaultFoldNum} defaultFoldState={defaultFoldState} handleSearch={handleForm} />
      <section className="opeartions">
        <div className="opts-left">{props?.left}</div>
        <div className="opts-right">{props?.right}</div>
      </section>
      <Table columns={columnLists} dataSource={dataSource} pagination={false} />
      { total > 0 ? <Pagination showSizeChanger current={pageNo} pageSize={pageSize} total={total} onChange={handlePager} /> : null}
    </>
  )
}