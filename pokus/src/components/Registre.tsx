import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './Registre.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';

function Registration() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registrationStatus, setRegistrationStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistrationStatus('');
    setErrorMessage('');
    try {
      const response = await axios.post(`${apiUrl}/api/register`, { login, password });
      console.log(response.data);
      setRegistrationStatus("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 3000);  // Redirect after 3 seconds
    } catch (error: any) {
      console.error("There was an error!", error);
      // Check if the error response is due to duplicate login
      if (error.response && error.response.data && error.response.data.login) {
        setErrorMessage(error.response.data.login[0]);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className='registration-container'>
    <form onSubmit={handleSubmit} className="registration-form">
      <label htmlFor="login" className="registration-label">Přihlašovací jméno</label>
      <input
        id="login"
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
        className="registration-input"
      />
      <label htmlFor="password" className="registration-label">Heslo</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Heslo"
        className="registration-input"
      />
      <button type="submit" className="registration-button">Registrovat</button>
    </form>
    {errorMessage && <div className="registration-error">{errorMessage}</div>}
    {registrationStatus && <div className="registration-status">{registrationStatus}</div>}
    </div>
  );
}

export default Registration;
