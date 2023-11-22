import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDisplay.css'

// Add a TypeScript interface if using TypeScript for user prop type
interface ProfileDisplayProps {
  user: {
    login: string;
    name?: string;
    surname?: string;
  };
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleUserSettings = () => {
    navigate('/user-settings'); // Replace with the actual path to user settings page
  };

  return (
    <div className="user-profile">
      <span className="user-name">
        <p>Přihlášen jako: {user.login} {user.name && user.surname ? `${user.name} ${user.surname}` : ''}</p>
      </span>
      <button className="user-settings-button" onClick={handleUserSettings}>
        User Setup
      </button>
    </div>
  );
};

export default ProfileDisplay;
