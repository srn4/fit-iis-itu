import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Startpage';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registre';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                {/* Other routes can go here */}
            </Routes>
        </Router>
    );
}

export default App;
