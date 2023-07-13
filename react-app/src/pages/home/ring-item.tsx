import React, { useEffect, useMemo, useCallback, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import style from './ring-item.module.less'
import { db } from '@/db/db'
function RingItem(props: any) {
  const { name, selected, currentColor } = props
  const [src, setSrc] = useState('')
  useEffect(() => {
    ; (async () => {
      console.log('asda', name)
      const target = await db.rings.where({ name: name }).first()
      if (selected) {
        console.log('kkkk', selected)
        setSrc(target.src)
        const audio = new Audio(src)
        audio.play()
      } else {
        // setSrc('')
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
