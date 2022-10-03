import React from "react";
import { useContext } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { MenuContext } from "../../context/MenuContext";
import AccountPop from "./AccountPop";
import Login from "./Login";
import Signin from "./Signin";

const Menu = (props) => {
  const [showMenu, setShowMenu] = useContext(MenuContext);
  const {tabs, setTabs} = props;
  const handleTab = (id) => {
    setTabs(id);
  };


  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowMenu("hide");
      }}
    >
    {}
      <div className={showMenu}>
        <div className={tabs === 3 ? "hide" : "bloc-tabs"}>
          <div
            className={tabs === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => handleTab(1)}
          >
            Se connecter
          </div>
          <div
            className={tabs === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => handleTab(2)}
          >
            S'inscrire
          </div>
        </div>
        <div className="content-tabs">
          <div className={tabs === 1 ? "content active-content" : "content"}>
            <Login/>
          </div>
          <div className={tabs === 2 ? "content active-content" : "content"}>
            <Signin/>
          </div>
          <div className={tabs === 3 ? "content active-content" : "content"}>
            <AccountPop/>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Menu;
