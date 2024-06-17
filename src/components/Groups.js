import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../api';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups()
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the groups!", error);
      });
  }, []);

  return (
    <div>
      <h1>Groups</h1>
      {groups.length > 0 ? (
        <ul>
          {groups.map(group => (
            <li key={group.id}>{group.name} - {group.description}</li>
          ))}
        </ul>
      ) : (
        <p>No groups available</p>
      )}
    </div>
  );
};

export default Groups;
