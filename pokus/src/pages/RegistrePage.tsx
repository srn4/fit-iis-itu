import React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "../components/Registre";
import "./Login.css";

function RegistrationPage() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <div className="login-page-container">
      <div className="login-header">
        <button onClick={handleLoginRedirect} className="login-redirect-button">
          Přihlásit se
        </button>
      </div>
      <div className="registration-wrapper">
        <h2 className="login-page-title">Registrace</h2>
        <Registration />
      </div>
    </div>
  );
}

export default RegistrationPage;
