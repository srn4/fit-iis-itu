import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the expected properties of the group object
interface Group {
  id: number;
  name: string;
  description: string;
  // Add other properties as needed
}

const GroupPostsPage = () => {
  const { groupId } = useParams<{ groupId: string }>(); // Specify the type of useParams
  const [group, setGroup] = useState<Group | null>(null); // Use the Group interface for the state

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/groups/${groupId}`);
        setGroup(response.data.group); // Set the group data to state
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  // Check if the group is null and display a loading message accordingly
  if (!group) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Posts in group: {group.name}</h1>
      {/* Eventually, here you will map over the posts and display them */}
    </div>
  );
};

export default GroupPostsPage;
