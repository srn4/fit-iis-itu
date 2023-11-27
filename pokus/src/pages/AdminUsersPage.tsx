import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsersPage.css";
import { apiUrl } from "../constants";

interface User {
  id: number;
  name: string;
  role: string;
  login: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Correctly type the users state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${apiUrl}/api/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId)); // Remove the user from the state
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="admin-users-container">
      <h1>Všichni uživatelé</h1>
      <ul className="admin-users-list">
        {users.map((user) => (
          <li key={user.id} className="admin-user-item">
            <span className="admin-user-info">
              {user.login} - {user.name} - {user.role}
            </span>
            <button
              type="button"
              onClick={() => deleteUser(user.id)}
              className="admin-page-delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
