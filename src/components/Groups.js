import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchGroups } from "../api";
import GroupRequests from "./GroupRequests";
import GroupMemberships from "./GroupMemberships";
import "./Groups.css"; // Import the CSS file

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the groups!", error);
      });
  }, []);

  return (
    <div className="groups-page">
      <div className="groups-sidebar">
        <h2>Groups</h2>
        <p>
          Welcome to the Groups home page. Here you can find information about
          various groups.
        </p>
        <ul>
          <li>
            <Link to="group_memberships">Group Memberships</Link>
          </li>
          <li>
            <Link to="group_requests">Group Requests</Link>
          </li>
        </ul>
      </div>
      <div className="groups-content">
        <Routes>
          <Route path="group_memberships" element={<GroupMemberships />} />
          <Route path="group_requests" element={<GroupRequests />} />
        </Routes>
        <div className="group-list">
          {groups.length > 0 ? (
            groups.map((group) => (
              <div key={group.id} className="group-card">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
            ))
          ) : (
            <p>No groups available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Groups;
