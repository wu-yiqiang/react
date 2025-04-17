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
    // setStateOpenKeys([e?.key])
    eventMitt.emit("ROUTER:KEY", e?.key);
  }
  const selectedKeys = useMemo(() => {
    const data = JSON.stringify(localStorage.getItem('openMunus'))
    const selectedKey = data[0]
    return selectedKey;
  }, []);
  const openKeys = useMemo(() => {
    const data = JSON.stringify(localStorage.getItem('openMunus'))
    const openKey = data.slice(1, data.length - 1)
    console.log('openKey', openKey)
    return openKey
  }, [])
  return <Menu style={{ height: document.body.clientHeight }} onSelect={onClick} selectedKeys={selectedKeys} openKeys={openKeys} mode="inline" items={items} />
}

export default App
