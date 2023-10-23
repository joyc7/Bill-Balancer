import React, { Component } from "react";

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
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div>
          <a href="/signup">New User</a>{" "}
          {/* Add the link to your signup page */}
          <span> | </span> {/* Separator between links */}
          <a href="/forgot-password">Forgot Password</a>{" "}
          {/* Add the link to your forgot password page */}
        </div>
      </div>
    );
  }
}

export default Login;
