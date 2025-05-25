import { useMemo, useState } from 'react'
export default function Authority(props: any) {
  const { permission, children } = props
  const hasPermission = useMemo(() => {
    return true
  }, [permission])
  return <>{hasPermission ? children : null}</>
}
