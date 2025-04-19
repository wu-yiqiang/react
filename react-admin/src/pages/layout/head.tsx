import { SettingOutlined, BellOutlined, BgColorsOutlined, UserOutlined, TranslationOutlined, SearchOutlined } from '@ant-design/icons'
import './head.scss'
import { Input, Dropdown, MenuProps, Badge } from 'antd'
import eventMitt from "@/utils/eventMitt";
import SettingDialog from './settings'
import { useState } from 'react';
export default function Head() {
  return (
    <span className="Header">
      <Search />
      <Translate />
      <Theme />
      <div style={{ marginRight: 10 }}>
        <Notion />
      </div>
      <Setting />
      <User />
    </span>
  );
}

function Search() {
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
  const handleLanguage = (value: string) => {
    eventMitt.emit("SYSTEM:LANGUAGE", value);
  };
  const items: MenuProps["items"] = [
    {
      key: "en-US",
      label: <a onClick={() => handleLanguage("en-US")}>English</a>,
    },
    // {
    //   key: "AR",
    //   label: <a onClick={() => handleLanguage("AR")}>العربية</a>,
    // },
    {
      key: "zh-CN",
      label: <a onClick={() => handleLanguage("zh-CN")}>简体中文</a>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <TranslationOutlined className="headeIcon" />
    </Dropdown>
  );
}

function Theme() {
  const handleTheme = (value: string) => {
    eventMitt.emit("SYSTEM:THEME", value);
    // EventMitt("changeTheme", value);
  };
  const items: MenuProps["items"] = [
    {
      key: "light",
      label: <a onClick={() => handleTheme("light")}>浅色模式</a>,
    },
    {
      key: "dark",
      label: <a onClick={() => handleTheme("dark")}>暗黑模式</a>,
    },
    {
      key: "system",
      label: <a onClick={() => handleTheme("system")}>跟随系统</a>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <BgColorsOutlined className="headeIcon" />
    </Dropdown>
  );
}

function Notion() {
  return (
    <Badge count={100} offset={[-3, 0]}>
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
  const handleLogout = () => {
    // await logout()
    eventMitt.emit("STORE:TOEKN", "");
    eventMitt.emit('ROUTER:LOGOUT')
  };
  const items: MenuProps["items"] = [
    {
      key: "layout",
      label: <a onClick={handleLogout}>退出登录</a>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <UserOutlined className="headeIcon" />
    </Dropdown>
  );
}
