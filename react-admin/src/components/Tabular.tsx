import { Table, Pagination, PaginationProps } from 'antd'
import { Button, Space } from 'antd'
import { useImperativeHandle, useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchForm from './SearchForm'
import '@/style/Tabular.scss'
import { useTranslation } from 'react-i18next'
import { set } from 'lodash-es';
export default function Tabular(props: any) {
  const { dataSource, columns, data, searchOptions, handleSearch, defaultFoldNum, onRef, left = null, right = null, defaultFoldState, total, pageSize = 10, pageNo = 1, handleEdit, handleDelete, handleFresh, rowSelection } = props
  const { t } = useTranslation()
  const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`
  const [columnLists, setColumnLists] = useState([])
  const [searchParams, setSearchparams] = useState({})
  const SearchFormRef = useRef(null);
  const actionSlot = [
    {
      title: "操作",
      key: "action",
      render: (_: object, record: object) => (
        <Space size="middle">
          <Button
            type="text"
            size="middle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];
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
    // 为 SearchFormRef 的 current 属性添加类型断言，假设 SearchFormRef 的 current 具有 init 方法
    if (SearchFormRef.current) {
      const searchFormInstance = SearchFormRef.current as { init: () => Promise<any> | void };
      await searchFormInstance.init();
    }
  }

  const init = () => {
    setColumnLists([])
    columns.forEach((column: { key: string }) => {
      if (column.key == 'action') {
        setColumnLists((current) => [...current, ...actionSlot] as any)
      } else {
        setColumnLists((current) => [...current, column] as any)
      }
    })
    handleFlush()
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SearchForm columns={searchOptions} labelWidth="60px" data={data} cRef={SearchFormRef} defaultFoldNum={defaultFoldNum} defaultFoldState={defaultFoldState} handleSearch={handleForm} />
      <section className="opeartions">
        <div className="opts-left">{props?.left}</div>
        <div className="opts-right">{props?.right}</div>
      </section>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table columns={columnLists} rowSelection={rowSelection} rowKey="id" dataSource={dataSource} pagination={false} />
      </div>      {total > 0 ? <Pagination style={{ marginTop: 10 }} showSizeChanger current={pageNo} pageSize={pageSize} total={total} onChange={handlePager} align="end" showTotal={showTotal} /> : null}
    </div>
  )
}