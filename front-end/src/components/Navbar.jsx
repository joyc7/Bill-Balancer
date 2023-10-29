import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <nav className="navbar">
      <ul>
        <li className={pathName === "/home" ? "active" : "normal"}>
          <Link to="/home">Home</Link>
        </li>
        <li className={pathName === "/event" ? "active" : "normal"}>
          <Link to="/event">Events</Link>
        </li>
        <li className={pathName === "/friends" ? "active" : "normal"}>
          <Link to="/friends">Friends</Link>
        </li>
        <li className={pathName === "/user-info" ? "active" : "normal"}>
          <Link to="/user-info">User Info</Link>
        </li>
        <li className={pathName === "/contact" ? "active" : "normal"}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
