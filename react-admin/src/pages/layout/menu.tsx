import React, { useMemo, useState } from 'react'
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
  const [stateOpenKeys, setStateOpenKeys] = useState([])
  const onClick: MenuProps['onClick'] = (e) => {
    setStateOpenKeys([e?.key])
    eventMitt.emit("ROUTER:KEY", e?.key);
  }
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const selectedKeys = useMemo(() => {
    const selectedKey = pathSegments[0] || "/";
    return [selectedKey];
  }, [pathSegments]);
  const onOpenChange = (e) => {
    const lastItem = e[e.length - 1]
    setStateOpenKeys([lastItem])
  }
  return <Menu style={{ height: document.body.clientHeight }} onSelect={onClick} onOpenChange={ onOpenChange} selectedKeys={selectedKeys} openKeys={stateOpenKeys} mode="inline" items={items} />
}

export default App
