import React, { useState } from "react";
import { Routes,Route,Link,Outlet,useNavigate } from "react-router-dom";
import RecentActivity from "./admin/RecentActivity";
import CreateProduct from "./admin/CreateProduct";
import ChangeProduct from "./admin/ChangeProduct";
import DeleteProduct from "./admin/UpdateProduct";

const AdminPage = () => {
  const navigate =useNavigate();


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Site Administration</h1>
      <Link
        to="/admin"
        className="mb-4 px-4 py-2 bg-[#679509] text-white rounded-lg hover:bg-green-700"
      >
        Home
      </Link>

      <div className="mt-10 grid grid-cols-12 gap-6">
        {/* Left Side: Table Blueprint */}
        <div className="col-span-5 bg-gray-800  p-4 rounded-2xl shadow-md">
          <table className="table-auto w-full border ">
            {/* Header Row */}
            <thead className="bg-[#679509] text-white">
              <tr>
                <th colSpan="4" className="p-3 text-left">
                  Authentication
                </th>
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {/* Groups Row */}
              <tr className=" border-b bg-gray-900 ">
                <td className="p-3 w-3/4">Groups</td>
                <td className="p-3 w-1/4 flex space-x-5">
                  <button className="text-blue-400">+ Add</button>
                  <button className="text-yellow-400">✎ Change</button>
                  <button className="text-red-400">✖ Delete</button>
                </td>
              </tr>

              {/* Users Row */}
              <tr className="bg-gray-700 border-b border-gray-500">
                <td className="p-3 w-3/4">Users</td>
                <td className="p-3 w-1/4 flex space-x-5">
                  <button className="text-blue-400">+ Add</button>
                  <button className="text-yellow-400">✎ Change</button>
                  <button className="text-red-400">✖ Delete</button>
                </td>
              </tr>
            </tbody>

            {/* Second Header Row */}
            <thead className="bg-[#679509] text-white">
              <tr>
                <th colSpan="4" className="p-3 text-left">
                  Authentication
                </th>
              </tr>
            </thead>

            {/* Body Rows Again */}
            <tbody>
              {/* Groups Row */}
              <tr className="bg-gray-900 border-b ">
                <td className="p-3 w-3/4">Product</td>
                <td className="p-3 w-1/4 flex space-x-5">
                  <Link className="text-blue-400" to="/admin/product/create">
                    + Add
                  </Link>
                  <button
                    className="text-yellow-400"
                    onClick={() => navigate("/admin/product/change")}
                  >
                    ✎ Change
                  </button>
                  <button
                    className="text-red-400"
                    onClick={() => navigate("/admin/product/delete")}
                  >
                    ✖ Delete
                  </button>
                </td>
              </tr>

              {/* Users Row */}
              <tr className="bg-gray-700 border-b border-gray-500">
                <td className="p-3 w-3/4">Order</td>
                <td className="p-3 w-1/4 flex space-x-5">
                  <button className="text-blue-400">+ Add</button>
                  <button className="text-yellow-400">✎ Change</button>
                  <button className="text-red-400">✖ Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-7 bg-gray-800 p-6 shadow-lg rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
