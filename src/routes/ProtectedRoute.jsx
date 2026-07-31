import React from 'react'
import { useGetUser } from '../hooks/Fetchdata'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth';

// ProtectedRoute.jsx
const ProtectedRoute = () => {
  const {data, isLoading, isError} = useAuth()

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data?.data) {
    return <Navigate to="/account/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute
