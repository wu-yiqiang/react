import * as React from 'react'
import CountUp from 'react-countup'
import './card.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon.tsx'
const Card: React.FC = (props: any) => {
  const {title, name, count} = props
  return (
    <div className="Card">
      <div className="title">{title}</div>
      <div className="contents">
        <div className="count">
          <CountUp end={count as number} separator="," />
        </div>
        <div className="icon">
          <SvgIcon name={name} size="70px" />
        </div>
      </div>
    </div>
  )
}

export default Card