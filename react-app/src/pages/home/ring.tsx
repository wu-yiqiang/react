import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { Popup } from 'antd-mobile'
import RingItem from './ring-item'
import SvgIcon from '@/components/SvgIcon'
import style from './ring.module.less'
import { debounce } from '@material-ui/core'
function Ring(props: any) {
  const { open, ringName, closeRingMask } = props
  const [ringLists] = useState(['Lollipop', 'AlarmClock', 'Beep', 'Breeze', 'Daydream'])
  const [currentSelect, setCurrentSelect] = useState(0)
  const selectRing = (event: any) => {
    const name = event.target.getAttribute('data-name')
    if (!name) return
    const index = ringLists.findIndex(v => v === name)
    setCurrentSelect(index)
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
        {ringLists.map((v, index) => {
          return <RingItem key={index} selected={v === ringName ? true : false} name={v} />
        })}
      </div>
    </Popup>
  )
}

export default Ring
