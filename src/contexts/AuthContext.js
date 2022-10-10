import { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  
  return (
    <AuthContext.Provider value={{ register }}>
      {props.children}
    </AuthContext.Provider>
  );
}
