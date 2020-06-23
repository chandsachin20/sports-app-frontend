import React, { useState, createContext } from "react";

export const userContext = createContext();

export const ContextWrapper = (props) => {

    const defaultValueHandler = () => {
        const user = localStorage.getItem('user');
        if(user) return true
        return false
    }
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValueHandler);

  const user = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
};
