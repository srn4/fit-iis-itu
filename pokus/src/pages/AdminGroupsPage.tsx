import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/Authorization";
import "./AdminGroupsPage.css";
import { useNavigate } from "react-router-dom";

interface Group {
  id: number;
  name: string;
  description: string;
}

interface GroupContainer {
  group: Group;
}

const AdminGroupsPage = () => {
  const [adminGroups, setAdminGroups] = useState<GroupContainer[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchAdminGroups = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/admin-groups",
            {
              headers: { user_id: user.id },
            }
          );
          setAdminGroups(response.data.admin_groups);
        } catch (error) {
          console.error("Error fetching admin groups:", error);
          // Add state to show error message to the user
        }
      };

      fetchAdminGroups();
    }
  }, [user]); // Dependency array to ensure effect runs when user changes

  const deleteGroup = async (groupId: number) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`http://localhost:8000/api/groups/${groupId}`);
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
