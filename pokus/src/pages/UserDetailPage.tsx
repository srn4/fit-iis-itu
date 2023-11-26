import React, { useContext } from "react";
import UserDetailForm from "../components/UserDetailForm"; // Path to your UserDetailForm component
import { AuthContext } from "../contexts/Authorization"; // Import the AuthContext
import "./UserDetailPage.css"; // Path to your UserDetailPage CSS file

// Replace 'any' with your actual user type
interface User {
  id: number;
  name: string;
  surname: string;
  login: string;
}

const UserDetailPage: React.FC = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="user-detail-page-container">
      <h1>Nastavení účtu</h1>
      <UserDetailForm
        user={user}
        onUpdate={handleUserUpdate}
        onLogout={logout}
      />
    </div>
  );
};

export default UserDetailPage;
