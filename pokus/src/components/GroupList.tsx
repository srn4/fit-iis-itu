import React from 'react';
import './GroupList.css'; // Ensure you have a CSS file for this component

const GroupList = () => {
  const groups = [
    { id: 1, name: 'Star wars' },
    { id: 2, name: 'Bali' },
    // ... other groups
  ];

  const handleRegister = (groupId: number) => {
    // Add logic to register user to the group
    console.log(`Registered to group with ID: ${groupId}`);
  };

  return (
    <div className="group-list">
      {groups.map(group => (
        <div key={group.id} className="group-item">
          <span className="group-name">{group.name}</span>
          <button onClick={() => handleRegister(group.id)} className="group-register-button">
            Registrovat
          </button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;


