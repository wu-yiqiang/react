import React, { useState } from "react";
// https://www.oryoy.com/news/zhang-wo-react-you-jian-cai-dan-contextmenu-de-5-bu-shi-jian-zhi-nan-qing-song-shi-xian-zi-ding-yi-c.html
const ContextMenu = ({ children, items }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    event.preventDefault();
    setShowMenu(false);
  };

  const handleContextMenu = (event) => {
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
          {items.map((item, index) => (
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
