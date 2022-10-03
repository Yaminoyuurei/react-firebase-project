import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import Menu from "./MenuBar/Menu";
import { MenuContext } from "../context/MenuContext";

const Header = () => {
  const [tabs, setTabs] = useState(1);
  const [auth] = useContext(AuthContext);
  const [currentUser] = useContext(UserContext);
  const [, setShowMenu] = useContext(MenuContext);

  return (
    <div className="header">
      <div className="navbar">
        <div className="icon">
          <NavLink to="/">
            <img src="./logo512.png" alt="" />
          </NavLink>
        </div>
        <div className="menu">
      {/* Si authentifié */ }
          {auth && auth[0] ? (
            <ul>
              <li>
                <NavLink
                  onClick={() => {
                    setShowMenu("container");
                    setTabs(3)
                  }}
                >
                  <i className="fas fa-address-card" />
                  <span>{currentUser.pseudo}</span>
                </NavLink>
              </li>

              <li>
                <NavLink>
                  <i className="fas fa-address-card" />
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>
        /* Si non authentifié */
          ) : (
            <ul>
              <li>
                <NavLink
                  onClick={() => {
                    setShowMenu("container");
                    setTabs(1)
                  }}
                >
                  <i className="fas fa-user-lock" />
                  <span>Connexion</span>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fas fa-address-card" />
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Menu tabs={tabs} setTabs={setTabs}/>
    </div>
  );
};

export default Header;
