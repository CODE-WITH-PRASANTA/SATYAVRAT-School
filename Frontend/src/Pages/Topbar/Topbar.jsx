import React from "react";
import "./Topbar.css";
import { FaPhoneAlt, FaEnvelope, FaUser, FaShoppingCart } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        
        {/* Left Section */}
        <div className="topbar-left">
          <span className="topbar-item">
            <FaPhoneAlt className="topbar-icon" />
            +91 9876543210
          </span>
          <span className="topbar-item">
            <FaEnvelope className="topbar-icon" />
            support@example.com
          </span>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          <button className="topbar-btn">
            <FaUser className="topbar-icon" />
            Contact Us
          </button>

       
        </div>

      </div>
    </div>
  );
};

export default Topbar;