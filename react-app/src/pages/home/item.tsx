// import React, { useEffect, useMemo, useCallback } from 'react'
import SvgIcon from '@/components/SvgIcon'
import style from './item.module.less'
function Item(props: any) {
  const { time, title, total, remainder, color, state } = props
  return (
    <div style={{ backgroundColor: color }} className={style.Item}>
      <div className={style.info}>
        <div className={style.title}>{title}</div>
        <div className={style.time}>开始于：{time}</div>
      </div>
      <div className={style.target}>
        { state === '已完成' ? <SvgIcon name="done" color={'#fff'} size="30px" /> : state === '未完成' ? <SvgIcon name="undone" color={'#fff'} size="30px" /> : `${remainder} / ${total} 天` }
      </div>
    </div>
  )
}

export default Item
