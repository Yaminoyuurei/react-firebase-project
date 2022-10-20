import { TabContext, TabList } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Container,
  Paper,
  Tab,
} from "@mui/material";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import TabsContent from "./components/TabsContent";

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

  const handleChange = (e, newValue) => {
    setLoading("LOADING");
    window.scrollTo({
      top: 0 // for smoothly scrolling
 });
    setTabs(tabsData[parseInt(newValue)]);
    console.log(tabs);
  };
  return (
    <Box>
      <Box>
        <TabContext value={tabs.id}>
          <Box
            position="fixed"
            zIndex={2}
            width="100%"
          >
            <Paper >
            <Container>

              <TabList
                onChange={handleChange}
                variant="scrollable"
                ria-label="lab API tabs exemple"
                centered
                sx={{p:"auto"}}
              >
                {tabsData.map((tab) => (
                  <Tab key={tab.id} label={tab.name} value={tab.id} />
                ))}
              </TabList>
            </Container>
            </Paper>
          </Box>
          <Container sx={{ textAlign: "center", pt: 5 }}>
            {isLoading === "LOADING" && (
              <Box sx={{ pt: 25, pb: "100vh" }}>
                <CircularProgress />
              </Box>
            )}
            {isLoading === "ERROR" && (
              <Box sx={{ textAlign: "left" }}>
                <Alert severity="error">
                  <AlertTitle>Erreur</AlertTitle>
                  Impossible de charger le contenu, <br />
                  Il est possible que l'adresse fournit ne sois pas valide.
                </Alert>
              </Box>
            )}
            {isLoading === "OK" && <TabsContent tabs={tabs} data={data} />}
          </Container>
        </TabContext>
      </Box>
    </Box>
  );
};

export default News;
