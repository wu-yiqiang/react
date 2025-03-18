import { SettingOutlined, NotificationOutlined, BgColorsOutlined, UserOutlined, TranslationOutlined, SearchOutlined } from '@ant-design/icons'
import './head.scss'
import { Input, Dropdown, MenuProps } from 'antd'


export default function Head() {
  return (
    <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Search />
      <Translate />
      <Theme />
      <Notion />
      <Setting />
      <User />
    </span>
  )
}

function Search() {
  // return <SearchOutlined className='headeIcon'/>
  return (
    <div className="search-expand-container">
      <Input
        prefix={<SearchOutlined />}
        className="search-expanding-input"
        placeholder="Search..."
      />
    </div>
  );
}


function Translate() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a>English</a>
    },
    {
      key: '2',
      label: <a>العربية</a>
    },
    {
      key: '3',
      label: <a>简体中文</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <TranslationOutlined className="headeIcon" />
    </Dropdown>
  )
}

function Theme() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a>浅色模式</a>
    },
    {
      key: '2',
      label: <a>跟随系统</a>
    },
    {
      key: '3',
      label: <a>暗黑模式</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <BgColorsOutlined className="headeIcon" />
    </Dropdown>
  )
}

function Notion() {
  return <NotificationOutlined className="headeIcon" />
}

function Setting() {
  return <SettingOutlined className="headeIcon" />
}


function User() {
  const items: MenuProps['items'] = [
    {
      key: 'layout',
      label: <a>退出登录</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <UserOutlined className="headeIcon" />
    </Dropdown>
  )
}
