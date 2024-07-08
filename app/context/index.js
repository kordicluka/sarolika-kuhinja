"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sectionTypes, setSectionTypes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        posts,
        setPosts,
        sectionTypes,
        setSectionTypes,
        meals,
        setMeals,
        workshops,
        setWorkshops,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
