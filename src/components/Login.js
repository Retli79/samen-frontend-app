import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { setToken } from "../auth";
import "./login.css";
import logo from "../assets/logo.png";
import sidebarImage from "../assets/sidebarImage.jpeg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials)
      .then((response) => {
        console.log(response.data); // Log the response for debugging
        setToken(
          response.data.access_token,
          credentials.username,
          response.data.user_id
        );
        navigate("/posts");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={sidebarImage} alt="Sidebar" className="login-image" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Login</h2>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          If you don't have an account, please <a href="/register">register</a>.
        </p>
      </form>
    </div>
  );
};

export default Login;
