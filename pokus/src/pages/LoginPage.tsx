import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/register"); // Redirects to the reg page
  };
  return (
    <div className="login-page-container">
      <div className="login-header">
        <button onClick={handleLoginRedirect} className="login-redirect-button">
          Zaregistrovat
        </button>
      </div>
      <div className="registration-wrapper">
        <h2 className="login-page-title">Přihlášení</h2>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
