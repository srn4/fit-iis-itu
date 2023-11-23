import React, { useContext } from 'react';
import GroupList from '../components/GroupList';
import './GroupsPage.css';
import ProfileDisplay from '../components/ProfileDisplay';
import { AuthContext, AuthContextType } from '../contexts/Authorization';

const GroupsPage = () => {
  const authContext = useContext(AuthContext); // Using the context to access user data
  const user = authContext as AuthContextType; // Type assertion

  return (
    <div className="groups-page-container">
      <div className="main-content">
        {user && user.user && <ProfileDisplay user={user.user} />} {/* Render only if user is not null */}
        <GroupList />
      </div>
      <div className="footer">
        <button className="create-group-button">Vytvořit skupinu</button>
      </div>
    </div>
  );
};

export default GroupsPage;
