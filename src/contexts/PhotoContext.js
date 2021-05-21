import React, { useState, useEffect } from "react";

const PhotosContext = React.createContext();

function PhotosContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const url = "https://picsum.photos/v2/list?page=1&limit=100";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllPhotos(data));
  }, []);

  function toggleFavorite(id) {
    const updatedArr = allPhotos.map((photo) => {
      if (photo.id === id) {
        return {
          ...photo,
          isFavorite: !photo.isFavorite,
        };
      }
      return photo;
    });
    setAllPhotos(updatedArr);
  }

  function addToCart(newItem) {
    setCartItems((prevItems) => [...prevItems, newItem]);
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function emptyCart() {
    setCartItems([]);
  }

  const value = {
    allPhotos,
    toggleFavorite,
    addToCart,
    cartItems,
    removeFromCart,
    emptyCart,
  };

  return (
    <PhotosContext.Provider value={value}>{children}</PhotosContext.Provider>
  );
}

export { PhotosContextProvider, PhotosContext };
