import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Startpage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <div className="home-logo">Y</div> {/* Replace with your logo */}
            <h1 className="home-title">Neboj se, sdílej.<br/>Přidej se</h1>
            <div className="home-buttons">
                <Link to="/login">
                    <button className="home-button">Přihlásit</button>
                </Link>
                <Link to="/register">
                    <button className="home-button">Registrovat</button>
                </Link>
                <Link to="/continue-without-signin">
                    <button className="home-button secondary">Pokračovat bez přihlášení</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;


