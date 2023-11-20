import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { login, password });
            localStorage.setItem('token', response.data.access_token);
            console.log("Logged in successfully");
        } catch (error) {
            console.error("Login error", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="login" className="login-label">Přihlašovací jméno</label>
            <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
                className="login-input"
            />
            <label htmlFor="password" className="login-label">Heslo</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
            />
            <button type="submit" className="login-button">Přihlásit</button>
        </form>
    );
}

export default Login;


