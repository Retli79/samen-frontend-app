import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchGroups, deleteGroup } from "../api";
import GroupRequests from "./GroupRequests";
import GroupMemberships from "./GroupMemberships";
import CreateGroup from "./CreateGroup";
import { getUserFromToken } from "../auth"; // Ensure this is correctly imported
import "./Groups.css"; // Import the CSS file

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Fetch the current user ID from your auth system
    const user = getUserFromToken();
    if (user) {
      setCurrentUserId(user.id);
    }

    fetchGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the groups!", error);
      });
  }, []);

  const handleGroupCreated = (newGroup) => {
    setGroups([newGroup, ...groups]); // Add new group to the list
  };

  const handleDeleteGroup = (groupId) => {
    deleteGroup(groupId)
      .then(() => {
        setGroups(groups.filter((group) => group.id !== groupId));
      })
      .catch((error) => {
        console.error("There was an error deleting the group!", error);
      });
  };

  return (
    <div className="groups-page">
      <div className="groups-sidebar">
        <h2>Groups</h2>
        <p>
          Welcome to the Groups home page. Here you can find information about
          various groups.
        </p>
        <ul>
          <li>{/* <Link to="group_memberships">Group Memberships</Link> */}</li>
          <li>{/* <Link to="group_requests">Group Requests</Link> */}</li>
        </ul>
        <CreateGroup onGroupCreated={handleGroupCreated} />
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
                {group.admin_id === currentUserId && (
                  <button onClick={() => handleDeleteGroup(group.id)}>
                    Delete
                  </button>
                )}
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
