import { TabContext, TabList } from "@mui/lab";
import { Alert, AlertTitle, Box, CircularProgress, Container, Tab } from "@mui/material";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import TabsContent from "./components/TabsContent";

const parser = new XMLParser({ ignoreAttributes: false });

const tabsData = [
  { id: "0", name: "Monde", url: "https://www.france24.com/fr/rss", source:"France24" },
  { id: "1", name: "France", url: "https://www.france24.com/fr/france/rss", source:"France24" },
  { id: "2", name: "Jeux Vidéo", url: "https://www.gamergen.com/rss", source:"Gamergen" },
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
        console.log(e)
      });
  }, [tabs]);

  const handleChange = (e, newValue) => {
    setLoading("LOADING");
    setTabs(tabsData[parseInt(newValue)]);
    console.log(tabs);
  };
  return (
    <Container sx={{ textAlign: "center" }}>
      <h1>Actualités</h1>
      <Box>
        <TabContext
          value={tabs.id}
        >
          <Box>
            <TabList onChange={handleChange} variant="scrollable" ria-label="lab API tabs exemple">
              {tabsData.map((tab) => (
                <Tab key={tab.id} label={tab.name} value={tab.id} />
              ))}
            </TabList>
          </Box>
          {isLoading === "LOADING" && (
            <Box sx={{ p: 25 }}>
              <CircularProgress />
            </Box>
          )}
          {isLoading === "ERROR" && (
            <Box sx={{ textAlign: "left" }}>
            <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
              Impossible de charger le contenu, <br/>
              Il est possible que l'adresse fournit ne sois pas valide.
            </Alert>
            </Box>
          )}
          {isLoading === "OK" && (
                <TabsContent tabs={tabs} data={data}/>
          )}
              
        </TabContext>
      </Box>
    </Container>
  );
};

export default News;
