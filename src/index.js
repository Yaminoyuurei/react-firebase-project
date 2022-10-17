import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MenuContextProvider } from "./contexts/MenuContext";
import { AuthContextProvider } from "./contexts/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MenuContextProvider>
          <App />
        </MenuContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
