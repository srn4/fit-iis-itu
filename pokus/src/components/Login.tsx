import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authorization';
import './Login.css';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState('');

    // Use the AuthContext
    const { login: contextLogin } = useContext(AuthContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoginError('');
      try {
        // Use the login function from the context
        await contextLogin(login, password);
        setLoginSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/groups'), 3000);  // Redirect after 3 seconds
      } catch (error) {
        console.log('login fail');
        setLoginError('Failed to log in. Please check your credentials.');
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
      {loginError && <div className="login-error">{loginError}</div>}
      {loginSuccess && <div className="login-success">{loginSuccess}</div>}
    </form>
  );
}

export default Login;
