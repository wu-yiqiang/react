import { useState,useReducer } from 'react'
import style from './index.module.less'


const reducer = (state: any, action: any) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === 'add') {
    newState.list.push(action.value);
    return {...newState}
  } else if (action.type === 'change') { 
    newState.list[action.value.index].data = action.value.data
    return {...newState};
  } else {
    throw new Error();
  }
}


function About() {
  
  return (
    <div className={style.Sport}>
      运动展示
    </div>
  )
}

export default About