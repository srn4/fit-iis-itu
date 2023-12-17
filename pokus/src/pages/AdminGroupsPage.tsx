import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/Authorization";
import "./AdminGroupsPage.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants";

interface Group {
  id: number;
  name: string;
  description: string;
  interest: string;
}

interface GroupContainer {
  group: Group;
}

interface Interest {
  id: number;
  name: string;
}

const AdminGroupsPage = () => {
  const [adminGroups, setAdminGroups] = useState<GroupContainer[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    // Fetch both admin groups and interests concurrently
    const fetchData = async () => {
      try {
        const [interestsResponse, adminGroupsResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/interests`),
          axios.get(`${apiUrl}/api/admin-groups`, { headers: { user_id: user.id } })
        ]);
        setInterests(interestsResponse.data);
        setAdminGroups(adminGroupsResponse.data.admin_groups);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const updateGroupInterest = async (groupId: number, interestId: number) => {
    try {
      await axios.put(`${apiUrl}/api/groups/${groupId}`, {
        interest_id: interestId
      });
      alert("Group interest updated successfully.");
      // Optionally, refetch groups or update the state to reflect the change
    } catch (error) {
      console.error("Error updating group interest:", error);
      alert("Failed to update group interest.");
    }
  };

  const deleteGroup = async (groupId: number) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`${apiUrl}/api/groups/${groupId}`);
        // Filter out the deleted group from the adminGroups state
        setAdminGroups(
          adminGroups.filter(
            (groupContainer) => groupContainer.group.id !== groupId
          )
        );
        alert("Group deleted successfully.");
      } catch (error) {
        console.error("Error deleting the group:", error);
        alert("Failed to delete the group.");
      }
    }
  };

  return (
    <div className="admin-groups-page">
      <h1 className="admin-groups-title">Moje vytvořené skupiny</h1>
      <ul className="admin-groups-list">
        {adminGroups.map((groupContainer) => (
          <li key={groupContainer.group.id} className="admin-group-item">
            <span className="group-name">{groupContainer.group.name}</span>
            <span className="group-description">
              {groupContainer.group.description}
            </span>
            <div className="group-actions">
            <select
                onChange={(e) => updateGroupInterest(groupContainer.group.id, Number(e.target.value))}
              >
                <option value="">Select an interest</option>
                {interests.map((interest) => (
                  <option key={interest.id} value={interest.id}>
                    {interest.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  navigate(`/membership-requests/${groupContainer.group.id}`)
                }
                className="view-requests-button"
              >
                View Requests
              </button>
              <button
                onClick={() => deleteGroup(groupContainer.group.id)}
                className="delete-group-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGroupsPage;
