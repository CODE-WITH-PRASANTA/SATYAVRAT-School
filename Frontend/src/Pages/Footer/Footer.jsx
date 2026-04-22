import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn
} from "react-icons/fa";

import logo from "../../assets/logo-2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ABOUT */}
        <div className="footer-col footer-about">
          <img src={logo} alt="School Logo" className="footer-logo" />

          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>

          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGooglePlusG /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#classes">Classes</a></li>
            <li><a href="#teachers">Teachers</a></li>
            <li><a href="#news">Latest News</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* CATEGORIES (RESTORED) */}
        <div className="footer-col">
          <h3>Categories</h3>
          <ul>
            <li><a href="#classes">Painting</a></li>
            <li><a href="#classes">Drawing</a></li>
            <li className="active"><a href="#classes">Sports, Games</a></li>
            <li><a href="#classes">Life Science</a></li>
            <li><a href="#classes">Activities & Events</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col footer-newsletter">
          <h3>Newsletter</h3>

          <form>
            <input type="text" placeholder="Name *" />
            <input type="email" placeholder="Email Id" />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026 SATYAVRAT VIDYA NIKETAN HIGH SCHOOL. Made with ❤️ for Education | Developed by PR WEBSTOCK
        </p>
      </div>
    </footer>
  );
};

export default Footer;