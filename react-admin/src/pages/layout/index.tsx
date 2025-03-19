import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Menus from './menu'
import Head from './head'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import './index.scss'
const { Header, Sider, Content } = Layout
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',columnGap: '10px', padding: "10px"}}>
          <SvgIcon name="eams" size="40px" />
          {!collapsed && <span style={{ fontSize: '40', fontWeight: 700 }}>EAMS</span>}
        </div>
        <Menus />
      </Sider>
      <Layout className="site-layout">
        <Header className="Header">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
          <Head />
        </Header>
        <div className="Content">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  )
}

export default App
