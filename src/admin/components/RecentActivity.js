import React from "react";
import { useActivity } from "../../context/ActivityContext";

const RecentActivity = () =>{
  const {recentActivity} = useActivity();

     
    
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