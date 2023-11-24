import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Startpage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrePage';
import GroupsPage from './pages/GroupsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/Authorization';

const apiUrl = 'http://localhost:8000';

function App() {

    return (
        
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        
    );
}

export default App;
