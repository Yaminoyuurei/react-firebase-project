import React from "react";

const Contact = () => {
  return (
    <div className="container">
      <h1>Contactez-moi</h1>
      <div className="contact">
        <div className="contact-mail">
          <h2>Par E-mail</h2>
          <form action="">
            <label htmlFor="">Pseudo</label>
            <input type="text" />
            <label htmlFor="">E-mail</label>
            <input type="email" name="" id="" />
            <label htmlFor="">Message</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button className="btn" type="submit">
              Envoyer
            </button>
          </form>
        </div>
        <div className="contact-social">
          <h2>Sur les Réseaux sociaux</h2>
          <div className="social">
            <div className="social-link">
              <i className="fab fa-github" />
              <p>Github</p>
            </div>
            <div className="social-link">
              <i className="fab fa-linkedin" />
              <p>Linkedin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
