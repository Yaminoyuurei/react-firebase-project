import React, { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Signin from "./Signin";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";

const Header = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [, setCurrentUser] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState("hide");
  const [showRegister, setShowRegister] = useState("hide");

  const handleClickLogout = async () => {
		try {
			const response = await fetch(`http://localhost:3333/api/users/logout`,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });

			if (response.ok) {
				setAuth(Cookies.remove('jwt'));
				setCurrentUser(localStorage.removeItem('currentUser'));
			}
		} catch (error) {
			console.log(error);
		}
	};

  return (
    <div className="header">
      <div className="navbar">
        <div className="icon">
          <NavLink to="/">
            <img src="./logo512.png" alt="" />
          </NavLink>
        </div>
        <div className="menu">
          {auth && auth[0] ? (
            <ul>
              <li>
                <NavLink onClick={handleClickLogout}>
                  <i className="fas fa-door-open" />
                  <span>Déconnexion</span>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fas fa-address-card" />
                  <span>Mon compte</span>
                </NavLink>
              </li>

              <li>
                <NavLink>
                  <i className="fas fa-address-card" />
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink
                  onClick={() => {
                    setShowLogin("Form");
                  }}
                >
                  <i className="fas fa-user-lock" />
                  <span>Connexion</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    setShowRegister("Form");
                  }}
                >
                  <i className="fas fa-plus-circle" />
                  <span>S'enregistrer</span>
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
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Signin showRegister={showRegister} setShowRegister={setShowRegister} />
    </div>
  );
};

export default Header;
