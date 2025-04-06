import * as React from 'react'
import './card.scss'
const Card: React.FC = (props: any) => {
  const {title} = props
  return <div className="Card">
    <div className="title">{title}</div>
    <div className="count">12343455</div>
  </div>
}

export default Card