import React, { useEffect, useState } from "react";
import "./FloatingIcons.css";
import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from "react-icons/fa";

const FloatingIcons = () => {
  const [showTop, setShowTop] = useState(false);

  // SHOW SCROLL BUTTON AFTER SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floatingicons-container">

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="floatingicons-icon whatsapp"
      >
        <FaWhatsapp />
      </a>

      {/* CALL */}
      <a
        href="tel:+919876543210"
        className="floatingicons-icon call"
      >
        <FaPhoneAlt />
      </a>

      {/* SCROLL TO TOP */}
      {showTop && (
        <div
          className="floatingicons-icon top"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default FloatingIcons;