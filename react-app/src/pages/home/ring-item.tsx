import React, { useEffect, useMemo, useCallback, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import style from './ring-item.module.less'
import { db } from '@/db/db'
import { Ring } from '@/utils/audio'
function RingItem(props: any) {
  const { name, selected, currentColor } = props
  useEffect(() => {
    ;(async () => {
      if (selected) {
        const target = await db.rings.where({ name: name }).first()
        await Ring.getInstance(target.src)
      }
    })()
  }, [selected])
  return (
    <div className={style.RingItem} style={selected ? { backgroundColor: currentColor,color: '#fff' } : {} }>
      <span data-name={name}>{name}</span>
    </div>
  )
}

export default RingItem
