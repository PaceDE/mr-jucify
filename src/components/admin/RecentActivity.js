import React from "react";
import { useState } from "react";

const RecentActivity = () =>{

     const [recentActivity, setRecentActivity] = useState([]);

     // Function to add recent activity and navigate
     const handleAction = (action, entity) => {
       const newActivity = `${action} ${entity} at ${new Date().toLocaleTimeString()}`;
       setRecentActivity((prev) => [newActivity, ...prev]); // Add new activity to topn
     };

    
    return (
        <>
      
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
            <p className="text-gray-400">No recent activity yet.</p>
        ) : (
            <ul className="space-y-2">
            {recentActivity.map((activity, index) => (
              <li key={index} className="bg-gray-700 p-2 rounded-md">
                {activity}
              </li>
            ))}
          </ul>
        )}
              </>
    );
};

export default RecentActivity