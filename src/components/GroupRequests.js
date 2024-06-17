import React, { useEffect, useState } from 'react';
import { fetchGroupRequests } from '../api';

const GroupRequests = () => {
  const [groupRequests, setGroupRequests] = useState([]);

  useEffect(() => {
    fetchGroupRequests()
      .then(response => {
        setGroupRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the group requests!", error);
      });
  }, []);

  return (
    <div>
      <h1>Group Requests</h1>
      {groupRequests.length > 0 ? (
        <ul>
          {groupRequests.map(request => (
            <li key={request.id}>{request.sender.username} - {request.group.name} - {request.status}</li>
          ))}
        </ul>
      ) : (
        <p>No group requests available</p>
      )}
    </div>
  );
};

export default GroupRequests;
