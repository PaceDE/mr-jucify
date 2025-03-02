import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToWishlist = (item) => {
    const itemExists = wishlistItems.some(
      (wishlistItem) => wishlistItem.id === item.id,
    );

    if (itemExists) {
      setNotification({ message: `${item.name} is already in your wishlist!` });
    } else {
      setWishlistItems((prevItems) => [...prevItems, item]);
      setNotification({ message: `${item.name} added to wishlist!` });
    }
  };

  const removeFromWishlist = (id, name) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setNotification({ message: `${name} removed from wishlist!` });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        notification,
        clearNotification,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
