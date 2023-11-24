import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Defining the shape of the context's value
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
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

  // Function to handle login
  const login = async (login: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        login,
        password,
      });
      const { access_token, user } = response.data;
      localStorage.setItem("auth_token", access_token);
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show a notification to the user)
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check authentication status when the app loads
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Here, you can also make a request to a backend endpoint to verify the token
      setIsAuthenticated(true);
      // Optionally fetch user details here if needed
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
