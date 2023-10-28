import React, { Component } from "react";
import "../styles/Login.css";
import userImage from "../images/user.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
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
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
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
              value={this.state.password}
              onChange={this.handleInputChange}
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
}

export default Login;
