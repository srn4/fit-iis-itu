import React, { useState } from "react";
import "./UserDetailForm.css"; // Make sure to create a corresponding CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserDetailFormProps {
  user: {
    id: number;
    name: string;
    surname: string;
    login: string;
    role: string;
    isVisible: boolean;
  };
  onUpdate: (user: UserDetailFormProps["user"]) => void; // Callback to trigger after successful update
  onLogout: () => void;
}

const UserDetailForm: React.FC<UserDetailFormProps> = ({
  user,
  onUpdate,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [login, setLogin] = useState(user.login);
  const [updateSuccess, setUpdateSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.id}`,
        {
          name: name,
          surname: surname,
          login: login,
        }
      );

      // Call onUpdate to update the parent state
      onUpdate(response.data.user);

      // You might want to do some action on success, like showing a message or redirecting
      setUpdateSuccess("Změna provedena!");
    } catch (error) {
      // Handle the error, maybe set an error state and show it in the UI
      console.error("There was an error updating the user:", error);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/users/${user.id}`
        );
        alert("User deleted successfully!");
        onLogout(); // Log out the user after account deletion
      } catch (error) {
        console.error("There was an error deleting the user:", error);
        alert("There was a problem deleting your account.");
      }
    }
  };

  const handleAdminRedirect = () => {
    navigate("/admin/users"); // Path to the page showing all users
  };

  return (
    <>
      <form className="user-detail-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Jméno</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="surname">Příjmení</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="login">Login </label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit" className="save-button">
            Uložit údaje
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Odhlásit
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="user-detail-form-delete-button"
          >
            Smazat
          </button>
          {user.role === "admin" && (
            <button
              type="button"
              onClick={handleAdminRedirect}
              className="admin-redirect-button"
            >
              View All Users
            </button>
          )}
        </div>
        {updateSuccess && <div className="login-success">{updateSuccess}</div>}
      </form>

      <div className="user-role-display">
        <label className="user-role-label">Role:</label>
        <span className="user-role-value">{user.role}</span>
      </div>
    </>
  );
};
export default UserDetailForm;
