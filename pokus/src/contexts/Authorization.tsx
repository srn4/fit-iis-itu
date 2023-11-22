import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export const AuthContext = createContext({
  isAuthenticated: false,
  isVerifying: true,
  user: null
});

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Make sure to send the credentials with the request
        const response = await axios.get('http://localhost:8000/api/auth/verify', { withCredentials: true });
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Store user data
        }
      } catch (error) {
        console.error('Error verifying auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, isVerifying, user };
};

type AuthProviderProps = {
  children: ReactNode; // Define the type for children
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;