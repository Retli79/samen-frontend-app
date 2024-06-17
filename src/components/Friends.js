import React, { useEffect, useState } from 'react';
import { fetchFriends } from '../api';

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const userId = 1; // Replace with the current user's ID
    fetchFriends(userId)
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the friends!", error);
      });
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      {friends.length > 0 ? (
        <ul>
          {friends.map(friend => (
            <li key={friend.id}>{friend.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friends available</p>
      )}
    </div>
  );
};

export default Friends;
