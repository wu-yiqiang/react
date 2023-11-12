import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
// import './laout.css'
import Menus from './menu'
import Head from './head'
import logo from '../static/img/logo.png' 
const { Header, Sider, Content } = Layout
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
          <img src={logo} alt="" style={{ width: 50, height: 50 }} />
          {!collapsed && (
          <span style={{ fontSize: '40', fontWeight: 700 }}>React Admin</span>
        )}
        </div>
        <Menus />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 20px 0 0', background: '#fff', lineHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
          <Head />
        </Header>
        <Content className="site-layout-background" style={{ margin: 20, minHeight: 280, backgroundColor: '#fff', borderRadius: '10px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App