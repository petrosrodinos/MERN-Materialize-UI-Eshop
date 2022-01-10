import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/authHook";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
