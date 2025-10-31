import React, { useContext, useState, useEffect, createContext } from "react";
// Import Firebase auth functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase"; // import the auth instance

const AuthContext = createContext();// Create Auth Context
// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);// Custom hook to use the AuthContext
}
//  AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signup
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout
  function logout() {
    return signOut(auth);
  }

  // Track authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // cleanup listener
  }, []);
// Value to be provided by the AuthContext
  const value = {currentUser,login,signup,logout,};

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}