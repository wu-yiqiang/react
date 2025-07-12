import useSystemStore from '@/store'
import { SystemStore } from '@/types/common'
import { useMemo, useState } from 'react'
export default function Authority(props: any) {
  const { permission, children } = props
  const { userInfo } = useSystemStore() as SystemStore
  const hasPermission = useMemo(() => {
    const buttonPermissions = userInfo?.buttons?.map((item) => item?.code) ?? []
    if (buttonPermissions?.includes(permission)) return true
    return false
  }, [permission])
  return <>{hasPermission ? children : null}</>
}
