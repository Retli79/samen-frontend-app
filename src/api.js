import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});


export const fetchUsers = () => {
  const token = getToken();
  return api( { method: 'get', url:'/users/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPosts = () => {
  const token = getToken();
  return api.get('/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const fetchFriends = (userId) => api.get(`/users/${userId}/friends`);
export const fetchFriendRequests = () => api.get('/friend_requests');
export const fetchGroups = () => api.get('/groups');
export const fetchGroupMemberships = () => api.get('/group_memberships');
export const fetchGroupRequests = () => api.get('/group_requests');
export const fetchComments = () => api.get('/comments');

export const login = (credentials) => {
  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);
  return api.post('/token', params);
};

export const register = (userData) => api.post('/register', userData);
