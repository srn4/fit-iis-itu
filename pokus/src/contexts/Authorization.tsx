import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { apiUrl } from "../constants";

// Defining the shape of the context's value
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create a context for authorization with an initial value
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    console.log("Checking for token...");
    const token = localStorage.getItem("auth_token");
    if (token) {
      console.log("Token found, validating...");
      axios
        .get(`${apiUrl}/api/validateToken`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Token is valid:", response.data);
          setIsAuthenticated(true);
          setUser(response.data.user); // Assuming the user data is returned here

          axios.defaults.headers.common["user_id"] = response.data.user.id;
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("auth_token");
          setIsAuthenticated(false);
          setUser(null);
        })
        .finally(() => {
          setLoading(false); // This ensures loading is set to false in all cases
        });
    } else {
      setLoading(false); // No token, set loading to false
    }
  }, []);

  // Function to handle login
  const login = async (login: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        login,
        password,
      });

      const { access_token, user } = response.data;
      const user_id = user.id;

      localStorage.setItem("auth_token", access_token);
      setIsAuthenticated(true);
      setUser(user);

      // Set 'user_id' as a default header for all subsequent requests
      axios.defaults.headers.common["user_id"] = user_id;
    } catch (error) {
      console.error("Login failed:", error);

      // Reset authentication status and user info on failure
      setIsAuthenticated(false);
      setUser(null);

      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
