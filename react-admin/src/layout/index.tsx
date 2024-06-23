import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Menus from './menu'
import Head from './head'
import logo from '@/assets/images/logo.png'
import './index.scss'
const { Header, Sider, Content } = Layout
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
          <img src={logo} alt="" style={{ width: 50, height: 50 }} />
          {!collapsed && <span style={{ fontSize: '40', fontWeight: 700 }}>BLMS</span>}
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
