import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { allRouters } from '@/routers/index'

interface MenuItem {
  key: string
  $parentKey: string
  icon: React.JSX.Element
  children: Array<MenuItem> | null
  label: string
  path: string
}

let items: Array<MenuItem> = []

const genItems = () => {
  // 数据清洗
  items = []
  let res: Array<MenuItem> = []
  allRouters.forEach((item) => {
    const template: MenuItem = {
      key: item.key,
      $parentKey: item.$parentKey,
      icon: item.icon,
      children: null,
      label: item.label,
      path: item.path
    }
    res.push(template)
  })

  res.forEach((item) => {
    const parent = res.find((node) => node.key === item.$parentKey)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      items.push(item)
    }
  })
}


const App: React.FC = () => {
  let navgite = useNavigate()
  genItems()
  const onClick: MenuProps['onClick'] = (e) => {
    const path = `/${e.key}`
    navgite(path)
  }
  return <Menu style={{ height: document.body.clientHeight }} onClick={onClick} defaultSelectedKeys={['dashborde']} defaultOpenKeys={['dashborde']} mode="inline" items={items} />
}

export default App
