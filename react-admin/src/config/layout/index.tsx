import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
// import './laout.css'
import MyMenu from './menu'

const { Header, Sider, Content } = Layout
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MyMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
        </Header>
        <Content className='site-layout-background' style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App