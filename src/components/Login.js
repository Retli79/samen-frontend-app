import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { setToken } from '../auth';
import './login.css';
import logo from '../assets/logo.png';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials)
      .then(response => {
        setToken(response.data.token, credentials.username);
        navigate('/users');
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <img src={logo} alt="Logo" className="login-logo" />
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
      <p>If you don't have an account, please <a href="/register">register</a>.</p>
    </form>
  );
};

export default Login;
