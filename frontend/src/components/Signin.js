import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

const Signin = (props) => {
  const { showRegister, setShowRegister } = props;
  if (showRegister){
  return (
    <OutsideClickHandler
    onOutsideClick={()=>{setShowRegister("hide")}}>
    <div className={showRegister}>
      <form>
        <label htmlFor="pseudo">Pseudo : </label>
        <br />
        <input type="text" name="pseudo" id="pseudo" />
        <br />

        <label htmlFor="email">E-mail :</label>
        <br />
        <input type="email" name="email" id="email" />
        <br />

        <label htmlFor="password">Mot de passe :</label>
        <br />
        <input type="password" name="password" id="password" />
        <br />

        <input type="submit" value="S'inscrire" className="btn" />
      </form>
    </div>
    </OutsideClickHandler>
  );
}
};

export default Signin