import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GroupList.css";

type GroupType = {
  id: number;
  name: string;
  // Add other properties as needed
};

const GroupList: React.FC = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/groups') // Replace with your Laravel API endpoint
      .then((response) => {
        setGroups(response.data);
        setLoading(false); // Set loading to false after successful data fetch
      })
      .catch((err) => {
        setError('Error loading data. Please try again later.');
        setLoading(false); // Set loading to false after an error
      });
  }, []); // Empty dependency array to trigger the effect once

  return (
    
      <div className="group-list">
        {loading && <p>Loading...</p>}
        {error && (
          <div className="error-frame">
            <p className="error-message">{error}</p>
          </div>
        )}
        {groups.map((group) => (
          <div key={group.id} className="group-item">
            <h3>{group.name}</h3>
            {/* Display other group properties as needed */}
          </div>
        ))}
      </div>
    
  );
};

export default GroupList;


