import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./components/Signup";
import Private from "./pages/private/Private";
import Account from "./pages/private/Account/Account";

function App() {
  return (
    <>
          <Navbar />
          <Login />
          <Signup />
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
