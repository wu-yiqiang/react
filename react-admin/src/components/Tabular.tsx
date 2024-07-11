import { Table } from 'antd'
import SearchForm from './SearchForm'
import react from '@vitejs/plugin-react-swc'

export default function Tabular(props: any) {

  const { dataSource, columns, searchOptions} = props

  return (
    <><SearchForm searchOptions={ searchOptions } /><Table columns={columns} dataSource={dataSource} /></>
  )
}