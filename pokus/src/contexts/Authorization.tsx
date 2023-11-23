import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Adjust the User interface as needed
interface User {
  id: number;
  login: string; // Assuming 'login' is the property you have in your backend user model
  // You can keep 'name' and 'email' if they are still relevant or remove them if not
  name?: string; // Optional if not always present
  email?: string; // Optional if not always present
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export type { AuthContextType };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Adjust the URL if necessary to point to your user verification endpoint
        const response = await axios.get('http://localhost:8000/api/auth/user', { withCredentials: true });
        if (response.data) {
          // Set user with the id and login received from the backend
          setUser({
            id: response.data.id,
            login: response.data.login,
            
          });
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setUser(null); // User is not authenticated
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
