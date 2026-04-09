import React, { useEffect, useState } from "react";
import "./FloatingForm.css";
import { FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const FloatingForm = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => setActive(true), 50);
  }, []);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => setShow(false), 300);
  };

  if (!show) return null;

  return (
    <div className={`floatingform-overlay ${active ? "show" : ""}`}>
      <div className={`floatingform-container ${active ? "show" : ""}`}>

        <FaTimes className="floatingform-close" onClick={handleClose} />

        <h2 className="floatingform-title">
          SATYAVRAT VIDYA NIKETAN HIGH SCHOOL
        </h2>

        <p className="floatingform-subtitle">
          Admission & Enquiry Form
        </p>

        <p className="floatingform-desc">
          Give your child the best start in life. Fill in the form below and our team will reach out shortly.
        </p>

        <form className="floatingform-form">
          <input type="text" placeholder="Parent / Student Name" />
          <input type="text" placeholder="Address / City" />
          <input type="text" placeholder="Phone Number" />
          <textarea placeholder="Message"></textarea>

          <button type="submit" className="submit-btn">
            Submit Enquiry
          </button>
        </form>

        <div className="floatingform-or">OR</div>

        <div className="floatingform-actions">
          <button className="call-btn">
            <FaPhoneAlt /> Call Us
          </button>

          <button className="whatsapp-btn">
            <FaWhatsapp /> WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
};

export default FloatingForm;