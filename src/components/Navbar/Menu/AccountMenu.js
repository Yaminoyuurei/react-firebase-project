import { signOut } from "firebase/auth";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase-config";

const AccountMenu = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate();

  const goTo = (link) =>{
    navigate(link)
    setShowMenu(false)
  }

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setShowMenu(false)
    } catch (error) {
      alert("For some Reason we can't disconnect");
    }
  };
  return (
    <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
      <div className={showMenu?"accountMenu show":"accountMenu"}>
        <div className="accountContentMenu">
          <button onClick={()=>goTo("/private/account")}>
            <i className="fa-solid fa-user-gear"></i>
            <p>Compte</p>
          </button>
          <button className="disconnect" onClick={logOut}>
            <i className="fas fa-sign-out-alt"></i>
            <p>Déconnexion</p>
          </button>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default AccountMenu;
