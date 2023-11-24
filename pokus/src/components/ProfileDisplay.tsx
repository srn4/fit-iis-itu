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
  
  const fullName = user.name && user.surname ? `${user.name} ${user.surname}` : '';

  return (
    <div className="user-profile">
      <div className="user-name">
        <strong>Přihlášen jako:</strong> {user.login} {fullName && <span>{fullName}</span>}
      </div>
      <button
        className="user-settings-button"
        onClick={handleUserSettings}
        aria-label="Open user settings"
      >
        User Setup
      </button>
    </div>
  );
};

export default ProfileDisplay;
