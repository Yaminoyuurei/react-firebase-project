import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Private from "./pages/private/Private";
import Account from "./pages/private/Account";
import News from "./pages/News/News";
import Footer from "./components/Footer";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import "./styles/style.scss";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
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
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
