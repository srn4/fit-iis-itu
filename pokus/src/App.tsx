import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/Authorization";
import HomePage from "./pages/Startpage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrePage";
import GroupsPage from "./pages/GroupsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const apiUrl = 'http://localhost:8000';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          {/* Fallback route for unknown paths */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
