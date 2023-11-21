import React from 'react';
import Registration from '../components/Registre'; // Import your Registration component
import './Login.css';

function RegistrationPage() {
    return (
        <div className="login-page-container">
            <div>
                <h2 className="login-page-title">Registrace</h2>
                <Registration />
            </div>
        </div>
    );
}

export default RegistrationPage;
