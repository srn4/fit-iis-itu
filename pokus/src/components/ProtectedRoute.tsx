import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/Authorization'; // Import your useAuth hook

const ProtectedRoute = () => {
  const { isAuthenticated, isVerifying } = useAuth();

  if (isVerifying) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
