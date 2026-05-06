import React from "react";
import "./Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie
} from "react-icons/fa";

import logo from "../../assets/satyabrata logo.jpeg";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= ABOUT ================= */}
        <div className="footer-col footer-about">

          <img
            src={logo}
            alt="SATYAVRAT VIDYA NIKETAN HIGH SCHOOL"
            className="footer-logo"
          />

          <p>
            SATYAVRAT VIDYA NIKETAN HIGH SCHOOL is committed to
            providing quality education with discipline, 
          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>
            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#about">About Us</a>
            </li>

            <li>
              <a href="#classes">Classes</a>
            </li>

            <li>
              <a href="#teachers">Teachers</a>
            </li>

            <li>
              <a href="#gallery">Gallery</a>
            </li>

            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>

        </div>

        {/* ================= SCHOOL INFO ================= */}
        <div className="footer-col">

          <h3>School Information</h3>

          <ul className="footer-info">

            <li>
              <FaUserTie className="footer-info-icon" />

              <span>
                <strong>Director :</strong> Moorat Kuswahaa
              </span>
            </li>

            <li>
              <FaMapMarkerAlt className="footer-info-icon" />

              <span>
                Jagdish Ward, Gadarwara,
                Distt-Narsinghpur, M.P. - 487551
              </span>
            </li>

            <li>
              <FaPhoneAlt className="footer-info-icon" />

              <span>
                07791-299369
              </span>
            </li>

            <li>
              <FaPhoneAlt className="footer-info-icon" />

              <span>
                +91 9753317591
              </span>
            </li>

            <li>
              <FaEnvelope className="footer-info-icon" />

              <span>
                satyavratms@gmail.com
              </span>
            </li>

          </ul>

        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="footer-col footer-newsletter">

          <h3>Newsletter</h3>

          <p className="newsletter-text">
            Subscribe to get updates about admissions,
            school activities, events, academic programs,
            and important announcements.
          </p>

          <form>

            <input
              type="text"
              placeholder="Enter Your Name"
            />

            <input
              type="email"
              placeholder="Enter Your Email"
            />

            <button type="submit">
              SUBSCRIBE
            </button>

          </form>

        </div>

      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="footer-bottom">

        <p>
          © 2026 SATYAVRAT VIDYA NIKETAN HIGH SCHOOL |
          Jagdish Ward, Gadarwara, Distt-Narsinghpur,
          Madhya Pradesh - 487551 |
          All Rights Reserved |
          Developed by PR WEBSTOCK
        </p>

      </div>

    </footer>
  );
};

export default Footer;