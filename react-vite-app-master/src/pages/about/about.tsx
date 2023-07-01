import { useState,useReducer } from 'react'
import style from './index.module.less'
import useCounterModel from '@/store/store'


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
  const model = useCounterModel()
  const demoImages = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80'
  ]
  const [visible, setVisible] = useState(false)

  const [state, dispatch] = useReducer(reducer, { list: []} as any)


  const objClick = () => {
    dispatch({ type: 'add', value: {data:2}})
  }
  const objClick2 = () => {
    dispatch({ type: 'change', value: {index:0,data: new Date().getSeconds()}})
  }

  return (
    <div className={style.about}>
      
    </div>
  )
}

export default About