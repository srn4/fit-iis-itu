import React, { useContext } from 'react';
import GroupList from '../components/GroupList';
import './GroupsPage.css';

const GroupsPage = () => {

  return (
    <div className="groups-page-container">
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
