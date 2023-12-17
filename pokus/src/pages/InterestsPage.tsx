import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../constants'; // Adjust the import path as needed
import "./InterestsPage.css";

type Interest = {
  id: number;
  name: string;
  // Add other relevant fields here
};

const InterestsPage = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/interests`);
        setInterests(response.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterests();
  }, []);

  if (isLoading) {
    return <div>Loading interests...</div>;
  }

  return (
    <div className="interests-page-container">
      <h1 className="interests-title">Vyber zájmy</h1>
      <ul className="interests-list">
        {interests.map(interest => (
          <li key={interest.id} className="interest-item">
            {interest.name}
          </li>
        ))}
      </ul>
      <button className="save-interests-button">Uložit</button>
    </div>
  );
};

export default InterestsPage;
