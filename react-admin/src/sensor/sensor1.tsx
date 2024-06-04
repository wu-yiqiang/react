import Search from '@/components/Search'
import Tab from '@/components/Tab'
import './sensor1.scss'
const columns = [
  {
    title: '传感器名',
    dataIndex: 'sensor_name',
    key: 'sensor_name'
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created'
  },
  {
    title: '更新时间',
    dataIndex: 'modified',
    key: 'modified'
  }
]
const items = [
  { type: 'input', label: '项目名称' },
  { type: 'input', label: '传感器名称' },
  { type: 'input', label: '传感器名称2' }
]
export default function Sensor1() {
  
  return (
    <div className="sensor1">
      <Search fields={items} />
      <Tab columns={columns} />
    </div>
  )
}
