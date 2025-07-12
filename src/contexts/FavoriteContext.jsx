import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const FavoriteContext = createContext();
export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id);
      if (exists) {
        toast.error("Đã bỏ khỏi yêu thích 💔");
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        toast.success("Đã thêm vào yêu thích ❤️");
        return [...prev, item];
      }
    });
  };
  const isFavorite = (id) => favorites.some((item) => item.id === id);
  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
export function useFavorites() {
  return useContext(FavoriteContext);
}
