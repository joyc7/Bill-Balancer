import React, { useState } from "react";
import "../styles/Login.css";
import userImage from "../images/user.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="flex justify-center">
          <img
            src={userImage}
            alt="User Icon"
            style={{ width: "150px", height: "150px" }}
            className="user-image"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="login-input"
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="mt-4">
          <a href="/signup" className="login-link">
            Sign Up
          </a>
          <span className="mx-2"> | </span>
          <a href="/forgot-password" className="login-link">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
