// auth.js

let token = null;
let username = null;

export const setToken = (newToken, user) => {
  token = newToken;
  username = user;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
};

export const getToken = () => {
  return token || localStorage.getItem("token");
};

export const clearToken = () => {
  token = null;
  username = null;
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUsername = () => {
  return username || localStorage.getItem("username");
};
