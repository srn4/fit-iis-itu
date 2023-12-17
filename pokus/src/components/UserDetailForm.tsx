import React, { useState, useEffect} from "react";
import "./UserDetailForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants";

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
  const [newInterest, setNewInterest] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const triggerSuccessMessage = (message: string) => {
    setUpdateSuccess(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${apiUrl}/api/users/${user.id}`, {
        name: name,
        surname: surname,
        login: login,
      });

      // Call onUpdate to update the parent state
      onUpdate(response.data.user);

      triggerSuccessMessage("Změna provedena!");
    } catch (error) {
      // Handle the error, maybe set an error state and show it in the UI
      console.error("There was an error updating the user:", error);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        setUpdateSuccess(""); // Clear the success message
      }, 2000);

      // Clean up the timer when the component unmounts or if the message changes
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

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
        const response = await axios.delete(`${apiUrl}/api/users/${user.id}`);
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

  const handleCreateInterest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // This should prevent the page from reloading

    try {
      await axios.post(`${apiUrl}/api/interests`, { name: newInterest });
      alert("Interest created successfully!");
      setNewInterest(""); // Reset the form field
    } catch (error) {
      console.error("Error creating interest:", error);
      alert("There was a problem creating the interest.");
    }
  };

  return (
    <>
      <form className="user-detail-form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
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
        <button type="submit" className="save-button">
            Uložit údaje
          </button>
          <div className={`user-update-success ${showSuccess ? 'user-update-success-visible' : ''}`}>
          {updateSuccess}
        </div>
          
        </div>
        
        <div className="button-container">
        <button
            type="button"
            onClick={() => navigate("/interests")}
            className="interests-redirect-button"
          >
            Vybrat zájmy
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Odhlásit se
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="user-detail-form-delete-button"
          >
            Smazat účet
          </button>
          {user.role === "admin" && (
            <button
              type="button"
              onClick={handleAdminRedirect}
              className="admin-redirect-button"
            >
              Zobrazit všechny uživatele
            </button>
          )}
          
          
        </div>
        
      </form>
      {user.role === "admin" && (
            <form className="new-interest-form" onSubmit={handleCreateInterest}>
              <div className="form-row">
                <label htmlFor="newInterest">Nový zájem</label>
                <input
                  id="newInterest"
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
              </div>
              <button type="submit" className="create-interest-button">
                Přidat zájem
              </button>
            </form>
          )}

      <div className="user-role-display">
        <label className="user-role-label">Role:</label>
        <span className="user-role-value">{user.role}</span>
      </div>
    </>
  );
};
export default UserDetailForm;
