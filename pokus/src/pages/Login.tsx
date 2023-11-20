import React from 'react';
import Login from '../components/Login';
import './Login.css';

function LoginPage() {
    return (
        <div className="login-page-container">
            <div>
                <h2 className="login-page-title">Přihlášení</h2>
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;
