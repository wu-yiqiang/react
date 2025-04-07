import * as React from 'react'
import './card.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon.tsx'
const Card: React.FC = (props: any) => {
  const {title, name, count} = props
  return (
    <div className="Card">
      <div className="title">{title}</div>
      <div className="contents">
        <div className="count">{count.toLocaleString('en-US')}</div>
        <div className="icon">
          <SvgIcon name={name} size="70px" />
        </div>
      </div>
    </div>
  )
}

export default Card