import React, { useContext, useEffect, useState } from "react";
import GroupList, { Group } from "../components/GroupList";
import ProfileDisplay from "../components/ProfileDisplay"; // Import the ProfileDisplay component
import { AuthContext } from "../contexts/Authorization"; // Import the AuthContext
import "./GroupsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../constants";

type AdminGroup = {
  admin_groups: Array<{
    user_id: number;
    group_id: number;
    role: string;
    group: Group;
  }>;
};

type MemberGroup = {
  member_groups: Array<{
    user_id: number;
    group_id: number;
    group: Group;
  }>;
};



const GroupsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdminOfAnyGroup, setIsAdminOfAnyGroup] = useState(false);
  const [isMemberOfAnyGroup, setIsMemberOfAnyGroup] = useState(false);
  const [userAdminGroups, setUserAdminGroups] = useState<AdminGroup>({
    admin_groups: [],
  });
  const [userMemberGroups, setUserMemberGroups] = useState<MemberGroup>({
    member_groups: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<Group[]>([]); 
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/groups`);
        setGroups(response.data); 
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleCreateNewGroup = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/groups`, groupData, {
        headers: { "Content-Type": "application/json" },
      });
      setGroups([...groups, response.data.group as Group]); // Cast the new group to the Group type
      setGroupData({ name: "", description: "" }); // Reset the form
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAdminGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin-groups`, {
          headers: { user_id: user.id },
        });
        setUserAdminGroups(response.data); // Assuming the response is an array of groups
      } catch (error) {
        console.error("Error fetching admin groups:", error);
      }
    };

    const fetchMemberGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user-groups`, {
          headers: { user_id: user.id },
        });
        setUserMemberGroups(response.data); // Assuming the response is an array of groups
      } catch (error) {
        console.error("Error fetching member groups:", error);
      }
    };

    if (user) {
      fetchAdminGroups();
      fetchMemberGroups();
    }
  }, [user]);

  useEffect(() => {
    const fetchGroupRoles = async () => {
      try {
        const adminResponse = await axios.get(`${apiUrl}/api/admin-groups`, {
          headers: { user_id: user.id },
        });
        setIsAdminOfAnyGroup(adminResponse.data.admin_groups.length > 0);

        const memberResponse = await axios.get(`${apiUrl}/api/user-groups`, {
          headers: { user_id: user.id },
        });
        setIsMemberOfAnyGroup(memberResponse.data.member_groups.length > 0);
      } catch (error) {
        console.error("Error fetching group roles:", error);
      }
    };

    if (user) {
      fetchGroupRoles();
    }
  }, [user]);

  const handleViewAdminGroups = () => navigate("/my-admin-groups");
  const handleViewMemberGroups = () => navigate("/my-member-groups");

  if (isLoading) {
    // Render loading spinner and message
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Načítání potřebných dat...</p>
      </div>
    );
  }

  return (
    <div className="groups-page-container">
      <div className="top-bar">
        {user && <ProfileDisplay user={user} />}
      </div>
      <div className="content-container">
        <div className="form-logo">
        <form className="create-group-form" onSubmit={handleCreateNewGroup}>
          <input
            type="text"
            name="name"
            placeholder="Jméno skupiny"
            value={groupData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Popis skupiny"
            value={groupData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Vytvořit skupinu</button>
        </form>
        <img src="/Y_logo.png" alt="Logo" className="group-page-logo" />
        </div>
        <div className="main-content">
          <GroupList
            groups={groups}
            adminGroups={userAdminGroups}
            memberGroups={userMemberGroups}
          />
        </div>

        <div className="side-actions">
          {isAdminOfAnyGroup && (
            <button
              className="view-admin-groups-button"
              onClick={handleViewAdminGroups}
            >
              <p>Spravovat založené</p>
              skupiny
            </button>
          )}
          {isMemberOfAnyGroup && (
            <button
              className="view-member-groups-button"
              onClick={handleViewMemberGroups}
            >
              Zobrazit skupiny
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
