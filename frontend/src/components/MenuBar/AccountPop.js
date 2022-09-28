import Cookies from "js-cookie";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import {useNavigate} from "react-router-dom"
import { MenuContext } from "../../context/MenuContext";

const AccountPop = (props) => {
  const {setTabs}=props
  const [, setAuth] = useContext(AuthContext);
  const [, setCurrentUser] = useContext(UserContext);
  const [, setShowMenu] = useContext(MenuContext)

  const nav = useNavigate()
  const navigate = (link) => {
    setShowMenu("hide")
    nav(link)
  }
  const handleClickLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/users/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });

      if (response.ok) {
        setAuth(Cookies.remove("jwt"));
        setCurrentUser(localStorage.removeItem("currentUser"));
        setShowMenu("hide");
        setTabs(1)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className="Form">
        <button onClick={()=> navigate("/account")} className="btn">
          Afficher le profil
        </button>
        <button onClick={handleClickLogout} className="btn-red">
          Se déconnecter
        </button>
      </div>
  );
};

export default AccountPop;
