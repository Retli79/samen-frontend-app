// api.js
import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
});


export const fetchUsers = () => {
  const token = getToken();
  return api( { method: 'get', url:'/users/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchComments = (postId) => api.get(`/comments?post_id=${postId}`);
export const createComment = (commentData) =>
  api.post("/comments", commentData);

// Other API functions...
export const fetchUsers = () => api.get("/users");
export const fetchPosts = () => api.get("/posts");
export const fetchFriends = (userId) => api.get(`/users/${userId}/friends`);
export const fetchFriendRequests = () => api.get("/friendsrequests");
export const fetchGroups = () => api.get("/groups");
export const fetchGroupMemberships = () => api.get("/group_memberships");
export const fetchGroupRequests = () => api.get("/group_requests");
export const login = (credentials) => {
  const params = new URLSearchParams();
  params.append("username", credentials.username);
  params.append("password", credentials.password);
  return api.post("/token", params);
};
export const register = (userData) => api.post("/register", userData);
