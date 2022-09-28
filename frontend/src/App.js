import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Cookies from "js-cookie";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import Account from "./pages/Account";
import { MenuContext } from "./context/MenuContext";

function App() {
  const [auth, setAuth] = useState(() => {
    const savedCookie = Cookies.get("jwt");
    return savedCookie || "";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [showMenu, setShowMenu] = useState("hide")
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <MenuContext.Provider value={[showMenu, setShowMenu]}>

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {auth && auth[0] ? (
          <Route path="/account" element={<Account/>}/>
          ):(
            <Route path="/account" element={<Home/>}/>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MenuContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
