// MembershipRequestsPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Authorization";
import "./MembershipRequestsPage.css"
import { apiUrl } from "../constants";

interface User {
  id: number;
  login: string;
}

interface Group {
  name: string;
  id: number;
}

interface Request {
  user: User;
  group: Group;
}

type RouteParams = {
  groupId: string;
};

const MembershipRequestsPage: React.FC = () => {
  const { groupId } = useParams<RouteParams>();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (user && groupId) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/membership-requests/${groupId}`,
            {
              headers: { user_id: user.id },
            }
          );
          const filteredRequests = response.data.membership_requests.filter(
            (req: Request) => req.group.id.toString() === groupId // Filtering based on groupId
          );
          setRequests(filteredRequests);
        } catch (error) {
          console.error("Error fetching membership requests:", error);
        }
      }
    };

    if (user && groupId) {
      // Make sure user and groupId are defined before making the call
      fetchRequests();
    }
  }, [user, groupId]);

  const acceptRequest = async (userId: number) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/set-member/${groupId}/${userId}`,
        {},
        {
          headers: { user_id: user?.id },
        }
      );
      alert(response.data.message);
      setRequests(requests.filter((request) => request.user.id !== userId));
    } catch (error) {
      console.error("Error accepting membership request:", error);
    }
  };

  const declineRequest = async (userId: number) => {
    if (
      window.confirm(
        "Are you sure you want to decline this membership request?"
      )
    ) {
      try {
        const response = await axios.delete(
          `${apiUrl}/api/decline-membership/${groupId}/${userId}`,
          {
            headers: { user_id: user?.id },
          }
        );
        alert(response.data.message);
        setRequests(requests.filter((request) => request.user.id !== userId));
      } catch (error) {
        console.error("Error declining membership request:", error);
      }
    }
  };

  return (
    <div className="membership-requests-page">
      <h1 className="membership-requests-title">Potvrdit členství pro skupinu {groupId}</h1>
      <ul className="membership-requests-list">
        {requests.map((request) => (
          <li key={request.user.id} className="request-item">
            <span className="request-info">
              {request.user.login} - {request.group.name}
            </span>
            <div className="request-action-buttons">
              <button onClick={() => acceptRequest(request.user.id)} className="accept-button">
                Potvrdit
              </button>
              <button onClick={() => declineRequest(request.user.id)} className="decline-button">
                Zamítnout
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipRequestsPage;
