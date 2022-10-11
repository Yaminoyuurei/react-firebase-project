import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "../services/firebase-config";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const register = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password)

  const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

  const editAccount = (props) =>
  updateProfile (auth.currentUser,props)

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setCurrentUser(currentUser)
      setLoadingData(false)
    })
    return unsubscribe
  },[])

  return (
    <AuthContext.Provider value={{ register, logIn, editAccount, currentUser }}>
      {!loadingData && props.children}
    </AuthContext.Provider>
  );
}
