import React, { useContext, useEffect, useState } from 'react';
import GroupList from '../components/GroupList';
import ProfileDisplay from '../components/ProfileDisplay'; // Import the ProfileDisplay component
import { AuthContext } from '../contexts/Authorization'; // Import the AuthContext
import './GroupsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//import { useHistory } from 'react-router-dom';

const GroupsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdminOfAnyGroup, setIsAdminOfAnyGroup] = useState(false);

  useEffect(() => {
    const checkIfAdminOfAnyGroup = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin-groups', {
          headers: { user_id: user.id }
        });
        if (response.data.admin_groups.length > 0) {
          setIsAdminOfAnyGroup(true);
        }
      } catch (error) {
        console.error('Error checking admin groups:', error);
      }
    };

    if (user) {
      checkIfAdminOfAnyGroup();
    }
  }, [user]);
  const handleCreateGroup = () => {
    navigate('/create-group'); 
  };

  const handleViewAdminGroups = () => {
    navigate('/my-groups'); // Navigate to AdminGroupsPage
  };

  return (
    <div className="groups-page-container">
      <div className="top-bar">
        {/* Assuming you have a NavBar component or similar */}
        {/* <NavBar /> */}
        <input type="text" className="search-bar" placeholder="Search..." />
        {user && <ProfileDisplay user={user} />}
      </div>
      <div className="footer">
        <button className="create-group-button" onClick={handleCreateGroup}>Vytvořit skupinu</button>
      
      {isAdminOfAnyGroup && (
          <button className="view-admin-groups-button" onClick={handleViewAdminGroups}>
            View My Admin Groups
          </button>
        )}
        </div>
      <div className="main-content">
        <GroupList />
      </div>
      
    </div>
  );
};

export default GroupsPage;
