import React, { useEffect, useMemo, useState } from 'react'
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
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const init2 = () => {
    const data = JSON.parse(sessionStorage.getItem("openMunus"));
    if (!data?.length) {
          sessionStorage.setItem('openMunus', JSON.stringify(['/']))
    }
  }
  const init = () => {
    const data = JSON.parse(sessionStorage.getItem('openMunus'))
    setSelectedKeys(data?.length ? data[0] : '/')
    setOpenKeys(data)
  }
  const onClick: MenuProps['onClick'] = (e) => {
    eventMitt.emit("ROUTER:KEY", e?.key);
    init()
  }
  const onOpenChange = (e) => {
    setOpenKeys(e)
  }
  useEffect(() => {
    init2()
    init()
  }, [])
  return <Menu style={{ height: document.body.clientHeight }} onSelect={onClick} selectedKeys={selectedKeys} onOpenChange={onOpenChange} openKeys={openKeys} mode="inline" items={items} />
}

export default App
