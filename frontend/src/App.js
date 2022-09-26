import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Cookies from "js-cookie";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

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
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
