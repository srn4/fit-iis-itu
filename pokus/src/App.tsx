import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Startpage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrePage';
import GroupsPage from './pages/GroupsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route element={<ProtectedRoute />}>
                    
                <Route path="/groups" element={<GroupsPage />} />
                {/* Other protected routes can go here */}
                {/* Other routes can go here */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
