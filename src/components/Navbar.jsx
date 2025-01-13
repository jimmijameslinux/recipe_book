import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Recipe Book
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
