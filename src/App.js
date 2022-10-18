import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Private from "./pages/private/Private";
import Account from "./pages/private/Account";
import ModalsManager from "./components/ModalsManager";
import News from "./pages/News/News";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ColorModeContext } from "./contexts/ColorModeContext";
import Footer from "./components/Footer";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";


function App() {
  const darkmode = localStorage.getItem("theme")
  const [mode, setMode] = useState(darkmode?darkmode:"light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );
  
  useEffect(() => {
    localStorage.setItem("theme",mode)
  }, [mode])
  
  return (
    <ColorModeContext.Provider value={{ mode, colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Navbar/>
        <ModalsManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/private" element={<Private />}>
            <Route path="/private/account" element={<Account />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
