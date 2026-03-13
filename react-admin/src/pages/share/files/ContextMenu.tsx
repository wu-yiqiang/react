import React, { useState } from "react";
// https://www.oryoy.com/news/zhang-wo-react-you-jian-cai-dan-contextmenu-de-5-bu-shi-jian-zhi-nan-qing-song-shi-xian-zi-ding-yi-c.html
// 协同文档地址
// https://gitee.com/wfeng0/mpoe#https://gitee.com/link?target=https%3A%2F%2Fblog.csdn.net%2Fweixin_47746452%2Farticle%2Fdetails%2F132402713%3Fspm%3D1001.2014.3001.5501
// https://blog.csdn.net/weixin_47746452/article/details/132402713?spm=1001.2014.3001.5501
// https://juejin.cn/post/7273432426772070457
const ContextMenu = ({ children, items }: { children: any, items: any }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event: any) => {
    event.preventDefault();
    setShowMenu(false);
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setShowMenu(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div>
      {children}
      {showMenu && (
        <ul
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {items.map((item: any, index: number) => (
            <li key={index} onClick={() => item.action()}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ContextMenu;
