import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import userImage from "../images/user.png";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let [urlSearchParams] = useSearchParams();
  const [response, setResponse] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
      localStorage.setItem("token", response.token);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);

      // if (response.status === 200) {
      //   navigate("/home");
      //   console.log("Successful!");
      //   console.log(response.data);
      // } else {
      //   console.error("Login failed");
      // }
    } catch (error) {
      console.error(
        "You entered invalid credentials.  Try harder!  Check out the usernames in the server's user_data.js file."
      );
    }
  };

  if (!response.success)
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
  else return <Navigate to="/home" />;
};

export default Login;
