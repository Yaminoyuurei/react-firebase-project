import React from "react";

const Articles = ({ article, source }) => {
  const goto = () => {
    window.open(article.link, "_blank");
  };
  const checkString = (item) => {
    let result = item.replace(/&#xE9;/gi, "é");
    result = result.replace(/&#xA0;/gi, " ");
    result = result.replace(/&nbsp;/gi, " ");
    result = result.replace(/&#x2019;/gi, "'");
    result = result.replace(/&#xE0;/gi, "à");
    result = result.replace(/&#xE8;/gi, "è");
    result = result.replace(/&#xC9;/gi, "É");
    result = result.replace(/&#xE7;/gi, "ç");
    result = result.replace(/&#x153;/gi, "œ");
    result = result.replace(/&#xEA;/gi, "ê");
    result = result.replace(/&#xF4;/gi, "ô");
    result = result.replace(/&#xC2;/gi, "Â");
    result = result.replace(/&#xC0;/gi, "À");
    result = result.replace(/&#xF9;/gi, "ù");
    result = result.replace(/&#xFB;/gi, "û");
    result = result.replace(/&#xEE;/gi, "î");
    return result;
  };
  return (
    <div className="tab-content">
      <div className="thumb">
        <img src={article.enclosure["@_url"]} alt={article.title} />
      </div>
      <div className="article">
        <h3>{checkString(article.title)}</h3>
        <p>{checkString(article.description)}</p>
      </div>
      <div className="toolbar">
        <i className="fas fa-eye" onClick={goto} alt="aller voir l'article"/>
        <h6>{source}</h6>
      </div>
    </div>
  );
};

export default Articles;
