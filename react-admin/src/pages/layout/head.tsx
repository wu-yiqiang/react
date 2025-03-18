import { SettingOutlined, NotificationOutlined, BgColorsOutlined, UserOutlined, TranslationOutlined, SearchOutlined } from '@ant-design/icons'
import './head.scss'
import { Input } from "antd";


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
  return <TranslationOutlined className="headeIcon" />
}

function Theme() {
  return <BgColorsOutlined className="headeIcon" />
}

function Notion() {
  return <NotificationOutlined className="headeIcon" />
}

function Setting() {
  return <SettingOutlined className="headeIcon" />
}

function User() {
  return <UserOutlined className="headeIcon" />
}
