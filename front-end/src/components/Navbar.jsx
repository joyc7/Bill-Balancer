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
        <li className={pathName === "/" ? "active" : "normal"}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathName === "/about" ? "active" : "normal"}>
          <Link to="/about">About</Link>
        </li>
        <li className={pathName === "/contact" ? "active" : "normal"}>
          <Link to="/contact">Contact</Link>
        </li>
        <li className={pathName === "/friends" ? "active" : "normal"}>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
