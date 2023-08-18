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
    console.log('start', startX)
  }
  //滑动结束
  const touchEnd = (e:any) => {
    // 当前滑动的父级元素
    let parentElement = e.currentTarget.parentElement;
    // 记录结束位置
    setEndX(e.changedTouches[0].clientX)
    console.log(endX, startX)
    const deviation = Number(startX) - Number(endX)
//    if (deviation > 30) {
//      setDel(true);
//    }
//    if (deviation < 0) {
//      setDel(false);
//    }
  }
  const deleteItem = async () => {
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
       </div>
       <div className={style.delete } onClick={deleteItem}>
         删除
       </div>
     </div>
   )
}

export default Item
