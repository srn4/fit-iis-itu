import React from 'react';
import GroupList from '../components/GroupList';
import './GroupsPage.css'
import ProfileDisplay from '../components/ProfileDisplay';

const GroupsPage = () => {
  return (
    <div className="groups-page-container">
      {/* Top bar with navigation and search could go here */}
      <div className="main-content">
        <ProfileDisplay />
        <GroupList />
      </div>
      <div className="footer">
        <button className="create-group-button">Vytvořit skupinu</button>
      </div>
    </div>
  );
};

export default GroupsPage;


