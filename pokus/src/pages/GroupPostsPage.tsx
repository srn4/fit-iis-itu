import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../constants';

// Define the expected properties of the group object
interface Group {
  id: number;
  name: string;
  description: string;
  // Add other properties as needed
}

interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
  subject: string;
  reacts_to: number | null;
  group_id: number;
  user_id: number;
  is_verified: boolean;
}


const GroupPostsPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch group details
        const groupResponse = await axios.get(`http://localhost:8000/api/groups/${groupId}`);
        setGroup(groupResponse.data.group);

        // Fetch posts for the group
        const postsResponse = await axios.get(`http://localhost:8000/api/posts-in-group/${groupId}`);
        setPosts(postsResponse.data.posts);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  if (!group) {
    return <div>Loading group details...</div>;
  }

  return (
    <div>
      <h1>Posts in group: {group.name}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.subject}</span>
            <p>{post.content}</p>
            {/* Add any other post information you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupPostsPage;
