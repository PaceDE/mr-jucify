import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you'll fetch recent activity from an API

const RecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState([]);
   useEffect(() => {
     const fetchRecentActivity = async () => {
       try {
         const response = await axios.get("http://localhost:5000/api/activity");
         setRecentActivity(response.data);
       } catch (error) {
         console.error("Error fetching recent activity", error);
       }
     };

     fetchRecentActivity();
   }, []); 

  // You might want to fetch the data from an API on component mount
 
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      {recentActivity.length === 0 ? (
        <p className="text-gray-400">No recent activity yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700 mt-4">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 p-2">S.N</th>
              <th className="border border-gray-700 p-2">Action</th>
              <th className="border border-gray-700 p-2">Entity</th>
              <th className="border border-gray-700 p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((activity, index) => (
              <tr key={index} className="bg-gray-700 p-2 rounded-md">
                <td className="border border-gray-700 p-2">{index + 1}</td>
                <td className="border border-gray-700 p-2">
                  {activity.action}
                </td>
                <td className="border border-gray-700 p-2">
                  {activity.entity}
                </td>
                <td className="border border-gray-700 p-2">
                  {new Date(activity.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RecentActivity;
