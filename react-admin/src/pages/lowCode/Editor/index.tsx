import { FC, useState } from 'react'
import Inputs from '@/components/FormComponents/Input/Input'
import Titles from '@/components/FormComponents/Title/Title'
import { componentConfList, getComponentConfByType } from '@/components/FormComponents/index'
import './Editor.scss'

function genComponent(compenntInfo: ComponentsInfoType) {
  const { type, props } = compenntInfo
  const componentConf = getComponentConfByType(type)
  const {Component} = componentConf
  if (!componentConf) return null
  return <Component {...props} />
}
const Editor: FC = () => {
  return <div className="canvas">{ componentConfList?.map(item => { 
    const {fe_id} = item
    return (
      <>
        <div key={fe_id} className="components-warp">
          <div className="component">{genComponent(item)}</div>
        </div>
      </>
    )
  }) }</div>
}

export default Editor
