// auth.js
import { jwtDecode } from "jwt-decode";

let token = null;
let username = null;
let userId = null;

export const setToken = (newToken, user, id) => {
  token = newToken;
  username = user;
  userId = id;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("userId", userId);
};

export const getToken = () => {
  return token || localStorage.getItem("token");
};

export const clearToken = () => {
  token = null;
  username = null;
  userId = null;
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUsername = () => {
  return username || localStorage.getItem("username");
};

export const getUserId = () => {
  return userId || localStorage.getItem("userId");
};

export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user; // Assuming the token has a `user` field with user info
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }
  return null;
};
