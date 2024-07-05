// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Friends from "./components/Friends";
import FriendRequests from "./components/FriendRequests";
import Groups from "./components/Groups";
import GroupMemberships from "./components/GroupMemberships";
import GroupRequests from "./components/GroupRequests";
import Comments from "./components/Comments";
import { isAuthenticated } from "./auth";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="background-logo"></div> {/* Background logo */}
      <div className="app-container">
        {isAuthenticated() && <NavBar />}{" "}
        {/* Render NavBar only if authenticated */}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isAuthenticated() && (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/friendrequests" element={<FriendRequests />} />
                <Route path="/groups" element={<Groups />} />
                <Route
                  path="/group_memberships"
                  element={<GroupMemberships />}
                />
                <Route path="/group_requests" element={<GroupRequests />} />
                <Route path="/comments" element={<Comments />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
