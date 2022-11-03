import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import LoginMenu from "../Menu/LoginMenu";
import AccountMenu from "../Menu/AccountMenu";
const pages = [
  { name: "Actualité", link: "/news" },
  { name: "Météo", link: "/weather" },
  { name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <div className="logo">
          <img
            className="logoimg"
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="menubar">
            {pages.map((page) => (
              <NavLink key={page.name} to={page.link}>
                {page.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="logo">
          {!currentUser ? (
            <i
              className="fa-solid fa-right-to-bracket icon"
              onClick={() => setShowLoginMenu(true)}
            />
          ) : (
            <img
              className="avatar"
              src={logo}
              alt="avatar"
              onClick={() => setShowAccountMenu(true)}
            />
          )}
        </div>
      </nav>
      <LoginMenu showMenu={showLoginMenu} setShowMenu={setShowLoginMenu} />
      <AccountMenu
        showMenu={showAccountMenu}
        setShowMenu={setShowAccountMenu}
      />
    </header>
  );
};
export default Navbar;
