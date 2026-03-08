import { Input, Typography } from 'antd'
import { FC } from 'react'
import { defaultInputProps, inputProps } from './interface'
const { Paragraph } = Typography
const Inputs: FC<inputProps> = (props: inputProps) => {
  const { text, placeholder } = { ...defaultInputProps, ...props }
  return (
    <>
      <Paragraph strong>{text}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </>
  )
}

export default Inputs
