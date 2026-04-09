import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo-1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={logo} alt="logo" className="navbar-logo-img" />
            </NavLink>
          </div>

          {/* DESKTOP MENU */}
          <ul className="navbar-menu">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/classes">Classes</NavLink></li>
            <li><NavLink to="/pages">Pages</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>

          {/* HAMBURGER */}
          <div className="navbar-toggle" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* MOBILE SIDEBAR */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

        {/* ❌ CLOSE BUTTON (TOP RIGHT INSIDE SIDEBAR) */}
        <FaTimes
          className="close-icon"
          onClick={() => setMenuOpen(false)}
        />

        {/* LOGO */}
        <div className="mobile-logo">
          <img src={logo} alt="logo" className="mobile-logo-img" />
        </div>

        {/* MENU */}
        <ul className="mobile-menu-list">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink></li>
          <li><NavLink to="/classes" onClick={() => setMenuOpen(false)}>Classes</NavLink></li>
          <li><NavLink to="/pages" onClick={() => setMenuOpen(false)}>Pages</NavLink></li>
          <li><NavLink to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</NavLink></li>
          <li><NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;