import { Children, FC, useState } from 'react'
import Inputs from '@/components/FormComponents/Input/Input'
import Titles from '@/components/FormComponents/Title/Title'
import './LeftPanel.scss'
import { Tabs } from 'antd'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'
import { icons } from 'antd/es/image/PreviewGroup'
import ComponentsLibs from '../Editor/ComponentsLibs'

const LeftPanel: FC = () => {
  const tabItem = [
    {
      key: 'components',
      label: '组件库',
      icon: <AppleOutlined />,
      Children: <ComponentsLibs />
    },
    {
      key: 'layers',
      label: '图层',
      icon: <AndroidOutlined />,
      Children: <>图层</>
    }
  ]
  return (
    <div className="LeftPanel">
      <Tabs
        defaultActiveKey="2"
        items={tabItem.map((item, i) => {
          const id = String(i + 1)
          return {
            key: item.key,
            label: item.label,
            children: item.Children,
            icon: item.icon
          }
        })}
      />
    </div>
  )
}

export default LeftPanel
