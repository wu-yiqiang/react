import { Table } from 'antd'
import SearchForm from './SearchForm'
import react from '@vitejs/plugin-react-swc'

export default function Tabular(props: any) {

  const { dataSource, columns, searchOptions, handleSearch } = props

  return (
    <>
      <SearchForm searchOptions={searchOptions} handleSearch={handleSearch} />
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}