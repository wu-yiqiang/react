import React, { useEffect, useMemo, useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { allRouters, routes } from '@/routers/index'
import eventMitt from "@/utils/eventMitt";
import useSystemStore from '@/store/index'
import { SystemStore } from '@/types/common'
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
  const menus = (useSystemStore.getState() as SystemStore)?.userInfo?.menus
  items = []
  let res: Array<MenuItem> = []
  res = allRouters
    ?.filter((v) => menus?.some((val: any) => val.code == v.key))
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
      parent.children = parent?.children || []
      parent.children.push(item)
    } else {
      items.push(item)
    }
  })
}

 const Menus = () => {
   genItems()
   const onClick: MenuProps['onClick'] = (e) => {
     eventMitt.emit('ROUTER:KEY', e?.key)
     console.log("ROUTER:KEY", e.key)
     // eventMitt.emit('ROUTER:OPENMENU', [])
   }
   const [selectMenu, setSelectMenu] = useMemo(() => (useSystemStore.getState() as SystemStore)?.selectMenu || (useSystemStore.getState() as SystemStore)?.userInfo?.menus?.[0]?.code, [(useSystemStore() as SystemStore)?.selectMenu, (useSystemStore() as SystemStore)?.userInfo?.menus])
   const openMenu = useMemo(
     () => (useSystemStore.getState() as SystemStore)?.openMenu,
     [(useSystemStore() as SystemStore)?.openMenu]
   );
   const onOpenChange = (openKeys: Array<string>) => {
     eventMitt.emit('ROUTER:OPENMENU', [])
     eventMitt.emit("ROUTER:OPENMENU", [openKeys.pop()]);
   }
   return (
     <>
       <Menu style={{ height: document.body.clientHeight }} onSelect={onClick} mode="inline" items={items?.map(item => ({ ...item, children: item?.children }))} selectedKeys={[selectMenu]} onOpenChange={onOpenChange} openKeys={openMenu} />
     </>
   )
 }

 export default Menus
