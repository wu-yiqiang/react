import {  Table } from 'antd'
// interface DataType {
//   key: string
//   name: string
//   age: number
//   address: string
//   tags: string[]
// }

export default function Tab(props: any) {
  // const data: DataType[] = props.data
  // const columns: ColumnsType<DataType> = props.columns
  const { data, columns } = props
  return <Table columns={columns} dataSource={data} />
}
