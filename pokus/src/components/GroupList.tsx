import React, { useEffect, useState } from "react";
import "./GroupList.css";
import { apiUrl } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

interface GroupListProps {
  groups: Group[];
  adminGroups: AdminGroup;
  memberGroups: MemberGroup;
}
type Group = {
  id: number;
  name: string;
  description: string;
  interest_id: number;
};

const GroupList: React.FC<GroupListProps> = ({
  groups,
  adminGroups,
  memberGroups,
}) => {
  const isUserRelatedToGroup = (groupId: number) => {
    const adminGroupIds = adminGroups.admin_groups.map((ag) => ag.group.id);
    const memberGroupIds = memberGroups.member_groups.map((mg) => mg.group.id);

    return adminGroupIds.includes(groupId) || memberGroupIds.includes(groupId);
  };

  const navigate = useNavigate();

  const handleRegister = async (groupId: number) => {
    console.log("sending reg req");
    try {
      const response = await axios.post(
        `${apiUrl}/api/group-register/${groupId}`
      );
      console.log("Registration succesful", response.data);
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  const handleButtonClick = (groupId: number) => {
    if (isUserRelatedToGroup(groupId)) {
      // If the user is related to the group, navigate to the group's posts
      navigate(`/groups/${groupId}/posts`);
    } else {
      // If the user is not related to the group, attempt to register
      handleRegister(groupId);
    }
  };

  return (
    <div className="group-list">
      {groups.map((group) => (
        <div key={group.id} className="group-item">
          <span className="group-name">{group.name}</span>
          <span className="group-desc">{group.description}</span>

          <button
            className="register-button"
            onClick={() => handleButtonClick(group.id)}
          >
            {isUserRelatedToGroup(group.id) ? "Zobrazit" : "Registrovat"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
export type { Group };
