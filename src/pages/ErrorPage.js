import React from "react";

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="error-page">
        <h1>Erreur 404</h1>
        <i className="fas fa-frown" />
        <h3>La page demandé n'existe pas</h3>
      </div>
    </div>
  );
};

export default ErrorPage;
