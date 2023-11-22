import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './Registre.css';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', { login, password });
      console.log(response.data);
      console.log("register done");
      navigate('/login');
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
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
  );
}

export default Registration;
