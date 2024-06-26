import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { fetchGroups } from '../api';
import GroupRequests from './GroupRequests';
import GroupMemberships from './GroupMemberships';

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
    <div className="groups-container">
      <div className="groups-sidebar">
        <h2>Groups</h2>
        <ul>
          <li><Link to="group_memberships">Group Memberships</Link></li>
          <li><Link to="group_requests">Group Requests</Link></li>
        </ul>
      </div>
      <div className="groups-content">
        <Routes>
          <Route path="group_memberships" element={<GroupMemberships />} />
          <Route path="group_requests" element={<GroupRequests />} />
        </Routes>
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
    </div>
  );
};

export default Groups;
