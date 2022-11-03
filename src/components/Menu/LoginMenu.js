import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import LoginTab from "./Tabs/LoginTab";
import RegisterTabs from "./Tabs/RegisterTabs";

const LoginMenu = ({showMenu, setShowMenu}) => {
  const [tab, setTab] = useState(1);

  const handleTabs = (num) => setTab(num);
  return (
    <OutsideClickHandler onOutsideClick={()=>setShowMenu(false)}>
    <div className={showMenu?"loginMenu show":"loginMenu"}>
      <div className="tabBar">
        <button
          className={tab === 1 ? "active" : ""}
          onClick={() => handleTabs(1)}
        >
          Connection
        </button>
        <button
          className={tab === 2 ? "active" : ""}
          onClick={() => handleTabs(2)}
        >
          S'enregister
        </button>
      </div>
      <div className="tabContent">
        <div className={tab === 1 ? "show": "tab"}>
          <LoginTab setShowMenu={setShowMenu}/>
        </div>
        <div className={tab === 2 ? "show": "tab"}>
          <RegisterTabs setShowMenu={setShowMenu}/>
        </div>
      </div>
    </div>
    </OutsideClickHandler>
  );
};

export default LoginMenu;
