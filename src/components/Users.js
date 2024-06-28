import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import { isAuthenticated } from '../auth';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }})

  useEffect(() => {
    fetchUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, [navigate]);

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Users;
