"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [users, setUsers] = useState([]);
  return (
    <AppContext.Provider value={{ users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
