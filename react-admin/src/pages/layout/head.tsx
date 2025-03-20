import { SettingOutlined, NotificationOutlined, BgColorsOutlined, UserOutlined, TranslationOutlined, SearchOutlined } from '@ant-design/icons'
import './head.scss'
import { Input, Dropdown, MenuProps } from 'antd'
import { logout } from "@/api/user";
import useSystemStore from '@/store/index'
import eventMitt from "@/utils/eventMitt";
export default function Head() {
  return (
    <span style={{ display: "flex", justifyContent: "flex-end" }}>
      <Search />
      <Translate />
      <Theme />
      <Notion />
      <Setting />
      <User />
    </span>
  );
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
  const handleLanguage = (value: string) => {
    eventMitt.emit("SYSTEM:LANGUAGE", value);
  };
  const items: MenuProps["items"] = [
    {
      key: "EN",
      label: <a onClick={() => handleLanguage("EN")}>English</a>,
    },
    // {
    //   key: "AR",
    //   label: <a onClick={() => handleLanguage("AR")}>العربية</a>,
    // },
    {
      key: "CN",
      label: <a onClick={() => handleLanguage("CN")}>简体中文</a>,
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
  return <NotificationOutlined className="headeIcon" />;
}

function Setting() {
  return <SettingOutlined className="headeIcon" />;
}

function User() {
  const handleLogout = () => {
    // await logout()
    eventMitt.emit("ROUTER:LOGIN");
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
