import React, { useEffect, useState } from 'react';
import { fetchGroupMemberships } from '../api';

const GroupMemberships = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetchGroupMemberships()
      .then(response => {
        setMemberships(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the group memberships!", error);
      });
  }, []);

  return (
    <div>
      <h1>Group Memberships</h1>
      {memberships.length > 0 ? (
        <ul>
          {memberships.map(membership => (
            <li key={membership.id}>{membership.group.name} - {membership.role}</li>
          ))}
        </ul>
      ) : (
        <p>No group memberships available</p>
      )}
    </div>
  );
};

export default GroupMemberships;
