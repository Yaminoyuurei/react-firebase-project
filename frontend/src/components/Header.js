import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import LoginTabs from "./MenuBar/LoginTabs";
import { MenuContext } from "../context/MenuContext";

const Header = () => {
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
      <LoginTabs/>
    </div>
  );
};

export default Header;
