import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, clearToken } from '../auth';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated() ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to="/friend_requests">Friend Requests</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link to="/group_memberships">Group Memberships</Link></li>
            <li><Link to="/group_requests">Group Requests</Link></li>
            <li><Link to="/comments">Comments</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
