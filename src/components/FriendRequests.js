// FriendRequests.js

import React, { useEffect, useState } from "react";
import { fetchFriendRequests } from "../api";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests()
      .then((response) => {
        setFriendRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending friend requests:", error);
      });
  }, []);

  return (
    <div>
      <h1>Pending Friend Requests</h1>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id}>
              {request.sender_username} - {request.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending friend requests available</p>
      )}
    </div>
  );
};

export default FriendRequests;
