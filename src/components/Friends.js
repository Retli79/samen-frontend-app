import React, { useEffect, useState } from "react";
import { fetchFriends } from "../api";
import { getUserId } from "../auth";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = getUserId(); // Get the current user's ID
    if (userId) {
      fetchFriends(userId)
        .then((response) => {
          setFriends(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the friends!", error);
          setError("There was an error fetching the friends.");
        });
    } else {
      setError("User ID not found.");
    }
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      {error && <p>{error}</p>}
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.friend_id}>{friend.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friends available</p>
      )}
    </div>
  );
};

export default Friends;
