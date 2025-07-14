import { createContext, useContext, useEffect, useState } from "react";

const ViewedContext = createContext();

export function ViewedProvider({ children }) {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("viewed");
    if (stored) setViewed(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("viewed", JSON.stringify(viewed));
  }, [viewed]);

  const addToHistory = (item) => {
    setViewed((prev) => {
      const filtered = prev.filter((v) => v.id !== item.id);
      return [item, ...filtered].slice(0, 20);
    });
  };

  return (
    <ViewedContext.Provider value={{ viewed, addToHistory }}>
      {children}
    </ViewedContext.Provider>
  );
}

export function useViewed() {
  return useContext(ViewedContext);
}
