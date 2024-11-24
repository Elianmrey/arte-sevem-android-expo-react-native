import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (movie) => {
        if (!favorites.find((fav) => fav.id === movie.id)) {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);
