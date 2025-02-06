import { createContext, useState, useContext } from "react";

// Create the context
const CategoryContext = createContext();

// Create a provider component
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("Select Category");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook for easy access
export const useCategory = () => {
  return useContext(CategoryContext);
};

export default CategoryContext;
