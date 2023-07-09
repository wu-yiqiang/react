import style from './index.module.less'
import { ReactNode, useEffect, useState } from 'react'
interface Props {
  current: number
  lists: [SportList]
}
function Indicator(props: Props) {
  const { current, lists } = props
  return (
    <div className={style.Indicator}>
      {lists.map((v, index) => {
        return <div key={index} className={current === index ? `${style.active} ${style.circle}` : `${style.circle}`}></div>
      })}
    </div>
  )
}

export default Indicator
