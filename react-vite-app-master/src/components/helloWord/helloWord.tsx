import { useState,memo } from 'react'

interface props { 
  count: number
  onClick: ()=> void
}

const helloWord = (props:props) =>{
  console.log('helloWord')
  return (
    <div className="helloWord" onClick={props.onClick}>
      HelloWord:{props.count}
    </div>
  )
}

export default memo(helloWord)