import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const Goto = (url) => window.open(url, "_blank");
  return (
    <footer>
      <hr />
      <img src={logo} alt="logo" />
      <div className="links">
        <Link to="/legal">Conditions d'utilisations</Link>
        <Link>Politique de confidentialité</Link>
      </div>
      <div className="network">
        <i
          className="fab fa-github"
          onClick={() => Goto("https://github.com/Vincent-Fe")}
        />
        <i
          className="fab fa-linkedin"
          onClick={() =>
            Goto("https://www.linkedin.com/in/vincent-ferigo-148ba924a/")
          }
        />
      </div>
      <h5>© 2022 Yaminoyuurei</h5>
    </footer>
  );
};
export default Footer;
