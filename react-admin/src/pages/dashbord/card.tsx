import * as React from 'react'
import './card.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon.tsx'
const Card: React.FC = (props: any) => {
  const {title, name} = props
  return (
    <div className="Card">
      <div className="title">{title}</div>
      <div className="contents">
        <div className="count">12343455</div>
        <div className="icon">
          <SvgIcon name={name} size="70px" />
        </div>
      </div>
    </div>
  );
}

export default Card