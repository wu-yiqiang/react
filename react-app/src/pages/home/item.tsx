// import React, { useEffect, useMemo, useCallback } from 'react'
import style from './Item.module.less'
function Item(props: any) {
  const { time, title, total, remainder, color } = props
  console.log('clo', color)
  return (
    <div style={{ backgroundColor: color }} className={style.Item}>
      <div className={style.info}>
        <div className={style.title}>{title}</div>
        <div className={style.time}>开始于：{time}</div>
      </div>
      <div className={style.target}>
        {remainder} / {total} 天
      </div>
    </div>
  )
}

export default Item
