import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = () => Boolean(localStorage.getItem('accessToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  const login = () => {
    setIsAuthenticated(isLoggedIn);
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  }

  return (
      <AuthContext.Provider value={{ isAuthenticated, isLoggedIn, login, logout }}>
          {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
