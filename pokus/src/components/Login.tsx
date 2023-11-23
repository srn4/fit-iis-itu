import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send 'login' instead of 'email'
      await axios.post('http://localhost:8000/api/login', { login, password }, { withCredentials: true });
      console.log('Logged in successfully');
      navigate('/groups'); // Redirect to the GroupsPage after successful login
    } catch (error) {
        console.log('login fail');
      console.error('Login error', error);
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
        placeholder="Heslo"
        className="login-input"
      />
      <button type="submit" className="login-button">Přihlásit</button>
    </form>
  );
}

export default Login;
