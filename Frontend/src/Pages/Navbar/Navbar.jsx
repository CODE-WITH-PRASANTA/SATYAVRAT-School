import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/Logo-1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <div className="navbar-logo">
            <a href="#home">
              <img src={logo} alt="logo" className="navbar-logo-img" />
            </a>
          </div>

          {/* DESKTOP MENU */}
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#classes">Classes</a></li>
            <li><a href="#whychooseus">Why Choose Us</a></li>
            <li><a href="#teachers">Teachers</a></li>
            <li><a href="#programms">Our Programms</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact Us</a></li>
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

        {/* CLOSE BUTTON */}
        <FaTimes
          className="close-icon"
          onClick={() => setMenuOpen(false)}
        />

        {/* LOGO */}
        <div className="mobile-logo">
          <img src={logo} alt="logo" className="mobile-logo-img" />
        </div>

        {/* MOBILE MENU */}
        <ul className="mobile-menu-list">
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About Us</a></li>
          <li><a href="#classes" onClick={() => setMenuOpen(false)}>Classes</a></li>
          <li><a href="#whychooseus" onClick={() => setMenuOpen(false)}>Why Choose Us</a></li>
          <li><a href="#teachers" onClick={() => setMenuOpen(false)}>Teachers</a></li>
          <li><a href="#programms" onClick={() => setMenuOpen(false)}>Our Programms</a></li>
          <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
          <li><a href="#news" onClick={() => setMenuOpen(false)}>News</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;