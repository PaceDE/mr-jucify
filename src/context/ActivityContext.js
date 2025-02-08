import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ActivityContext = createContext();

// Create a provider component
export const ActivityProvider = ({ children }) => {
  const [recentActivity,setRecentActivity] = useState([]);
  
    // Function to add recent activity and navigate
    const handleActivity = (action, entity) => {
      const newActivity = `${action} ${entity} at ${new Date().toLocaleTimeString()}`;
      setRecentActivity((prev) => [newActivity, ...prev]); // Add new activity to topn
    };

  return (
    <ActivityContext.Provider
      value={{
       recentActivity,handleActivity
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

// Custom hook for easy access
export const useActivity = () => {
  return useContext(ActivityContext);
};

export default ActivityContext;
