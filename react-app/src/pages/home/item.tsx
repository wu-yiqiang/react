import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { db } from '@/db/db'
import SvgIcon from '@/components/SvgIcon'
import style from './item.module.less'
function Item(props: any) {
  const { time, title, total, remainder, color, state, index, fn } = props
  const [startX, setStartX] = useState<Number>(0);
  const [endX, setEndX] = useState<Number>(0);
  const [del, setDel] = useState<Boolean>(false);
  //滑动开始
  const touchStart = (e: any) => {
    // 记录初始位置
    setStartX(e.touches[0].clientX)
  }
  //滑动结束
  const touchEnd = (e:any) => {
    // let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      setEndX(e.changedTouches[0].clientX)
    const deviation = Number(startX) - Number(endX)
   if (deviation > 60 && !del) {
     setDel(true)
   }
   if (deviation < 0 && del) {
     setDel(false);
   }
  }
  const deleteItem = async () => {
    setDel(false)
    await db.targets.delete(index)
    fn()
  }
   return (
     <div className={style.Item}>
       <div style={{ backgroundColor: color }} className={style.itemInfo} onTouchStart={(e) => touchStart(e)} onTouchEnd={(e) => touchEnd(e)}>
         <div className={style.info}>
           <div className={style.title}>{title}</div>
           <div className={style.time}>开始于：{time}</div>
         </div>
         <div className={style.target}>{state === '已完成' ? <SvgIcon name="done" color={'#fff'} size="30px" /> : state === '未完成' ? <SvgIcon name="undone" color={'#fff'} size="30px" /> : `${remainder} / ${total} 天`}</div>
         <div className={del ? style.delete : style.undelete} onClick={deleteItem}>
           删除
         </div>
       </div>
     </div>
   )
}

export default Item
