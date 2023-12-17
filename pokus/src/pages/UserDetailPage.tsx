import React, { useContext, useState, useEffect } from "react";
import UserDetailForm from "../components/UserDetailForm";
import { AuthContext } from "../contexts/Authorization"; // Import the AuthContext
import "./UserDetailPage.css";
import { apiUrl } from "../constants";
import axios from "axios";

interface User {
  id: number;
  name: string;
  surname: string;
  login: string;
}

interface Interest {
  interest_id: number;
  interest_name: string;
}

const UserDetailPage: React.FC = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [userInterests, setUserInterests] = useState<Interest[]>([]);
  const userId = user.id;

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/user-interests?user_id=${userId}`
        );
        setUserInterests(response.data.user_interests); // Update this line
      } catch (error) {
        console.error("Error fetching user interests:", error);
      }
    };

    if (userId) {
      fetchUserInterests();
    }
  }, [userId]);

  return (
    <div className="user-detail-page-container">
      <h1>Nastavení účtu</h1>
      <UserDetailForm
        user={user}
        onUpdate={handleUserUpdate}
        onLogout={logout}
      />
      <div className="user-interests-container">
        <h2>Moje zájmy:</h2>
        <ul className="interests-list">
          {userInterests.map((interest) => (
            <li key={interest.interest_id} className="interest-item">
              {interest.interest_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailPage;
