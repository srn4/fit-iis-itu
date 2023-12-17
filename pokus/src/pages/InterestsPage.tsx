import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import "./InterestsPage.css";
import { AuthContext } from "../contexts/Authorization"; // Import the AuthContext

type Interest = {
  id: number;
  name: string;
};

type UserInterest = {
  interest_id: number;
  interest_name: string;
};

const InterestsPage = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [userInterests, setUserInterests] = useState<UserInterest[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Fetch all interests
    const fetchInterests = async () => {
      try {
        const [allInterestsResponse, userInterestsResponse] = await Promise.all(
          [
            axios.get<Interest[]>(`${apiUrl}/api/interests`), // Use the generic type parameter for axios response
            axios.get<{ user_interests: UserInterest[] }>(
              `${apiUrl}/api/user-interests`,
              {
                params: { user_id: user.id },
              }
            ), // Use the generic type parameter for axios response
          ]
        );

        setInterests(allInterestsResponse.data);
        setUserInterests(userInterestsResponse.data.user_interests);
        // Set the selected interests to those the user already has
        setSelectedInterests(
          userInterestsResponse.data.user_interests.map(
            (ui: UserInterest) => ui.interest_id
          )
        );
      } catch (error) {
        console.error("Error fetching interests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.id) {
      fetchInterests();
    }
  }, [user.id]);

  const toggleInterestSelection = (interestId: number) => {
    setSelectedInterests((prevSelectedInterests) =>
      prevSelectedInterests.includes(interestId)
        ? prevSelectedInterests.filter((id) => id !== interestId)
        : [...prevSelectedInterests, interestId]
    );
  };

  const handleSaveInterests = async () => {
    const currentUserId = user.id;

    for (const interestId of selectedInterests) {
      try {
        await axios.post(`${apiUrl}/api/add-interest`, {
          user_id: currentUserId,
          interest_id: interestId,
        });
        // Set success message and show checkmark
        setSaveSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
          setSaveSuccess(false); // Reset the success state
          // Redirect to user-settings page
          window.location.href = "/user-settings";
        }, 2000);
      } catch (error) {
        console.error("Error saving interest:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading interests...</div>;
  }

  return (
    <div className="interests-page-container">
      <h1 className="interests-title">Vyber zájmy</h1>
      <ul className="interests-list">
        {interests.map((interest) => (
          <li
            key={interest.id}
            className={`interest-item ${
              selectedInterests.includes(interest.id) ? "selected" : ""
            }`}
            onClick={() => toggleInterestSelection(interest.id)}
          >
            {interest.name}
          </li>
        ))}
      </ul>
      <button className="save-interests-button" onClick={handleSaveInterests}>
        Uložit
      </button>
      {saveSuccess && (
        <div className="save-success-message">
          <span className="checkmark">✔️</span> Interests saved successfully!
        </div>
      )}
    </div>
  );
};

export default InterestsPage;
