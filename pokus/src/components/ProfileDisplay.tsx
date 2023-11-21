import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'ProfileDisplay.css'

const ProfileDisplay = () => {
  const navigate = useNavigate();
  const userName = "Jméno"; // Replace with actual user name
  const userSurname = "Příjmení"; // Replace with actual user surname

  const handleUserSettings = () => {
    navigate('/user-settings'); // Replace with actual path to user settings page
  };

  return (
    <div className="user-profile">
      <span className="user-name">{`${userName} ${userSurname}`}</span>
      <button className="user-settings-button" onClick={handleUserSettings}>
        User Setup
      </button>
    </div>
  );
};

export default ProfileDisplay;
