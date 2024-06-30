// api.js

import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchUsers = () => {
  const token = getToken();
  return api.get("/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPosts = () => {
  const token = getToken();
  return api.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFriends = (userId) => {
  const token = getToken();
  return api.get(`/users/${userId}/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFriendRequests = () => {
  const token = getToken();
  return api.get("/friendsrequests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchGroups = () => {
  const token = getToken();
  return api.get("/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchGroupMemberships = () => {
  const token = getToken();
  return api.get("/group_memberships", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchGroupRequests = () => {
  const token = getToken();
  return api.get("/group_requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchComments = () => {
  const token = getToken();
  return api.get("/comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (credentials) => {
  const params = new URLSearchParams();
  params.append("username", credentials.username);
  params.append("password", credentials.password);
  return api.post("/token", params);
};

export const register = (userData) => api.post("/register", userData);
