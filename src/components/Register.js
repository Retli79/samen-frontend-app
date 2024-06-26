import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import './register.css';
import logo from '../assets/logo.png';
const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData)
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <img src={logo} alt="Logo" className="login-logo" />
      <h2>Register</h2>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={userData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
