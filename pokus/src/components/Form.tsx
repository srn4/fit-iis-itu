import React, { useState } from 'react';
import "./Form.css";
import axios from 'axios';
import { apiUrl } from '../constants';

const Form: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupDesc(e.target.value);
  };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("posilam req");
        axios.post(`${apiUrl}/api/groups`, {
          name: groupName,
          description: groupDesc,
        })
        .then((response) => {
          console.log('Group created successfully');
        })
        .catch((error) => {
          console.error('Error creating group:', error);
        });
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={groupName}
            onChange={handleNameChange}
            placeholder="*Group's name"
          />
          <input
          type="text"
          value={groupDesc}
          onChange={handleDescChange}
          placeholder="*Group's description"
          />
          <button type="submit">Přidat Skupinu</button>
        </div>
      </form>
    </div>
  );
};

export default Form;

