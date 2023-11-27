import React, { useEffect, useState } from 'react';
import './GroupList.css';
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

  const handleRegister = async (groupId: number) => {
    console.log('sending reg req');
    //console.log('Axios configuration:', axios.defaults.headers.common);
    try{
      const response = await axios.post(`${apiUrl}/api/group-register/${groupId}`);
      console.log('Registration succesful', response.data);
    } catch (error){
      console.error('Error registering', error);
    }
  };

  return (
    <div className="group-list">
      {groups.map(group => (
        <div key={group.id} className="group-item">
          <span className="group-name">{group.name}</span>
          <span className="group-desc">{group.description}</span>
          <button className="register-button" onClick={() => handleRegister(group.id)} >Registrovat</button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;


