import { FC, useState } from 'react'
import { Typography } from 'antd'
import './index.scss'
const { Title } = Typography
import { ComponentConfType, componentsGroup } from '@/components/FormComponents/index'
const genComponent = (compenntsConfig: ComponentConfType) => {
  const { title, type, Component } = compenntsConfig 
  const handleClick = () => {
    
  }
  return (
    <div className="components-warp" onClick={handleClick}>
      <div className="compoents">
        <Component />
      </div>
    </div>
  )
}
const ComponentsLibs: FC = () => {
  return (
    <>
      {componentsGroup?.map((group, index) => {
        return (
          <div key={index}>
            <Title level={4}>{group?.groupName}</Title>
            <div style={{ paddingLeft: '4px' }}>{group?.components?.map((item) => genComponent(item))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentsLibs
