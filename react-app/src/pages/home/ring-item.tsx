import React, { useEffect, useMemo, useCallback, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import style from './ring-item.module.less'
import { db } from '@/db/db'
import { Ring } from '@/utils/audio'
function RingItem(props: any) {
  const { name, selected, currentColor } = props
  const [src, setSrc] = useState('')
  useEffect(() => {
    ;(async () => {
      if (selected) {
        const target = await db.rings.where({ name: name }).first()
        console.log('target', target)
        setSrc(target.src)
        const audio = Ring.getInstance(src)
        audio.play()
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
