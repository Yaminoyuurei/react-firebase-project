import React from "react";
import { useContext } from "react";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { MenuContext } from "../../context/MenuContext";
import AccountPop from "./AccountPop";
import Login from "./Login";
import Signin from "./Signin";

const LoginTabs = () => {
  const [showMenu, setShowMenu] = useContext(MenuContext)
  const [tabs, setTabs] = useState(1);

  const handleTab = (id) => {
    setTabs(id);
  };

  return (
    <OutsideClickHandler
        onOutsideClick={() => {
          setShowMenu("hide");
        }}
      >

    <div className={showMenu}>
      <div className={tabs===3?"hide":"bloc-tabs"}>
        <div className={tabs===1?"tabs active-tabs":"tabs"} onClick={() => handleTab(1)}>
          Se connecter
        </div>
        <div className={tabs===2?"tabs active-tabs":"tabs"} onClick={() => handleTab(2)}>
          S'inscrire
        </div>
      </div>
      <div className="content-tabs">
        <div className={tabs === 1 ? "content active-content" : "content"}>
          <Login setTabs={setTabs}/>
        </div>
        <div className={tabs === 2 ? "content active-content" : "content"}>
          <Signin setTabs={setTabs}/>
        </div>
        <div className={tabs === 3 ? "content active-content" : "content"}>
          <AccountPop setTabs={setTabs}/>
        </div>
      </div>
    </div>
      </OutsideClickHandler>
  );
};

export default LoginTabs;
