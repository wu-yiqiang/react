import { Table, Pagination } from 'antd'
import React, {useState, useRef } from 'react'
import SearchForm from './SearchForm'

export default function Tabular(props: any) {

  const { dataSource, columns, data, searchOptions, handleSearch, defaultFoldNum, defaultFoldState,total ,pageSize = 10, pageNo = 1 } = props
  const childRef = useRef();
  const handlePageNo = (value: any) => {
    handleSearch({pageSize, pageNo: value})
  }
  const handlePageSize = (current: any, pageSize: any) => {
    handleSearch({pageSize, pageNo: current})
  }
  const handleForm = (values: any) => {
    handleSearch({pageSize, pageNo: 1, ...values})
  }
  return (
    <>
      <SearchForm columns={searchOptions} data={data} cRef={childRef} defaultFoldNum={ defaultFoldNum } defaultFoldState={defaultFoldState}  handleSearch={ handleForm } / >
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Pagination showSizeChanger current={pageNo} pageSize={pageSize} total={total} onChange={ handlePageNo } onShowSizeChange={handlePageSize} />
    </>
  )
}