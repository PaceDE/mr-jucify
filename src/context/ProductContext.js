import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [items, setItems] = useState([]); // Store fetched products
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [allCategory, setAllCategory] = useState([]);
  const [allTags, setAllTags] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getproducts"
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setItems(data);

        // Extract categories and tags from data
        const extractedTags = new Set();
        const extractedCategories = new Set();

        data.forEach((item) => {
          if (item.tags) item.tags.forEach((tag) => extractedTags.add(tag));
          if (item.category)
            item.category.forEach((cat) => extractedCategories.add(cat));
        });

        setAllTags([...extractedTags]);
        setAllCategory([...extractedCategories]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        items,
        selectedCategory,
        setSelectedCategory,
        currentTag,
        setCurrentTag,
        allCategory,
        allTags,
        loading,
        error
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for easy access
export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductContext;
