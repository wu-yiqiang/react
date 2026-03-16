import * as React from 'react'
import CountUp from 'react-countup'
import './card.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon.tsx'
import { Statistic } from 'antd'
const Card = (props: any) => {
  const {title, name, count = 123} = props
  return (
    <div className="Card">
      <div className="title">{title}</div>
      <div className="contents">
        <div className="count">
          {/* <CountUp end={count as number} separator="," /> */}
          <Statistic value={count as number} />
        </div>
        <div className="icon">
          <SvgIcon name={name} size="70px" />
        </div>
      </div>
    </div>
  )
}

export default Card