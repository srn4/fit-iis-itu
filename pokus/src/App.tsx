import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Startpage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrePage';
import GroupsPage from './pages/GroupsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/Authorization';

function App() {
    useEffect(() => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            console.log('CSRF token setup completed');
        }).catch(error => {
            console.error('Error setting up CSRF token', error);
        });
    }, []);

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
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
