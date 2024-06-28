import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, clearToken, getUsername } from "../auth";
import "./NavBar.css";

const NavBar = () => {
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showFriendOptions, setShowFriendOptions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const toggleGroupOptions = () => {
    setShowGroupOptions(!showGroupOptions);
  };

  const toggleFriendOptions = () => {
    setShowFriendOptions(!showFriendOptions);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <span className="username">{getUsername()}</span>
      </div>
      <ul>
        {!isAuthenticated() ? (
          <>
            {/* 
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li> 
            */}
          </>
        ) : (
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <span className="nav-link" onClick={toggleFriendOptions}>
                Friends
              </span>
              {showFriendOptions && (
                <ul className="nested-options">
                  <li>
                    <Link to="/friends">Friend Home</Link>
                  </li>
                  <li>
                    <Link to="/friend_requests">Friend Requests</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <span className="nav-link" onClick={toggleGroupOptions}>
                Groups
              </span>
              {showGroupOptions && (
                <ul className="nested-options">
                  <li>
                    <Link to="/groups">Group Home</Link>
                  </li>
                  <li>
                    <Link to="/group_memberships">Group Memberships</Link>
                  </li>
                  <li>
                    <Link to="/group_requests">Group Requests</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/comments">Comments</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
