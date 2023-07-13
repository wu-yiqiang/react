import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { Popup } from 'antd-mobile'
import RingItem from './ring-item'
import SvgIcon from '@/components/SvgIcon'
import style from './ring.module.less'
import { debounce } from '@material-ui/core'
import { db } from '@/db/db'
function Ring(props: any) {
  const { open, ringName, currentColor, closeRingMask, changeRimgName } = props
  const [ringLists, setRingLists] = useState([])
  useEffect(() => {
    ; (async () => {
      const list = await db.rings.toArray()
      setRingLists(list)
    })()
  }, [])
  const selectRing = (event: any) => {
    const name = event.target.getAttribute('data-name')
    console.log('sadfsfsd', name)
    if (!name) return
    changeRimgName(name)
  }
  return (
    <Popup
      visible={open}
      onMaskClick={() => {
        closeRingMask()
      }}
      bodyStyle={{ maxHeight: '90vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', overflow: 'scroll' }}
    >
      <div className={style.Ring} onClick={selectRing}>
        <div className={style.title}>选择提示铃声</div>
        {ringLists.map((v, index) => {
          return <RingItem key={index} selected={v.name === ringName ? true : false} name={v.name} currentColor={currentColor} />
        })}
      </div>
    </Popup>
  )
}

export default Ring
