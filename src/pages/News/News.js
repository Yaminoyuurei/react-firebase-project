import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import Articles from "./components/Articles";

const parser = new XMLParser({ ignoreAttributes: false });

const tabsData = [
  {
    id: "0",
    name: "Monde",
    url: "https://www.francetvinfo.fr/monde.rss",
    source: "Franceinfo",
  },
  {
    id: "1",
    name: "France",
    url: "https://www.francetvinfo.fr/france.rss",
    source: "Franceinfo",
  },
  {
    id: "2",
    name: "Jeux Vidéo",
    url: "https://www.gamergen.com/rss",
    source: "Gamergen",
  },
  {
    id: "3",
    name: "Informatique",
    url: "https://www.zdnet.fr/feeds/rss/actualites/informatique/",
    source: "zdnet",
  },
];
const News = () => {
  const [tabs, setTabs] = useState(tabsData[0]);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setLoading("LOADING");
    const CORS_URL = "https://corsproxy.io/?";
    axios
      .get(`${CORS_URL}${tabs.url}`)
      .then(({ data }) => {
        const resData = parser.parse(data.toString()).rss.channel.item;
        setData(resData);
        setLoading("OK");
      })
      .catch((e) => {
        setLoading("ERROR");
        console.log(e);
      });
  }, [tabs]);

  const handleChange = (newValue) => {
    setLoading("LOADING");
    window.scrollTo({
      top: 0, // for smoothly scrolling
    });
    setTabs(tabsData[parseInt(newValue)]);
    console.log(tabs);
  };
  return (
    <>
      <div className="tab-bar">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            className={tabs.id === tab.id ? "tab-item active" : "tab-item"}
            onClick={() => handleChange(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-container">
        {isLoading === "OK" && (
          <>
            {data.map((article) => (
              <Articles
                key={article.pubDate}
                article={article}
                source={tabs.source}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default News;
