import React, { memo } from 'react'

interface Props {
  onClick: () => void
}

export default memo(function child(props: Props) {
  console.log('child')
  return (
    <div onClick={props.onClick}>
      child
    </div>
  )
})
