import React from 'react';
import './GroupList.css'; // Ensure you have a CSS file for this component

const GroupList = () => {
  const groups = [
    { id: 1, name: 'Star wars' },
    { id: 2, name: 'Bali' },
    // ... other groups
  ];

  return (
    <div className="group-list">
      {groups.map(group => (
        <div key={group.id} className="group-item">
          <span className="group-name">{group.name}</span>
        </div>
      ))}
    </div>
  );
};

export default GroupList;


