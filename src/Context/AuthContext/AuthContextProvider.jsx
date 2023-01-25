import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// import { Auth } from "../../../src/Firebase/firebase";
import { Auth } from "../../Firebase/firebase";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth") || false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin-status") || false
  );

  function setUserAsAdmin() {
    setIsAdmin(!isAdmin);
    localStorage.setItem("admin-status", isAdmin);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(Auth, email, password);
  }
  function logIn(email, password) {
    setisAuth(true);
    localStorage.setItem("isAuth", true);
    return signInWithEmailAndPassword(Auth, email, password);
  }
  function logOut() {
    signOut(Auth);
    setisAuth(false);
    localStorage.setItem("isAuth", false);
    setIsAdmin(false);
    localStorage.setItem("admin-status", false);
  }
  function googleSignIn() {
    const google_Auth_Provider = new GoogleAuthProvider();
    setisAuth(true);
    localStorage.setItem("isAuth", true);
    return signInWithPopup(Auth, google_Auth_Provider);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
    });
    // this will run when component unmount
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        googleSignIn,
        setUserAsAdmin,
        isAdmin,
        isAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
