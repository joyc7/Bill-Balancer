import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  //changed up the events route and removed contact page

  return (
    <nav className="navbar">
      <ul>
        <li className={pathName === "/home" ? "active" : "normal"}>
          <Link to="/home">Home</Link>
        </li>
        <li className={pathName === "/events" ? "active" : "normal"}>
          <Link to="/events">Events</Link>
        </li>
        <li className={pathName === "/friends" ? "active" : "normal"}>
          <Link to="/friends">Friends</Link>
        </li>
        <li className={pathName === "/user-info" ? "active" : "normal"}>
          <Link to="/user-info">User Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
