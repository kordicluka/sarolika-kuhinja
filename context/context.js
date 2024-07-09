"use client";
import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);

  return (
    <Context.Provider
      value={{
        workshops,
        setWorkshops,
        posts,
        setPosts,
        users,
        setUsers,
        meals,
        setMeals,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => {
  return useContext(Context);
};
