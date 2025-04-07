import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { allRouters, routes } from '@/routers/index'
import eventMitt from "@/utils/eventMitt";
interface MenuItem {
  key: string
  parentkey: string
  icon: React.JSX.Element
  children: Array<MenuItem> | null
  label: string
  path: string
}

let items: Array<MenuItem> = []

const genItems = () => {
  // 清空
  items = []
  let res: Array<MenuItem> = []
  res = allRouters
    ?.filter((item: any) => item.showMenu)
    ?.map((item: any) => {
      const template: MenuItem = {
        key: item.key,
        parentkey: item.parentkey,
        icon: item.icon,
        children: null,
        label: item.label,
        path: item.path
      }
      return template
    })

  res.forEach((item) => {
    const parent = res.find((node) => node.key === item.parentkey)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      items.push(item)
    }
  })
}


const App: React.FC = () => {
  genItems()
  const onClick: MenuProps['onClick'] = (e) => {
    const path = `/${e.key}`
    eventMitt.emit("ROUTER:PATH", path);
  }
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const selectedKey = pathSegments[0] || "/"
  console.log('selectedKey', selectedKey) // /dashboard/mai
  return (
    <Menu
      style={{ height: document.body.clientHeight }}
      onClick={onClick}
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
    />
  );
}

export default App
