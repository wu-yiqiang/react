import { Typography } from 'antd'
import { FC } from 'react'
import { defaultTitleProps, titleProps } from './interface'
const { Title } = Typography
const Titles: FC<titleProps> = (props: titleProps) => {
  const {text, level, isCenter} = {...defaultTitleProps,...props}
  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {text}
    </Title>
  )
}

export default Titles
