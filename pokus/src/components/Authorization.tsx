import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Make sure to send the credentials with the request
        const response = await axios.get('http://localhost:8000/api/auth/verify', { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error('Error verifying auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, isVerifying };
};

export default useAuth;