import { SettingOutlined, BellOutlined, BgColorsOutlined, UserOutlined, TranslationOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons'
import './head.scss'
import { Input, Dropdown, MenuProps, Badge, Avatar } from 'antd'
import eventMitt from "@/utils/eventMitt";
import SettingDialog from './settings'
import { useEffect, useState } from 'react'
import { logout } from '@/api/public'
import Toast from '@/components/Toast'
import useSystemStore from '@/store'
import { SystemStore } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { sseService } from '@/network/sse'

export default function Head() {
  return (
    <span className="Header">
      <Search />
      <Translate />
      <Theme />
      <Lock />
      <div style={{ marginRight: 10 }}>
        <Notion />
      </div>
      <Setting />
      <User />
    </span>
  )
}

function Search() {
  const { t } = useTranslation()
  return (
    <div className="search-expand-container">
      <Input prefix={<SearchOutlined />} className="search-expanding-input" placeholder={t('search')} />
    </div>
  )
}
const Lock = () => {
  const handleLock = () => {
    eventMitt.emit('SYSTEM:LOCKSCREEN')
  }
  return (
    <div className="search-expand-container">
      <LockOutlined className="headeIcon" onClick={handleLock} />
    </div>
  )
}

function Translate() {
  const handleLanguage = (value: string) => {
    eventMitt.emit('SYSTEM:LANGUAGE', value)
  }
  const items: MenuProps['items'] = [
    {
      key: 'en-US',
      label: <a onClick={() => handleLanguage('en-US')}>English</a>
    },
    // {
    //   key: "AR",
    //   label: <a onClick={() => handleLanguage("AR")}>العربية</a>,
    // },
    {
      key: 'zh-CN',
      label: <a onClick={() => handleLanguage('zh-CN')}>简体中文</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <TranslationOutlined className="headeIcon" />
    </Dropdown>
  )
}

function Theme() {
  const { t } = useTranslation()
  const handleTheme = (value: string) => {
    eventMitt.emit('SYSTEM:THEME', value)
    // EventMitt("changeTheme", value);
  }
  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: <a onClick={() => handleTheme('light')}>{t('lightMode')}</a>
    },
    {
      key: 'dark',
      label: <a onClick={() => handleTheme('dark')}>{t('darkMode')}</a>
    },
    {
      key: 'system',
      label: <a onClick={() => handleTheme('system')}>{t('systemMode')}</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <BgColorsOutlined className="headeIcon" />
    </Dropdown>
  )
}

function Notion() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const params = {
      url: 'http://127.0.0.1:7788/sse',
      onmessage: ({ data }: any) => {
        const datas = JSON.parse(data)
        datas ? setCount(datas) : setCount(0)
      },
      onopen: () => {},
      finallyHandler: () => {}
    }
    sseService.connect(params)
  }, [])
  return (
    <Badge count={count} offset={[-3, 0]}>
      <BellOutlined className="headeIcon" />
    </Badge>
  )
}

function Setting() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <SettingOutlined className="headeIcon" onClick={() => setOpen(true)} />
      {open ? <SettingDialog open={ open }  handleClose={() => setOpen(false)}/>
: null }
    </>
  )
 }

function User() {
  const { t } = useTranslation()
  const { userInfo } = useSystemStore() as SystemStore
  const handleLogout = async () => {
    await logout()
    eventMitt.emit('STORE:USER', {})
    eventMitt.emit('ROUTER:LOGOUT')
    Toast.success('操作成功')
  };
  const items: MenuProps['items'] = [
    {
      key: 'layout',
      label: <a onClick={handleLogout}>{t('logout')}</a>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Avatar src={userInfo?.avatar} size={36} style={{ objectPosition: 'top' }} icon={<UserOutlined />} />
    </Dropdown>
  )
}
