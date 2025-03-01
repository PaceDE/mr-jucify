import React, { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (wishlistItem) => wishlistItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        setNotification({
          message: `${item.name} is already in your wishlist!`,
        });
        return prevItems; // Return the previous state without modification
      } else {
        const newItem = { ...item };
        setNotification({
          message: `${item.name} added to wishlist!`,
        });
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
      if (itemToRemove) {
        setNotification({
          message: `${itemToRemove.name} removed from wishlist!`,
        });
      }
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      return updatedItems;
    });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const contextValue = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    notification,
    clearNotification,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
