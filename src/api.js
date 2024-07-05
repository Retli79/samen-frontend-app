import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUsers = () => {
  const token = getToken();
  return api({
    method: "get",
    url: "/users/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPosts = () => {
  const token = getToken();
  return api({
    method: "get",
    url: "/posts/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFriends = (userId) => {
  const token = getToken();
  return api({
    method: "get",
    url: `/friends/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFriendRequests = (userId) => {
  const token = getToken();
  return api({
    method: "get",
    url: `/friendrequests/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchComments = (postId) => api.get(`/comments?post_id=${postId}`);
export const createComment = (commentData) =>
  api.post("/comments", commentData);
export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}`);

export const createPost = (postData) =>
  api.post("/posts/create_post", postData);

export const fetchGroups = () => api.get("/groups");
export const createGroup = (groupData) => api.post("/groups", groupData);
export const fetchGroupMemberships = () => api.get("/group_memberships");
export const fetchGroupRequests = () => api.get("/grouprequests");

export const login = (credentials) => {
  const params = new URLSearchParams();
  params.append("username", credentials.username);
  params.append("password", credentials.password);
  return api.post("/token", params); // Ensure this matches your backend endpoint for login
};

export const register = (userData) => api.post("/users", userData);

// Add the deletePost function
export const deletePost = (postId) => {
  return api.delete(`/posts/${postId}/`);
};

// Add the deleteGroup function
export const deleteGroup = (groupId) => {
  return api.delete(`/groups/${groupId}/`);
};
