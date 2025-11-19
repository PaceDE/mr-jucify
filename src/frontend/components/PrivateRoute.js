import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const PrivateRoute = () => {

    const {isLoggedIn,isLoading}= useAuth();
    if (isLoading) return <div>Loading...</div>;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute