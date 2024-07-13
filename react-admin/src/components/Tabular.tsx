import { Table, Pagination } from 'antd'
import React, {useState, useRef, useEffect } from 'react'
import SearchForm from './SearchForm'
import '@/style/Tabular.scss'

export default function Tabular(props: any) {

  const { dataSource, columns, data, searchOptions, handleSearch, defaultFoldNum, left = null, right = null, defaultFoldState,total ,pageSize = 10, pageNo = 1 } = props
  const childRef = useRef();
  const handlePageNo = (page: number, pageSize: number) => {
    handleSearch({ pageSize, pageNo: page })
  }
  const handlePageSize = (current: any, pageSize: any) => {
    // handleSearch({pageSize, pageNo: current})
  }
  const handleForm = (values: any) => {
    handleSearch({ pageSize, pageNo: pageNo, ...values })
  }
  useEffect(() => {
  }, [])
  return (
    <>
      <SearchForm columns={searchOptions} data={data} cRef={childRef} defaultFoldNum={defaultFoldNum} defaultFoldState={defaultFoldState} handleSearch={handleForm} />
      <section className="opeartions">
        <div className="opts-left">{props?.left}</div>
        <div className="opts-right">{props?.right}</div>
      </section>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      { total > 0 ? <Pagination showSizeChanger current={pageNo} pageSize={pageSize} total={total} onChange={handlePageNo} /> : null}
    </>
  )
}