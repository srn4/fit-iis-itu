import React, { useContext } from 'react';
import GroupList from '../components/GroupList';
import ProfileDisplay from '../components/ProfileDisplay'; // Import the ProfileDisplay component
import { AuthContext } from '../contexts/Authorization'; // Import the AuthContext
import './GroupsPage.css';

const GroupsPage = () => {
  const { user } = useContext(AuthContext); // Use the AuthContext to get the current user

  return (
    <div className="groups-page-container">
      <div className="top-bar">
        {/* Assuming you have a NavBar component or similar */}
        {/* <NavBar /> */}
        <input type="text" className="search-bar" placeholder="Search..." />
        {user && <ProfileDisplay user={user} />}
      </div>
      <div className="main-content">
        <GroupList />
      </div>
      <div className="footer">
        <button className="create-group-button">Vytvořit skupinu</button>
      </div>
    </div>
  );
};

export default GroupsPage;
