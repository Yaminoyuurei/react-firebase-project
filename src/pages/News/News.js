import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Alert, AlertTitle, Box, CircularProgress, Container, Grid, Tab } from "@mui/material";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import Articles from "./components/Articles";

const parser = new XMLParser({ ignoreAttributes: false });

const tabsData = [
  { id: "1", name: "France", url: "https://www.francetvinfo.fr/titres.rss" },
  { id: "2", name: "Jeux Vidéo", url: "https://www.gamergen.com/rss" },
  { id: "3", name: "Nodejs", url: "https://nodejs.developpez.com/index/rss" },
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
        const resData = () => parser.parse(data.toString()).rss.channel.item;
        setData(resData);
        setLoading("OK");
      })
      .catch((e) => {
        setLoading("ERROR");
      });
  }, [tabs]);

  const handleChange = (e, newValue) => {
    setLoading("LOADING");
    setTabs(tabsData[parseInt(newValue) - 1]);
    console.log(tabs);
  };
  return (
    <Container sx={{ textAlign: "center" }}>
      <h1>News</h1>
      <Box>
        <TabContext
          value={tabs.id}
        >
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs exemple">
              {tabsData.map((tab) => (
                <Tab key={tab.id} label={tab.name} value={tab.id} />
              ))}
            </TabList>
          </Box>
          {isLoading === "LOADING" && (
            <Box sx={{ pt: 25 }}>
              <CircularProgress />
            </Box>
          )}
          {isLoading === "ERROR" && (
            <Box sx={{ textAlign: "left" }}>
            <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
              Impossible de charger le Contenu.
            </Alert>
            </Box>
          )}
          <TabPanel value={tabsData[0].id}>
            {isLoading === "OK" && tabs.id === "1" && (
              <Grid container spacing={2}>
                {data.map((article) => (
                  <Grid item xs={12} md={4} key={article.pubDate}>
                    <Articles
                      article={article}
                      image={article.enclosure["@_url"]}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
          <TabPanel value={tabsData[1].id}>
            {isLoading === "OK" && tabs.id === "2" && (
              <Grid container spacing={2}>
                {data.map((article) => (
                  <Grid item xs={12} md={4} key={article.pubDate}>
                    <Articles
                      article={article}
                      image={article["media:content"]["@_url"]}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
          <TabPanel value={tabsData[2].id}>
            {isLoading === "OK" && tabs.id === "3" && (
              <Grid container spacing={2}>
              {console.log(data)}
                {data.map((article) => (
                  <Grid item xs={12} md={4} key={article.pubDate}>
                    <Articles
                      article={article}
                      image={article["enclosure"]["@_url"]}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default News;
