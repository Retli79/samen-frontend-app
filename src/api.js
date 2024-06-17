import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchUsers = () => api.get('/users');
export const fetchPosts = () => api.get('/posts');
export const fetchFriends = (userId) => api.get(`/users/${userId}/friends`);
export const fetchFriendRequests = () => api.get('/friend_requests');
export const fetchGroups = () => api.get('/groups');
export const fetchGroupMemberships = () => api.get('/group_memberships');
export const fetchGroupRequests = () => api.get('/group_requests');
export const fetchComments = () => api.get('/comments');

// export const login = (credentials) => api.post('/auth/login', credentials);
// export const register = (userData) => api.post('/auth/register', userData);


export const login = (credentials) => {
  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);
  return api.post('/login', params);
};

export const register = (userData) => api.post('/register', userData);