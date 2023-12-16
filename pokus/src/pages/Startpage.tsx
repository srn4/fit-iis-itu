import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Startpage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <div className="home-logo"><img src="/Y_logo.png" alt="Logo" /></div>
            <div className="home-content">
                <h1 className="home-title">Neboj se, sdílej.<br/>Přidej se..</h1>
                <Link to="/login">
                    <button className="home-button">Přihlásit</button>
                </Link> 
                <Link to="/register">
                    <button className="home-button">Registrovat</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;


