import React, { useEffect, useState } from 'react';
import './GroupList.css'; // Ensure you have a CSS file for this component
import { apiUrl } from '../constants';
import axios from 'axios';

type Group = {
  id: number;
  name: string;
  description: string;
  interest_id: number;
};

const GroupList: React.FC = /* async */ () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    console.log('${apiUrl}/api/groups');
    const fetchGroups = async () => {
      try {
        const groups = await axios.get(`${apiUrl}/api/groups`);
        setGroups(groups.data);
    }catch (error){
      console.error('error getting groups:', error);
    }
    };
    fetchGroups();
  }, []);

  return (
    <div className="group-list">
      {groups.map(group => (
        <div key={group.id} className="group-item">
          <span className="group-name">{group.name}</span>
          <span className="group-desc">{group.description}</span>
          <button className="register-button">Register</button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;


