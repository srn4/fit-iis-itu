import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/Authorization";
import "./MemberGroupsPage.css";

// Define an interface for the group object
interface Group {
  id: number;
  name: string;
  description: string;
  // Include any other properties that your group objects might have
}

interface GroupContainer {
  group: Group;
}

const MemberGroupsPage = () => {
  const { user } = useContext(AuthContext);
  // Use the Group interface for the memberGroups state
  const [memberGroups, setMemberGroups] = useState<GroupContainer[]>([]);

  useEffect(() => {
    const fetchMemberGroups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-groups",
          {
            headers: { user_id: user.id },
          }
        );
        // Make sure the response matches the Group interface
        setMemberGroups(response.data.member_groups);
      } catch (error) {
        console.error("Error fetching member groups:", error);
      }
    };

    if (user) {
      fetchMemberGroups();
    }
  }, [user]);

  return (
    <div className="member-groups-page">
      <h1>My Member Groups</h1>
      <ul className="member-groups-list">
        {memberGroups.map((groupContainer) => (
          <li key={groupContainer.group.id} className="member-group-item">
            <span className="group-name">{groupContainer.group.name}</span>
            <span className="group-description">
              {groupContainer.group.description}
            </span>
            {/* Add any other group information you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberGroupsPage;
