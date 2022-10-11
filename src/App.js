import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Private from "./pages/Private";
import Account from "./pages/private/Account";
import "./App.css";
import ModalsManager from "./components/ModalsManager";
function App() {
  return (
    <>
      <Navbar />
      <ModalsManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/account" element={<Account />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
