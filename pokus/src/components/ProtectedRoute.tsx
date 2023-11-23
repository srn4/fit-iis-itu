// ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authorization';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth?.isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while authentication status is being verified
  }

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

