import useSystemStore from '@/store'
import { BtnItem } from '@/types/button'
import { SystemStore } from '@/types/common'
import { useMemo, useState } from 'react'
export default function Authority(props: any) {
  const { permission, children } = props
  const { userInfo } = useSystemStore() as SystemStore
  const hasPermission = useMemo(() => {
    const buttons = userInfo?.roles?.reduce((acc: any, val: any) => acc?.concat(val?.buttons?.map((item: BtnItem) => item?.code)), []) ?? []
    const buttonPermissions = buttons ?? []
    if (buttonPermissions?.includes(permission)) return true
    return false
  }, [permission])
  return <>{hasPermission ? children : null}</>
}
