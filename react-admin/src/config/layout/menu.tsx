import { Menu } from 'antd'
import { HomeOutlined, PartitionOutlined, UnorderedListOutlined, FireOutlined, UserOutlined, AreaChartOutlined, ControlOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const items = [
  {
    label: '看板',
    key: 'dashbord',
    icon: <AreaChartOutlined />
  },
  {
    label: '传感器管理',
    key: 'sensor',
    icon: <PartitionOutlined />,
    children: [
      { label: <Link to={'sensor1'}>传感器管理1</Link>, key: 'sensor1', icon: <UnorderedListOutlined /> },
      { label: <Link to={'sensor2'}>传感器管理2</Link>, key: 'sensor2', icon: <UnorderedListOutlined /> }
    ]
  },
  {
    label: '图纸管理',
    key: 'draw',
    icon: <PartitionOutlined />,
    children: [
      { label: <Link to={'draw1'}>图纸管理1</Link>, key: 'draw1', icon: <UnorderedListOutlined /> },
      { label: <Link to={'draw2'}>图纸管理2</Link>, key: 'draw2', icon: <UnorderedListOutlined /> }
    ]
  },
  {
    label: '设置',
    key: 'setting',
    icon: <ControlOutlined />,
    children: [
      { label: <Link to={'user-manager'}>用户管理</Link>, key: 'user-manager', icon: <UserOutlined /> },
      { label: <Link to={'role-manager'}>角色管理</Link>, key: 'role-manager', icon: <UnorderedListOutlined /> },
      { label: <Link to={'permission-manager'}>权限管理</Link>, key: 'permission-manager', icon: <ThunderboltOutlined /> }
    ]
  }
]

export default function MyMenu() {
  return <Menu items={items} theme="light" mode="inline" defaultSelectedKeys={['home']} style={{ height: document.body.clientHeight }} />
}
