import React, { useContext, useEffect, useState } from "react";
import GroupList from "../components/GroupList";
import ProfileDisplay from "../components/ProfileDisplay"; // Import the ProfileDisplay component
import { AuthContext } from "../contexts/Authorization"; // Import the AuthContext
import "./GroupsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//import { useHistory } from 'react-router-dom';

const GroupsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdminOfAnyGroup, setIsAdminOfAnyGroup] = useState(false);
  const [isMemberOfAnyGroup, setIsMemberOfAnyGroup] = useState(false);

  useEffect(() => {
    const fetchGroupRoles = async () => {
      try {
        const adminResponse = await axios.get(
          "http://localhost:8000/api/admin-groups",
          { headers: { user_id: user.id } }
        );
        setIsAdminOfAnyGroup(adminResponse.data.admin_groups.length > 0);

        const memberResponse = await axios.get(
          "http://localhost:8000/api/user-groups",
          { headers: { user_id: user.id } }
        );
        setIsMemberOfAnyGroup(memberResponse.data.member_groups.length > 0);
      } catch (error) {
        console.error("Error fetching group roles:", error);
      }
    };

    if (user) {
      fetchGroupRoles();
    }
  }, [user]);

  const handleCreateGroup = () => navigate('/create-group');
  const handleViewAdminGroups = () => navigate('/my-admin-groups');
  const handleViewMemberGroups = () => navigate('/my-member-groups');


  return (
    <div className="groups-page-container">
      <div className="top-bar">
        <input type="text" className="search-bar" placeholder="Search..." />
        {user && <ProfileDisplay user={user} />}
      </div>
      <div className="content-container">
        <div className="main-content">
          <button className="create-group-button" onClick={handleCreateGroup}>Vytvořit skupinu</button>
          <GroupList />
        </div>
        <div className="side-actions">
          {isAdminOfAnyGroup && (
            <button className="view-admin-groups-button" onClick={handleViewAdminGroups}>
              Spravovat moje skupiny
            </button>
          )}
          {isMemberOfAnyGroup && (
            <button className="view-member-groups-button" onClick={handleViewMemberGroups}>
              Zobrazit skupiny
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default GroupsPage;
