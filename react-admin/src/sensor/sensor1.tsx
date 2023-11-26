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
export default function Sensor1() {
  
  return (
    <div className="sensor1">
      <Search />
      <Tab columns={columns} />
    </div>
  )
}
