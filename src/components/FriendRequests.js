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
        console.error(
          "There was an error fetching the friend requests!",
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>Friend Requests</h1>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id}>
              {request.sender.username} - {request.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests available</p>
      )}
    </div>
  );
};

export default FriendRequests;
