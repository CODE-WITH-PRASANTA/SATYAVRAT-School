import React from "react";
import "./Topbar.css";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Topbar = () => {

  // WhatsApp Number
  const whatsappNumber = "919753317591";

  // Open WhatsApp Chat
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hello%20Satyavrat%20School`,
      "_blank"
    );
  };

  return (
    <div className="topbar">
      <div className="topbar-container">

        {/* LEFT SECTION */}
        <div className="topbar-left">

          <div className="topbar-item">
            <FaPhoneAlt className="topbar-icon" />
            <span>+91 9753317591</span>
          </div>

          <div className="topbar-item">
            <FaEnvelope className="topbar-icon" />
            <span>satyavratms@gmail.com</span>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="topbar-right">

          <button className="topbar-btn" onClick={handleWhatsApp}>
            <FaWhatsapp className="topbar-btn-icon" />
            Contact Us
          </button>

        </div>

      </div>
    </div>
  );
};

export default Topbar;