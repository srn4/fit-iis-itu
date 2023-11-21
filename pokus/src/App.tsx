import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Startpage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrePage';
import GroupsPage from './pages/GroupsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                {/* Other routes can go here */}
            </Routes>
        </Router>
    );
}

export default App;
